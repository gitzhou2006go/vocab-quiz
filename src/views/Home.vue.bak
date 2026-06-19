<template>
  <div class="home">
    <!-- 问候 -->
    <div class="welcome-card card">
      <div class="welcome-emoji">📚</div>
      <h2 class="welcome-title">单词考核</h2>
      <p class="welcome-desc">每轮独立考核，答对过关，答错积累，直至全部掌握</p>
    </div>

    <!-- 当前轮次状态 -->
    <div v-if="store.activeRound" class="round-status card" @click="goToQuiz">
      <div class="status-header">
        <span class="status-badge active">进行中</span>
        <span class="status-round-name">{{ store.activeRound.name }}</span>
        <span class="status-dict-tag">{{ getDictName(store.activeRound.dictId) }}</span>
      </div>
      <div class="progress-section">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-stats">
          <span>已完成 <strong>{{ completedCount }}</strong> / {{ store.activeRound.totalWords }}</span>
          <span>{{ progressPercent }}%</span>
        </div>
      </div>
      <div class="status-footer">
        <span class="text-muted">点击继续考核 →</span>
      </div>
    </div>

    <!-- 选择词库 -->
    <div class="section-header">
      <h3 class="section-title">📖 选择词库</h3>
    </div>

    <div class="dict-list">
      <div
        v-for="dict in DICTIONARIES"
        :key="dict.id"
        class="dict-card card"
        :class="{ 'dict-active': selectedDict === dict.id }"
        @click="selectedDict = dict.id"
      >
        <div class="dict-radio">
          <div class="radio-circle" :class="{ 'radio-checked': selectedDict === dict.id }">
            <span v-if="selectedDict === dict.id" class="radio-dot"></span>
          </div>
        </div>
        <div class="dict-info">
          <div class="dict-name">{{ dict.name }}</div>
          <div class="dict-desc">{{ dict.description }}</div>
          <div class="dict-meta">
            <span class="dict-word-count">{{ dict.wordCount }} 词</span>
            <span v-if="dict.subLabel" class="dict-sub-label">{{ dict.subLabel }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 开始考核按钮 -->
    <button class="btn btn-primary btn-block btn-lg mt-4" @click="startNewRound">
      🎯 开始考核 — {{ getDictName(selectedDict) }}
    </button>

    <!-- 快捷入口 -->
    <div class="quick-actions mt-4">
      <button class="action-btn" @click="$router.push('/errors')">
        <span class="action-icon">📕</span>
        <span>错题本</span>
      </button>
      <button class="action-btn" @click="$router.push('/rounds')">
        <span class="action-icon">📊</span>
        <span>历史轮次</span>
      </button>
    </div>

    <!-- 数据同步 -->
    <div class="card mt-2">
      <h3 class="section-title">☁️ 数据同步</h3>
      <p class="text-secondary" style="font-size:0.78rem;margin-top:4px">
        数据自动通过 Firebase 云端同步，换台手机打开即可恢复进度
      </p>
    </div>

    <!-- Firebase 测试（仅诊断用） -->
    <details class="card mt-2 firebase-debug">
      <summary style="font-size:0.8rem;color:var(--text-muted);cursor:pointer">
        🔧 Firebase 诊断
      </summary>
      <button class="btn btn-outline btn-block mt-2" @click="testDB" :disabled="testingDB" style="font-size:0.82rem;padding:8px">
        {{ testingDB ? '测试中...' : '测试 Firebase 连接' }}
      </button>
      <p v-if="dbTestResult" class="db-test-result mt-2" :class="dbTestResult.ok ? 'success' : 'error'">
        {{ dbTestResult.msg }}
      </p>
    </details>

    <!-- 错题统计摘要 -->
    <div v-if="topErrors.length > 0" class="card mt-2">
      <h3 class="section-title">高频错词 Top 5</h3>
      <div v-for="item in topErrors" :key="item.wordId" class="error-row">
        <span class="error-word">{{ getWord(item.wordId)?.en }}</span>
        <span class="error-zh">{{ getWord(item.wordId)?.zh }}</span>
        <span class="error-count-badge">{{ item.totalCount }} 次错</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store, loadActiveRound } from '../store.js'
import { createRound, getAggregatedErrors, getAllRounds } from '../db.js'
import { downloadAll, testPing } from '../fb.js'
import { DICTIONARIES, WORD_MAP, getDictWords } from '../vocab.js'

const router = useRouter()
const errorStats = ref([])
const selectedDict = ref('core')
const testingDB = ref(false)
const dbTestResult = ref(null)

onMounted(async () => {
  await loadActiveRound()
  errorStats.value = await getAggregatedErrors()
  if (store.activeRound && store.activeRound.dictId) {
    selectedDict.value = store.activeRound.dictId
  }
})

const completedCount = computed(() => {
  if (!store.activeRound) return 0
  return store.activeRound.totalWords - (store.activeRound.pendingWordIds?.length || 0)
})

const progressPercent = computed(() => {
  if (!store.activeRound || !store.activeRound.totalWords) return 0
  return Math.round((completedCount.value / store.activeRound.totalWords) * 100)
})

const topErrors = computed(() => {
  return [...errorStats.value]
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 5)
})

function getDictName(dictId) {
  const d = DICTIONARIES.find(x => x.id === dictId)
  return d ? d.name : '未知词库'
}

