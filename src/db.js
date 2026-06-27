import { openDB } from 'idb'
import { uploadAll } from './fb.js'

let db = null
let dbReady = null

export async function initDB() {
  if (db) return db
  if (dbReady) return dbReady

  dbReady = openDB('VocabQuizDB', 1, {
    upgrade(db) {
      db.createObjectStore('rounds', { keyPath: 'id' })
      db.createObjectStore('errors', { keyPath: 'id' })
    }
  })
  db = await dbReady
  return db
}

async function ensureDB() {
  return db || await initDB()
}

export async function getAll(storeName) {
  const database = await ensureDB()
  return await database.getAll(storeName)
}

export async function put(storeName, item) {
  const database = await ensureDB()
  const r = await database.put(storeName, item)
  scheduleUpload() // 本地写后自动同步到云端
  return r
}

export async function deleteItem(storeName, id) {
  const database = await ensureDB()
  const r = await database.delete(storeName, id)
  scheduleUpload()
  return r
}

/**
 * 删除一条错题记录
 */
export async function deleteError(errorId) {
  return await deleteItem('errors', errorId)
}

/**
 * 从轮次的 pendingWordIds 中移除指定 wordId（如果轮次仍为 active 状态）
 */
export async function removeFromRoundPending(roundId, wordId) {
  const database = await ensureDB()
  const rounds = await database.getAll('rounds')
  const round = rounds.find(r => r.id === roundId)
  if (!round || round.status !== 'active') return // 仅 active 轮次才操作
  round.pendingWordIds = (round.pendingWordIds || []).filter(id => id !== wordId)
  await database.put('rounds', round)
  scheduleUpload()
}

/**
 * 增加错词的「不会」计数
 */
export async function incrementNotKnown(errorId) {
  const database = await ensureDB()
  const error = await database.get('errors', errorId)
  if (!error) return
  error.notKnownCount = (error.notKnownCount || 0) + 1
  await database.put('errors', error)
  scheduleUpload()
}

// 以下是 Home.vue 需要的函数
// 从已有轮次中推断下一个可用 ID，防止刷新后 ID 重置导致覆盖
export async function initNextRoundId() {
  const database = await ensureDB()
  const rounds = await database.getAll('rounds')
  nextRoundId = rounds.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1
}

let nextRoundId = 1
let nextErrorId = 1

export async function getAllRounds() {
  const database = await ensureDB()
  return await database.getAll('rounds')
}

export async function getAllErrors() {
  const database = await ensureDB()
  return await database.getAll('errors')
}

export async function createRound(name, wordIds, dictId) {
  const id = nextRoundId++
  const round = {
    id,
    name,
    dictId,
    totalWords: wordIds.length,
    pendingWordIds: [...wordIds],
    knownCount: 0,
    unknownCount: 0,
    status: 'active',
    createdAt: Date.now()
  }
  const database = await ensureDB()
  await database.put('rounds', round)
  scheduleUpload()
  return round
}

export async function getAggregatedErrors() {
  const errors = await getAllErrors()
  const stats = {}
  for (const e of errors) {
    if (!stats[e.wordId]) stats[e.wordId] = { wordId: e.wordId, totalCount: 0 }
    stats[e.wordId].totalCount += e.count || 1
  }
  return Object.values(stats)
}

/**
 * 按轮次分组获取错题
 * 返回 [{ round, errors: [...] }]，按轮次时间倒序
 * 无 roundId 的旧数据归入 round=null
 */
export async function getErrorsByRound() {
  const database = await ensureDB()
  const [errors, rounds] = await Promise.all([database.getAll('errors'), database.getAll('rounds')])
  const normalizedErrors = errors.map(e => ({
    ...e,
    notKnownCount: e.notKnownCount || e.count || 1
  }))
  const findRound = (roundId) => rounds.find(r => String(r.id) === String(roundId))

  // 按 roundId 分组
  const groups = {}
  const unclassified = []

  for (const e of normalizedErrors) {
    if (e.roundId != null && findRound(e.roundId)) {
      if (!groups[e.roundId]) groups[e.roundId] = []
      groups[e.roundId].push(e)
    } else {
      unclassified.push(e)
    }
  }

  const result = Object.entries(groups).map(([roundId, errs]) => ({
    round: findRound(roundId),
    errors: errs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }))

  // 按轮次创建时间倒序（最新在上）
  result.sort((a, b) => (b.round?.createdAt || 0) - (a.round?.createdAt || 0))

  if (unclassified.length > 0) {
    result.push({ round: null, errors: unclassified.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)) })
  }

  return result
}

// 云端数据覆盖本地 —— 由 listenRemote 触发，不再 scheduleUpload，避免回环
export async function replaceAllData(rounds, errors) {
  const database = await ensureDB()
  const tx = database.transaction(['rounds', 'errors'], 'readwrite')
  await tx.objectStore('rounds').clear()
  await tx.objectStore('errors').clear()
  for (const r of rounds) await tx.objectStore('rounds').put(r)
  for (const e of errors) await tx.objectStore('errors').put(e)
  await tx.done
  await initNextRoundId()
}

// ====== 云端同步：debounce 上传，避免频繁写 Firebase ======
let uploadTimer = null
let skipNextUpload = false

// 云端覆盖本地后调用，防止 replaceAllData 触发的逻辑回灌
export function pauseSyncOnce() {
  skipNextUpload = true
}

function scheduleUpload() {
  if (skipNextUpload) {
    skipNextUpload = false
    return
  }
  if (uploadTimer) clearTimeout(uploadTimer)
  uploadTimer = setTimeout(async () => {
    uploadTimer = null
    try {
      const database = await ensureDB()
      const [rounds, errors] = await Promise.all([database.getAll('rounds'), database.getAll('errors')])
      await uploadAll(rounds, errors)
    } catch (e) {
      console.error('Auto upload failed', e)
    }
  }, 1500)
}
