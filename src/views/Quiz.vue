<template>
  <div class="quiz-page">
    <!-- 顶部进度 -->
    <div v-if="round" class="progress-card">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="font-weight:600;font-size:0.85rem;flex:1">{{ round.name }}</span>
        <span class="pill-tag">{{ getDictName(round.dictId) }}</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);margin-top:6px">
        {{ completedCount }} / {{ round.totalWords }}
      </div>
    </div>

    <!-- 答题卡片 -->
    <div v-if="currentWord && round" class="word-card">
      <div class="word-main">
        <div class="word-title-row">
          <div class="word-en">{{ currentWord.en || currentWord.title }}</div>
          <button v-if="currentWord.en" class="speak-btn" @click="speak(currentWord.en)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
        </div>
        <span v-if="currentWord.author" class="word-author">{{ currentWord.author }}</span>
      </div>

      <div v-if="currentWord.zh || currentWord.content">
        <div v-if="!showZh" class="zh-toggle" @click="showZh = true">
          <span>{{ currentWord.zh ? '👁 看释义' : '👁 看全文' }}</span>
        </div>
        <div v-else class="zh-visible" @click="showZh = false">
          <span>{{ currentWord.zh || currentWord.content }}</span>
          <span class="zh-hint">轻点收起</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-unknown" @click="markUnknown">
          <span style="font-size:0.82rem">✕</span> 不认识
        </button>
        <button class="btn btn-known" @click="markKnown">
          <span style="font-size:0.82rem">✓</span> 认识
        </button>
      </div>
    </div>

    <!-- 无进行中轮次 -->
    <div v-else-if="!round" class="empty-state">
      <div class="empty-icon">🤔</div>
      <p>没有进行中的轮次</p>
      <button class="btn btn-primary btn-block" @click="$router.push('/')">去首页开一轮</button>
    </div>

    <!-- 本轮完成 -->
    <div v-else class="done-card">
      <div style="font-size:3.5rem;margin-bottom:8px">🎉</div>
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:20px">本轮完成！</h3>
      <div class="done-stats">
        <div class="done-stat">
          <div style="font-size:2rem;font-weight:700;color:var(--success)">{{ knownCount }}</div>
          <div style="font-size:0.8rem;color:var(--text-secondary)">认识</div>
        </div>
        <div class="done-divider"></div>
        <div class="done-stat">
          <div style="font-size:2rem;font-weight:700;color:var(--danger)">{{ unknownCount }}</div>
          <div style="font-size:0.8rem;color:var(--text-secondary)">不认识</div>
        </div>
      </div>
      <p v-if="unknownCount > 0" style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">
        {{ unknownCount }} 个错词已记入错题本
      </p>
      <div style="display:flex;flex-direction:column;gap:10px;width:100%">
        <button class="btn btn-secondary btn-block" @click="$router.push('/errors')">📕 查看错题本</button>
        <button class="btn btn-primary btn-block" @click="$router.push('/')">🏠 返回首页</button>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastMsg" class="toast" :class="toastType">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, toRaw } from 'vue'
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
const toastMsg = ref('')
const toastType = ref('')
let toastTimer = null

function showToast(msg, type = 'error') {
  toastMsg.value = msg
  toastType.value = type
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = ''; toastTimer = null }, 2500)
}

function getDictName(dictId) {
  const d = DICTIONARIES.find(x => x.id === dictId)
  return d ? d.name : '未知词库'
}

const speaking = ref(false)
let speechTimer = null

function speak(word) {
  if (!word) return
  if (speaking.value) {
    window.speechSynthesis?.cancel()
    clearTimeout(speechTimer)
  }
  speaking.value = true
  showToast('🔊 播放中', 'success')
  clearTimeout(speechTimer)
  speechTimer = setTimeout(() => { speaking.value = false; showToast('') }, 4000)

  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel()
      try { window.speechSynthesis.getVoices() } catch (_) {}
      const u = new SpeechSynthesisUtterance(word)
      u.lang = 'en-US'
      u.rate = 0.9
      u.pitch = 1.0
      u.onend = () => { speaking.value = false; clearTimeout(speechTimer); showToast('') }
      u.onerror = () => { fallbackSpeak(word) }
      window.speechSynthesis.speak(u)
      return
    } catch (_) {}
  }
  fallbackSpeak(word)
}

