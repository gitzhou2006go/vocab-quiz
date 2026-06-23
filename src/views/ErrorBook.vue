<template>
  <div class="page">
    <h2 class="page-title">📕 错题本</h2>

    <!-- Tab 切换 -->
    <div class="tab-bar">
      <button :class="{ active: currentTab === 'review' }" @click="currentTab = 'review'">📕 复习</button>
      <button :class="{ active: currentTab === 'stats' }" @click="currentTab = 'stats'">📊 统计</button>
    </div>

    <!-- ===== 复习 Tab ===== -->
    <div v-if="currentTab === 'review'">
      <div v-if="groups.length === 0" class="empty-state">
      <div class="empty-icon">🎉</div>
      <p>还没有错题，继续加油！</p>
    </div>

    <div v-else class="error-groups">
      <div v-for="(g, gi) in groups" :key="gi" class="card" style="margin-bottom:12px">
        <!-- 轮次标题（可点击折叠） -->
        <div
          class="round-header"
          @click="g.collapsed = !g.collapsed"
        >
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;font-size:0.9rem">
                {{ g.round ? g.round.name : '其他错题' }}
              </span>
              <span v-if="g.round" class="pill-tag">{{ getDictName(g.round.dictId) }}</span>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
              {{ g.errors.length }} 个错词
              <template v-if="g.round && g.round.createdAt">
                · {{ formatTime(g.round.createdAt) }}
              </template>
            </div>
          </div>
          <span style="font-size:0.9rem;color:var(--text-muted);transition:transform .2s"
            :style="{ transform: g.collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }"
          >▼</span>
        </div>

        <!-- 错词列表 -->
        <div v-show="!g.collapsed" style="margin-top:8px;border-top:0.5px solid rgba(0,0,0,.05);padding-top:8px">
          <div v-for="e in g.errors" :key="e.id" class="error-row">
            <div style="flex:1;min-width:0">
              <div class="error-title" @click="speak(wordTitle(e.wordId))">{{ wordTitle(e.wordId) }}</div>
              <div class="error-subtitle">{{ wordSubtitle(e.wordId) }}</div>
            </div>
            <div class="action-btns">
              <span class="count-badge">{{ e.notKnownCount || 0 }}</span>
              <button class="btn-know" @click="handleKnown(e, gi)" :disabled="e._busy">✓ 会</button>
              <button class="btn-not-know" @click="handleNotKnown(e, gi)" :disabled="e._busy">✕ 不会</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- ===== 统计 Tab ===== -->
    <div v-if="currentTab === 'stats'">
      <div v-if="statsGroups.length === 0" class="empty-state">
        <div class="empty-icon">📊</div>
        <p>还没有标记「不会」的统计</p>
      </div>

      <div v-else class="error-groups">
        <div v-for="(g, gi) in statsGroups" :key="'stats-'+gi" class="card" style="margin-bottom:12px">
          <div class="round-header" @click="g.collapsed = !g.collapsed">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-weight:600;font-size:0.9rem">
                  {{ g.round ? g.round.name : '其他错题' }}
                </span>
                <span v-if="g.round" class="pill-tag">{{ getDictName(g.round.dictId) }}</span>
              </div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
                {{ g.errors.length }} 个词
                <template v-if="g.round && g.round.createdAt">
                  · {{ formatTime(g.round.createdAt) }}
                </template>
              </div>
            </div>
            <span style="font-size:0.9rem;color:var(--text-muted);transition:transform .2s"
              :style="{ transform: g.collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }"
            >▼</span>
          </div>

          <div v-show="!g.collapsed" style="margin-top:8px;border-top:0.5px solid rgba(0,0,0,.05);padding-top:8px">
            <div v-for="e in g.errors" :key="e.id" class="error-row">
              <div style="flex:1;min-width:0">
                <div class="error-title" @click="speak(wordTitle(e.wordId))">{{ wordTitle(e.wordId) }}</div>
                <div class="error-subtitle">{{ wordSubtitle(e.wordId) }}</div>
              </div>
              <div class="action-btns">
                <span class="count-badge">{{ e.notKnownCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getErrorsByRound, deleteError, removeFromRoundPending, incrementNotKnown } from '../db.js'
import { DICTIONARIES, WORD_MAP } from '../vocab.js'

const currentTab = ref('review')
const groups = ref([])

// 统计 Tab：只显示 notKnownCount > 0 的词，按不会次数从多到少排列
const statsGroups = computed(() => {
  return groups.value
    .map(g => ({
      ...g,
      collapsed: g.collapsed,
      errors: g.errors
        .filter(e => (e.notKnownCount || 0) > 0)
        .sort((a, b) => (b.notKnownCount || 0) - (a.notKnownCount || 0))
    }))
    .filter(g => g.errors.length > 0)
})

onMounted(async () => {
  const raw = await getErrorsByRound()
  groups.value = raw.map(g => ({ ...g, collapsed: false }))
})

function getDictName(dictId) {
  const d = DICTIONARIES.find(x => x.id === dictId)
  return d ? d.name : '未知词库'
}

function getWord(wordId) {
  return WORD_MAP[wordId] || null
}

function wordTitle(wordId) {
  const w = WORD_MAP[wordId]
  if (!w) return '未知'
  return w.en || w.title || '未知'
}

function wordSubtitle(wordId) {
  const w = WORD_MAP[wordId]
  if (!w) return ''
  if (w.zh) return w.zh
  if (w.author) return w.author
  return ''
}

function formatTime(ts) {
  try {
    const d = new Date(ts)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    return `${month}/${day} ${hour}:${min}`
  } catch { return '' }
}

// ===== Toast =====
const toastMsg = ref('')
let toastTimer = null

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = ''; toastTimer = null }, 2000)
}

