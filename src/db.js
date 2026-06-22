import { openDB } from 'idb'
import { uploadAll } from './fb.js'

let db = null

export async function initDB() {
  db = await openDB('VocabQuizDB', 1, {
    upgrade(db) {
      db.createObjectStore('rounds', { keyPath: 'id' })
      db.createObjectStore('errors', { keyPath: 'id' })
    }
  })
  return db
}

export async function getAll(storeName) {
  return await db.getAll(storeName)
}

export async function put(storeName, item) {
  const r = await db.put(storeName, item)
  scheduleUpload() // 本地写后自动同步到云端
  return r
}

export async function deleteItem(storeName, id) {
  const r = await db.delete(storeName, id)
  scheduleUpload()
  return r
}

// 以下是 Home.vue 需要的函数
// 从已有轮次中推断下一个可用 ID，防止刷新后 ID 重置导致覆盖
export async function initNextRoundId() {
  const rounds = await db.getAll('rounds')
  nextRoundId = rounds.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1
}

let nextRoundId = 1
let nextErrorId = 1

export async function getAllRounds() {
  return await db.getAll('rounds')
}

export async function getAllErrors() {
  return await db.getAll('errors')
}

export async function createRound(name, wordIds, dictId) {
  const id = nextRoundId++
  const round = {
    id,
    name,
    dictId,
    totalWords: wordIds.length,
    pendingWordIds: [...wordIds],
    status: 'active',
    createdAt: Date.now()
  }
  await db.put('rounds', round)
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
  const [errors, rounds] = await Promise.all([db.getAll('errors'), db.getAll('rounds')])

  // 按 roundId 分组
  const groups = {}
  const unclassified = []

  for (const e of errors) {
    if (e.roundId != null && rounds.find(r => r.id === e.roundId)) {
      if (!groups[e.roundId]) groups[e.roundId] = []
      groups[e.roundId].push(e)
    } else {
      unclassified.push(e)
    }
  }

  const result = Object.entries(groups).map(([roundId, errs]) => ({
    round: rounds.find(r => r.id === Number(roundId)),
    errors: errs
  }))

  // 按轮次创建时间倒序（最新在上）
  result.sort((a, b) => (b.round?.createdAt || 0) - (a.round?.createdAt || 0))

  if (unclassified.length > 0) {
    result.push({ round: null, errors: unclassified })
  }

  return result
}

// 云端数据覆盖本地 —— 由 listenRemote 触发，不再 scheduleUpload，避免回环
export async function replaceAllData(rounds, errors) {
  const tx = db.transaction(['rounds', 'errors'], 'readwrite')
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
      const [rounds, errors] = await Promise.all([db.getAll('rounds'), db.getAll('errors')])
      await uploadAll(rounds, errors)
    } catch (e) {
      console.error('Auto upload failed', e)
    }
  }, 1500)
}