function fallbackSpeak(word) {
  try {
    const url = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(word) + '&type=1'
    const audio = new Audio(url)
    audio.onended = () => { speaking.value = false; clearTimeout(speechTimer); showToast('') }
    audio.onerror = () => { showToast('⚠️ 语音不可用', 'error'); speaking.value = false; clearTimeout(speechTimer) }
    audio.play().catch(() => { showToast('⚠️ 语音不可用', 'error'); speaking.value = false; clearTimeout(speechTimer) })
  } catch (e) {
    showToast('⚠️ 语音不可用', 'error')
    speaking.value = false; clearTimeout(speechTimer)
  }
}

function loadCurrent() {
  const pending = round.value?.pendingWordIds || []
  if (pending.length === 0) { currentWord.value = null; return }
  currentWord.value = WORD_MAP[pending[0]] || null
}

async function loadRound() {
  const id = route.params.id
  if (id) {
    const all = await getAll('rounds')
    round.value = all.find(r => String(r.id) === String(id)) || null
  } else {
    // 无指定轮次 ID 时取第一个进行中的轮次
    await loadActiveRound()
    round.value = store.activeRounds[0] || null
  }
  if (round.value && round.value.pendingWordIds?.length === 0) {
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

async function advance(known) {
  if (!round.value || !currentWord.value) return
  try {
    const wordId = currentWord.value.id
    round.value.pendingWordIds = (round.value.pendingWordIds || []).filter(id => id !== wordId)

    if (known) {
      knownCount.value++
    } else {
      unknownCount.value++
      const errId = 'err_' + wordId
      const existing = await getAll('errors')
      const old = existing.find(e => e.id === errId)
      await put('errors', {
        id: errId, wordId,
        count: (old?.count || 0) + 1,
        updatedAt: Date.now()
      })
    }

    if (round.value.pendingWordIds.length === 0) {
      round.value.status = 'completed'
      round.value.completedAt = Date.now()
    }

    await put('rounds', toRaw(round.value))

    // 刷新 store 中的 active 轮次列表
    await loadActiveRound()

    loadCurrent()
  } catch (e) {
    console.error('advance failed', e)
    showToast('⚠️ 保存失败: ' + (e.message || ''), 'error')
  }
}

function markKnown() { advance(true) }
function markUnknown() { advance(false) }

onMounted(loadRound)
watch(() => route.params.id, loadRound)
</script>

<style scoped>
.quiz-page {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

/* progress card */
.progress-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 14px 16px;
  box-shadow: var(--shadow);
}

/* word card */
.word-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: var(--shadow);
  gap: 20px;
}

.word-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
}
.word-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.word-en {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  word-break: break-word;
  text-align: center;
}
.word-author {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 400;
  margin-top: 4px;
}

.speak-btn {
  background: var(--primary-light);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary);
  transition: all 0.2s;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.speak-btn:active { transform: scale(0.9); background: #D0E3FF; }

.zh-toggle {
  padding: 10px 20px;
  border: 1.5px dashed #C7C7CC;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s;
}
.zh-toggle:active { border-color: var(--primary); color: var(--primary); }

.zh-visible {
  width: 100%;
  text-align: center;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.zh-visible > span:first-child { font-size: 1.1rem; color: var(--text-primary); display: block; }
.zh-hint { display: block; font-size: 0.7rem; color: var(--text-muted); margin-top: 6px; }

.actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.btn-known {
  flex: 1;
  background: var(--primary);
  color: white;
  border: none;
  padding: 14px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.btn-known:active { transform: scale(0.97); opacity: 0.85; }

.btn-unknown {
  flex: 1;
  background: transparent;
  color: var(--danger);
  border: 1.5px solid var(--danger);
  padding: 14px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.btn-unknown:active { transform: scale(0.97); background: #FFF0EF; }

/* done card */
.done-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 40px 24px;
  box-shadow: var(--shadow);
}
.done-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}
.done-stat { text-align: center; }
.done-divider {
  width: 1px;
  height: 48px;
  background: #E8E8ED;
}

/* toast */
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 500;
  animation: slideDown 0.3s ease;
  max-width: 90%;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}
.toast.success { background: #E8F8E8; color: #34C759; }
.toast.error { background: #FEF0F0; color: #FF3B30; }
@keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

/* iPad / 大屏适配 */
@media (min-width: 640px) {
  .quiz-page { gap: 24px; }
  .word-en { font-size: 2.8rem; }
  .word-author { font-size: 1rem; }
  .word-card { padding: 48px 40px; border-radius: 20px; gap: 28px; }
  .zh-visible { padding: 24px; }
  .zh-visible > span:first-child { font-size: 1.3rem; }
  .btn-known, .btn-unknown { padding: 16px; font-size: 1rem; }
  .done-card { padding: 56px 40px; border-radius: 20px; }
  .done-card h3 { font-size: 1.5rem; }
}
</style>