// ===== 发音 =====
function speak(word) {
  if (!word) return
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel()
      try { window.speechSynthesis.getVoices() } catch (_) {}
      const u = new SpeechSynthesisUtterance(word)
      u.lang = 'en-US'
      u.rate = 0.9
      u.pitch = 1.0
      window.speechSynthesis.speak(u)
      return
    } catch (_) {}
  }
  // fallback: 有道语音
  try {
    const url = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(word) + '&type=1'
    const audio = new Audio(url)
    audio.play().catch(() => {})
  } catch (_) {}
}

// ===== 会 / 不会 操作 =====
async function handleKnown(error, groupIdx) {
  if (error._busy) return
  error._busy = true
  try {
    // 从 errors store 删除
    await deleteError(error.id)
    // 如果轮次仍 active，也从 pendingWordIds 移除
    if (error.roundId != null) {
      await removeFromRoundPending(error.roundId, error.wordId)
    }
    // 从本地列表移除
    const group = groups.value[groupIdx]
    if (group) {
      group.errors = group.errors.filter(e => e.id !== error.id)
      if (group.errors.length === 0) {
        groups.value = groups.value.filter((_, idx) => idx !== groupIdx)
      }
    }
    showToast('✓ 已标记为掌握')
  } catch (e) {
    console.error('handleKnown failed', e)
    showToast('⚠️ 操作失败')
  } finally {
    error._busy = false
  }
}

async function handleNotKnown(error, groupIdx) {
  if (error._busy) return
  error._busy = true
  try {
    await incrementNotKnown(error.id)
    // 本地同步更新 notKnownCount
    const group = groups.value[groupIdx]
    if (group) {
      const localErr = group.errors.find(e => e.id === error.id)
      if (localErr) {
        localErr.notKnownCount = (localErr.notKnownCount || 0) + 1
      }
    }
    showToast(`✕ 已记录（第 ${(error.notKnownCount || 0) + 1} 次不会）`)
  } catch (e) {
    console.error('handleNotKnown failed', e)
    showToast('⚠️ 操作失败')
  } finally {
    error._busy = false
  }
}
</script>

<style scoped>
.tab-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  background: var(--bg);
  border-radius: var(--radius-pill);
  padding: 3px;
}
.tab-bar button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.tab-bar button.active {
  background: var(--card-bg);
  color: var(--text-primary);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.error-groups {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.round-header {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.round-header:active {
  opacity: 0.7;
}
.error-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 4px;
  border-bottom: 0.5px solid rgba(0,0,0,.03);
}
.error-row:last-child {
  border-bottom: none;
}
.error-title {
  font-weight: 600;
  font-size: 0.88rem;
  word-break: break-word;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.15s;
}
.error-title:active { opacity: 0.6; }
.error-subtitle {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-top: 1px;
  word-break: break-word;
}
.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 12px;
  background: var(--danger);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
}
.action-btns {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.action-btns button {
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.action-btns button:active { transform: scale(0.93); }
.action-btns button:disabled { opacity: 0.4; pointer-events: none; }
.btn-know {
  background: var(--primary);
  color: #fff;
}
.btn-not-know {
  background: transparent;
  color: var(--danger);
  border: 1.2px solid var(--danger) !important;
}
.btn-not-know:active { background: #FFF0EF; }

.toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 500;
  background: #333;
  color: #fff;
  animation: slideDown 0.25s ease;
  max-width: 80%;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
@keyframes slideDown {
  from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
</style>
