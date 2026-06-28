import { openDB } from 'idb'
import { uploadAll } from './fb.js'

const DB_NAME = 'VocabQuizDB'
const DB_VERSION = 2
const STORE_NAMES = ['rounds', 'errors', 'taskTemplates', 'dailyPlans']

const DEFAULT_TASK_TEMPLATES = [
  { id: 'tpl_math_calc', name: '数学计算', createdAt: 0, archived: false },
  { id: 'tpl_vocab_20', name: '背单词 20 个', createdAt: 0, archived: false },
  { id: 'tpl_dictation_lesson', name: '汉字听写一课', createdAt: 0, archived: false },
  { id: 'tpl_reading', name: '阅读 20 分钟', createdAt: 0, archived: false }
]

let db = null
let dbReady = null
let nextRoundId = 1

export async function initDB() {
  if (db) return db
  if (dbReady) return dbReady

  dbReady = openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      for (const storeName of STORE_NAMES) {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: storeName === 'dailyPlans' ? 'date' : 'id' })
        }
      }
    }
  })
  db = await dbReady
  await seedDefaultTaskTemplates()
  return db
}

async function ensureDB() {
  return db || await initDB()
}

async function seedDefaultTaskTemplates() {
  const database = db || await dbReady
  const existing = await database.getAll('taskTemplates')
  if (existing.length > 0) return

  const now = Date.now()
  const tx = database.transaction('taskTemplates', 'readwrite')
  for (const template of DEFAULT_TASK_TEMPLATES) {
    await tx.objectStore('taskTemplates').put({ ...template, createdAt: now })
  }
  await tx.done
}

export async function getAll(storeName) {
  const database = await ensureDB()
  return await database.getAll(storeName)
}

export async function put(storeName, item) {
  const database = await ensureDB()
  const result = await database.put(storeName, item)
  scheduleUpload()
  return result
}

export async function deleteItem(storeName, id) {
  const database = await ensureDB()
  const result = await database.delete(storeName, id)
  scheduleUpload()
  return result
}

export async function deleteError(errorId) {
  return await deleteItem('errors', errorId)
}

export async function removeFromRoundPending(roundId, wordId) {
  const database = await ensureDB()
  const round = await database.get('rounds', roundId)
  if (!round || round.status !== 'active') return
  round.pendingWordIds = (round.pendingWordIds || []).filter(id => id !== wordId)
  await database.put('rounds', round)
  scheduleUpload()
}

export async function incrementNotKnown(errorId) {
  const database = await ensureDB()
  const error = await database.get('errors', errorId)
  if (!error) return
  error.notKnownCount = (error.notKnownCount || 0) + 1
  await database.put('errors', error)
  scheduleUpload()
}

export async function initNextRoundId() {
  const rounds = await getAll('rounds')
  nextRoundId = rounds.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1
}

export async function getAllRounds() {
  return await getAll('rounds')
}

export async function getAllErrors() {
  return await getAll('errors')
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
  await put('rounds', round)
  return round
}

