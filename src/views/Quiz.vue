<template>
  <div class="quiz">
    <!-- 顶部进度 -->
    <div v-if="round" class="quiz-header card">
      <div class="quiz-meta">
        <span class="round-name">{{ round.name }}</span>
        <span class="dict-tag">{{ getDictName(round.dictId) }}</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="progress-stats">
        <span>{{ completedCount }} / {{ round.totalWords }}</span>
        <span>{{ progressPercent }}%</span>
      </div>
    </div>

    <!-- 答题卡片 -->
    <div v-if="currentWord && round" class="word-card card">
      <div class="word-en-row">
        <div class="word-en">{{ currentWord.en }}</div>
        <button class="speak-btn" title="朗读" @click="speak(currentWord.en)">🔊</button>
      </div>
      <button v-if="!showZh" class="btn btn-outline btn-block" @click="showZh = true">
        👁 看释义
      </button>
      <div v-else class="word-zh">{{ currentWord.zh }}</div>

      <div class="actions">
        <button class="btn btn-danger action-btn" @click="markUnknown">
          ❌ 不认识
        </button>
        <button class="btn btn-success action-btn" @click="markKnown">
          ✅ 认识
        </button>
      </div>
    </div>

    <!-- 无进行中轮次 -->
    <div v-else-if="!round" class="empty card">
      <div class="empty-emoji">🤔</div>
      <p>没有进行中的轮次</p>
      <button class="btn btn-primary" @click="$router.push('/')">去首页开一轮</button>
    </div>

    <!-- 本轮完成 -->
    <div v-else class="done-card card">
      <div class="done-emoji">🎉</div>
      <h3>本轮完成！</h3>
      <div class="done-stats">
        <div class="stat-item stat-known">
          <span class="stat-num">{{ knownCount }}</span>
          <span class="stat-label">认识</span>
        </div>
        <div class="stat-item stat-unknown">
          <span class="stat-num">{{ unknownCount }}</span>
          <span class="stat-label">不认识</span>
        </div>
      </div>
      <p class="done-tip" v-if="unknownCount > 0">
        {{ unknownCount }} 个错词已记入错题本，下次可继续巩固
      </p>
      <div class="done-actions">
        <button class="btn btn-outline btn-block" @click="$router.push('/errors')">查看错题本</button>
        <button class="btn btn-primary btn-block" @click="$router.push('/')">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store, loadActiveRound } from '../store.js'
import { getAll, put } from '../db.js'
import { DICTIONARIES, WORD_MAP } from '../vocab.js'

const route = useRoute()
const router = useRouter()

const round = ref(null)
const currentWord = ref(null)
const showZh = ref(false)
const knownCount = ref(0)
const unknownCount = ref(0)

function getDictName(dictId) {
  const d = DICTIONARIES.find(x => x.id === dictId)
  return d ? d.name : '未知词库'
}

// 朗读（Web Speech API）
function speak(word) {
  if (!word) return
  if ('speechSynthesis' in window) {
    // 取消正在读的，避免重叠
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(word)
    u.lang = 'en-US'
    u.rate = 0.9
    u.pitch = 1.0
    window.speechSynthesis.speak(u)
  }
}

// 取出当前要答的词
function loadCurrent() {
  const pending = round.value?.pendingWordIds || []
  if (pending.length === 0) {
    currentWord.value = null
    return
  }
  currentWord.value = WORD_MAP[pending[0]] || null
  showZh.value = false
}

// 加载指定轮次（按路由 id 或当前进行中的轮次）
async function loadRound() {
  const id = route.params.id
  if (id) {
    const all = await getAll('rounds')
    round.value = all.find(r => String(r.id) === String(id)) || null
  } else {
    await loadActiveRound()
    round.value = store.activeRound
  }
  if (round.value && round.value.pendingWordIds?.length === 0) {
    // 已经答完的轮次，直接展示完成页
    currentWord.value = null
  } else {
    loadCurrent()
  }
}

const completedCount = computed(() => {
  if (!round.value) return 0
  return round.value.totalWords - (round.value.pendingWordIds?.length || 0)
})