function getWord(wordId) {
  return WORD_MAP[wordId] || null
}

function goToQuiz() {
  if (store.activeRound) {
    router.push(`/quiz/${store.activeRound.id}`)
  }
}

// ===== Firebase 诊断 =====

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function timeoutPromise(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时（10秒）')), ms))
}

async function testDB() {
  testingDB.value = true
  dbTestResult.value = null
  try {
    // 1. 只读测试：能下载即连通
    const result = await Promise.race([
      downloadAll(),
      timeoutPromise(10000)
    ])
    if (result === false) {
      // downloadAll 内部 catch 后返回 false
      dbTestResult.value = { ok: false, msg: '❌ 连接失败：无法访问 Firebase' }
      return
    }
    // 2. 写入测试：用独立探测文档 data/_ping，绝不碰主数据 data/main
    const pingOk = await Promise.race([
      testPing(),
      timeoutPromise(10000)
    ])
    if (pingOk) {
      const roundCount = result?.rounds?.length || 0
      const errCount = result?.errors?.length || 0
      dbTestResult.value = {
        ok: true,
        msg: `✅ Firebase 连接正常（云端 ${roundCount} 个轮次，${errCount} 条错题）`
      }
    } else {
      dbTestResult.value = { ok: false, msg: '⚠️ 读取正常，但写入失败（可能权限不足）' }
    }
  } catch (e) {
    dbTestResult.value = { ok: false, msg: `❌ 连接失败: ${e.message}` }
  } finally {
    testingDB.value = false
  }
}

async function startNewRound() {
  const dict = DICTIONARIES.find(d => d.id === selectedDict.value)
  if (!dict) return
  const words = getDictWords(dict.id)
  const wordIds = shuffleArray(words.map(w => w.id))
  if (wordIds.length === 0) return

  // 计算该词库已有几轮，自动递增编号
  const allRounds = await getAllRounds()
  const roundNum = allRounds.filter(r => r.dictId === dict.id).length + 1

  const newRound = await createRound(
    `第${roundNum}轮`,
    wordIds,
    dict.id
  )
  store.activeRound = newRound
  router.push(`/quiz/${newRound.id}`)
}
</script>

<style scoped>
.home { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.welcome-card { text-align: center; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; }
.welcome-emoji { font-size: 2.5rem; margin-bottom: 8px; }
.welcome-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 6px; }
.welcome-desc { font-size: 0.85rem; opacity: 0.85; line-height: 1.5; }
.round-status { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.round-status:active { transform: scale(0.98); }
.status-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
.status-badge.active { background: #c6f6d5; color: #276749; }
.status-round-name { font-weight: 600; font-size: 0.9rem; flex: 1; }
.status-dict-tag { font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; background: #eef2ff; color: var(--primary); font-weight: 500; }
.progress-section { margin-bottom: 10px; }
.progress-bar-bg { height: 10px; background: #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--success)); border-radius: 10px; transition: width 0.4s ease; }
.progress-stats { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary); }
.status-footer { text-align: right; font-size: 0.8rem; }
.section-header { margin-bottom: 10px; }
.section-title { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); }
.dict-list { display: flex; flex-direction: column; gap: 10px; }
.dict-card { display: flex; align-items: flex-start; gap: 14px; padding: 16px; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
.dict-card:active { transform: scale(0.98); }
.dict-card.dict-active { border-color: var(--primary); background: #f8f9ff; }
.dict-radio { padding-top: 2px; }
.radio-circle { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #cbd5e0; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.radio-checked { border-color: var(--primary); background: var(--primary); }
.radio-dot { width: 8px; height: 8px; border-radius: 50%; background: white; }
.dict-info { flex: 1; }
.dict-name { font-weight: 700; font-size: 1rem; margin-bottom: 2px; }
.dict-desc { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px; }
.dict-meta { display: flex; gap: 8px; align-items: center; }
.dict-word-count { font-size: 0.72rem; padding: 1px 8px; border-radius: 8px; background: #eef2ff; color: var(--primary); font-weight: 500; }
.dict-sub-label { font-size: 0.72rem; color: var(--text-muted); }
.quick-actions { display: flex; gap: 10px; }
.action-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; background: var(--card-bg); border: none; border-radius: var(--radius); padding: 16px 8px; cursor: pointer; box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s; font-size: 0.8rem; color: var(--text-primary); font-weight: 500; }
.action-btn:active { transform: scale(0.95); box-shadow: var(--shadow-md); }
.action-icon { font-size: 1.5rem; }

.db-test-result { font-size: 0.82rem; margin-top: 10px; padding: 8px 12px; border-radius: var(--radius-xs); text-align: center; }
.db-test-result.success { background: #f0fff4; color: #276749; }
.db-test-result.error { background: #fff5f5; color: #c53030; }
.btn-outline { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
.btn-outline:disabled { opacity: 0.5; }

.firebase-debug { padding: 12px 16px; }
.firebase-debug summary { outline: none; }
.error-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f7fafc; }
.error-row:last-child { border-bottom: none; }
.error-word { font-weight: 600; min-width: 80px; }
.error-zh { flex: 1; font-size: 0.85rem; color: var(--text-secondary); }
.error-count-badge { font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; background: #fff5f5; color: var(--danger); font-weight: 600; white-space: nowrap; }
</style>