export async function createDictationRound(course, lesson, unknownItems) {
  const id = nextRoundId++
  const now = Date.now()
  const allItems = lesson.items || []
  const unknownIds = unknownItems.map(item => item.id)
  const round = {
    id,
    name: `${course.name} ${lesson.name}`,
    dictId: 'dictation',
    type: 'dictation',
    courseId: course.id,
    lessonId: lesson.id,
    totalWords: allItems.length,
    pendingWordIds: [],
    knownCount: allItems.length - unknownIds.length,
    unknownCount: unknownIds.length,
    status: 'completed',
    createdAt: now,
    completedAt: now
  }

  const database = await ensureDB()
  const tx = database.transaction(['rounds', 'errors'], 'readwrite')
  await tx.objectStore('rounds').put(round)

  for (const item of unknownItems) {
    await tx.objectStore('errors').put({
      id: `err_${id}_${item.id}`,
      roundId: id,
      wordId: item.id,
      type: 'dictation',
      courseId: course.id,
      lessonId: lesson.id,
      count: 1,
      notKnownCount: 1,
      createdAt: now
    })
  }

  await tx.done
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

export async function getErrorsByRound() {
  const [errors, rounds] = await Promise.all([getAll('errors'), getAll('rounds')])
  const normalizedErrors = errors.map(e => ({
    ...e,
    notKnownCount: e.notKnownCount || e.count || 1
  }))
  const findRound = (roundId) => rounds.find(r => String(r.id) === String(roundId))
  const groups = {}
  const unclassified = []

  for (const error of normalizedErrors) {
    if (error.roundId != null && findRound(error.roundId)) {
      if (!groups[error.roundId]) groups[error.roundId] = []
      groups[error.roundId].push(error)
    } else {
      unclassified.push(error)
    }
  }

  const result = Object.entries(groups).map(([roundId, errs]) => ({
    round: findRound(roundId),
    errors: errs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }))
  result.sort((a, b) => (b.round?.createdAt || 0) - (a.round?.createdAt || 0))

  if (unclassified.length > 0) {
    result.push({ round: null, errors: unclassified.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)) })
  }

  return result
}

export async function getTaskTemplates() {
  const templates = await getAll('taskTemplates')
  return templates.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
}

export async function saveTaskTemplate(template) {
  const now = Date.now()
  const item = {
    id: template.id || `tpl_${now}_${Math.random().toString(36).slice(2, 7)}`,
    name: template.name.trim(),
    createdAt: template.createdAt || now,
    archived: !!template.archived
  }
  await put('taskTemplates', item)
  return item
}

export async function getDailyPlan(date) {
  const database = await ensureDB()
  return await database.get('dailyPlans', date) || createEmptyDailyPlan(date)
}

export async function saveDailyPlan(plan) {
  await put('dailyPlans', { ...plan, updatedAt: Date.now() })
}

export async function getDailyPlans() {
  const plans = await getAll('dailyPlans')
  return plans.sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export function createEmptyDailyPlan(date) {
  return {
    date,
    periods: {
      morning: createEmptyPeriod(),
      afternoon: createEmptyPeriod(),
      evening: createEmptyPeriod()
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
}

function createEmptyPeriod() {
  return {
    startedAt: null,
    endedAt: null,
    tasks: []
  }
}

export async function getAllData() {
  const database = await ensureDB()
  const [rounds, errors, taskTemplates, dailyPlans] = await Promise.all([
    database.getAll('rounds'),
    database.getAll('errors'),
    database.getAll('taskTemplates'),
    database.getAll('dailyPlans')
  ])
  return { rounds, errors, taskTemplates, dailyPlans, exportedAt: Date.now() }
}

export async function replaceAllData(dataOrRounds, maybeErrors, maybeTaskTemplates, maybeDailyPlans) {
  const data = Array.isArray(dataOrRounds)
    ? {
        rounds: dataOrRounds,
        errors: maybeErrors || [],
        taskTemplates: maybeTaskTemplates || [],
        dailyPlans: maybeDailyPlans || []
      }
    : {
        rounds: dataOrRounds?.rounds || [],
        errors: dataOrRounds?.errors || [],
        taskTemplates: dataOrRounds?.taskTemplates || [],
        dailyPlans: dataOrRounds?.dailyPlans || []
      }

  const database = await ensureDB()
  const tx = database.transaction(STORE_NAMES, 'readwrite')
  for (const storeName of STORE_NAMES) {
    await tx.objectStore(storeName).clear()
  }
  for (const r of data.rounds) await tx.objectStore('rounds').put(r)
  for (const e of data.errors) await tx.objectStore('errors').put(e)
  for (const t of data.taskTemplates) await tx.objectStore('taskTemplates').put(t)
  for (const p of data.dailyPlans) await tx.objectStore('dailyPlans').put(p)
  await tx.done

  await seedDefaultTaskTemplates()
  await initNextRoundId()
}

let uploadTimer = null
let skipNextUpload = false

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
      await uploadAll(await getAllData())
    } catch (e) {
      console.error('Auto upload failed', e)
    }
  }, 1500)
}