const progressPercent = computed(() => {
  if (!round.value || !round.value.totalWords) return 0
  return Math.round((completedCount.value / round.value.totalWords) * 100)
})

const isFinished = computed(() => {
  return round.value && (round.value.pendingWordIds?.length || 0) === 0
})

// 把当前词推进（认识 / 不认识 共用：移出 pending，可选记错）
async function advance(known) {
  if (!round.value || !currentWord.value) return
  const wordId = currentWord.value.id

  // 从 pendingWordIds 移除当前词
  round.value.pendingWordIds = (round.value.pendingWordIds || []).filter(id => id !== wordId)

  if (known) {
    knownCount.value++
  } else {
    unknownCount.value++
    // 幂等累加错误次数
    const errId = 'err_' + wordId
    const existing = await getAll('errors')
    const old = existing.find(e => e.id === errId)
    await put('errors', {
      id: errId,
      wordId,
      count: (old?.count || 0) + 1,
      updatedAt: Date.now()
    })
  }

  // 本轮是否答完
  if (round.value.pendingWordIds.length === 0) {
    round.value.status = 'completed'
    round.value.completedAt = Date.now()
  }

  await put('rounds', round.value)

  // 同步更新 store
  if (route.params.id) {
    // 从 /quiz/:id 进入，且本轮已完成 → store.activeRound 也要清
    if (round.value.status === 'completed' && store.activeRound?.id === round.value.id) {
      store.activeRound = null
    }
  } else {
    store.activeRound = round.value.status === 'active' ? round.value : null
  }

  loadCurrent()
}

function markKnown() {
  advance(true)
}

function markUnknown() {
  advance(false)
}

onMounted(loadRound)

watch(() => route.params.id, loadRound)
</script>

<style scoped>
.quiz { padding: 16px; display: flex; flex-direction: column; gap: 16px; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.quiz-header { padding: 14px 16px; }
.quiz-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.round-name { font-weight: 600; font-size: 0.95rem; flex: 1; }
.dict-tag { font-size: 0.72rem; padding: 2px 8px; border-radius: 10px; background: #eef2ff; color: var(--primary); font-weight: 500; }
.progress-bar-bg { height: 8px; background: #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 6px; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--success)); border-radius: 8px; transition: width 0.3s ease; }
.progress-stats { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-secondary); }

.word-card { padding: 28px 20px; text-align: center; }
.word-en { font-size: 2rem; font-weight: 700; word-break: break-word; }
.speak-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 4px 8px; border-radius: 50%; transition: background 0.2s; flex-shrink: 0; line-height: 1; }
.speak-btn:hover { background: #eef2ff; }
.speak-btn:active { transform: scale(0.9); }
.word-en-row { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; }
.word-zh { font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 24px; padding: 12px; background: #f7fafc; border-radius: var(--radius-xs); }
.actions { display: flex; gap: 12px; margin-top: 8px; }
.action-btn { flex: 1; }
.btn-success { background: var(--success, #38a169); color: white; border: none; }
.btn-danger { background: var(--danger, #e53e3e); color: white; border: none; }
.btn-success:active, .btn-danger:active { opacity: 0.85; }
.btn-outline { background: transparent; color: var(--primary); border: 2px solid var(--primary); }

.empty { padding: 40px 20px; text-align: center; }
.empty-emoji { font-size: 3rem; margin-bottom: 12px; }

.done-card { padding: 32px 20px; text-align: center; }
.done-emoji { font-size: 3.5rem; margin-bottom: 8px; }
.done-card h3 { font-size: 1.3rem; margin-bottom: 20px; }
.done-stats { display: flex; justify-content: center; gap: 32px; margin-bottom: 20px; }
.stat-item { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 2rem; font-weight: 700; }
.stat-known .stat-num { color: var(--success, #38a169); }
.stat-unknown .stat-num { color: var(--danger, #e53e3e); }
.stat-label { font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; }
.done-tip { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px; }
.done-actions { display: flex; flex-direction: column; gap: 10px; }
</style>
