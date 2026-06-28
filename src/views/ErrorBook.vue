<template>
  <div class="page">
    <h2 class="page-title">复习</h2>

    <div v-if="groups.length === 0" class="empty-state">
      <div class="empty-icon">✓</div>
      <p>还没有错题</p>
    </div>

    <div v-else class="error-groups">
      <div v-for="(g, gi) in groups" :key="gi" class="card" style="margin-bottom:12px">
        <div class="round-header" @click="g.collapsed = !g.collapsed">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;font-size:0.9rem">
                {{ g.round ? g.round.name : '其他错题' }}
              </span>
              <span v-if="g.round" class="pill-tag">{{ getDictName(g.round) }}</span>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
              {{ g.errors.length }} 项
              <template v-if="g.round && g.round.createdAt">
                · {{ formatTime(g.round.createdAt) }}
              </template>
            </div>
          </div>
          <span class="collapse-mark" :style="{ transform: g.collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }">▼</span>
        </div>

        <div v-show="!g.collapsed" class="error-list">
          <div v-for="e in g.errors" :key="e.id" class="error-row">
            <div style="flex:1;min-width:0">
              <div class="error-title" @click="speakItem(e)">{{ wordTitle(e.wordId) }}</div>
              <div class="error-subtitle">{{ wordSubtitle(e.wordId) }}</div>
            </div>
            <div class="action-btns">
              <span class="count-badge">{{ e.notKnownCount || 0 }}</span>
              <button class="btn-know" @click="handleKnown(e, gi)" :disabled="e._busy">会</button>
              <button class="btn-not-know" @click="handleNotKnown(e, gi)" :disabled="e._busy">不会</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getErrorsByRound, deleteError, removeFromRoundPending, incrementNotKnown } from '../db.js'
import { getSourceName, getStudyItem } from '../items.js'
import { speakText } from '../speech.js'

const groups = ref([])

onMounted(async () => {
  const raw = await getErrorsByRound()
  groups.value = raw.map(g => ({ ...g, collapsed: false }))
})

function getDictName(round) {
  return getSourceName(round)
}

function wordTitle(wordId) {
  return getStudyItem(wordId).title
}

function wordSubtitle(wordId) {
  return getStudyItem(wordId).subtitle
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

const toastMsg = ref('')
let toastTimer = null

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = ''; toastTimer = null }, 2000)
}

async function speakItem(error) {
  const item = getStudyItem(error.wordId)
  await speakText(item.speakText, { lang: item.speakLang, rate: item.speakLang === 'zh-CN' ? 0.85 : 0.9 })
}

async function handleKnown(error, groupIdx) {
  if (error._busy) return
  error._busy = true
  try {
    await deleteError(error.id)
    if (error.roundId != null) {
      await removeFromRoundPending(error.roundId, error.wordId)
    }
    const group = groups.value[groupIdx]
    if (group) {
      group.errors = group.errors.filter(e => e.id !== error.id)
      if (group.errors.length === 0) {
        groups.value = groups.value.filter((_, idx) => idx !== groupIdx)
      }
    }
    showToast('已标记为会')
  } catch (e) {
    console.error('handleKnown failed', e)
    showToast('操作失败')
  } finally {
    error._busy = false
  }
}

async function handleNotKnown(error, groupIdx) {
  if (error._busy) return
  error._busy = true
  try {
    await incrementNotKnown(error.id)
    const group = groups.value[groupIdx]
    if (group) {
      const localErr = group.errors.find(e => e.id === error.id)
      if (localErr) {
        localErr.notKnownCount = (localErr.notKnownCount || 0) + 1
      }
    }
    showToast(`已记录第 ${(error.notKnownCount || 0) + 1} 次不会`)
  } catch (e) {
    console.error('handleNotKnown failed', e)
    showToast('操作失败')
  } finally {
    error._busy = false
  }
}
</script>

<style scoped>
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
.collapse-mark {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: transform .2s;
}
.error-list {
  margin-top: 8px;
  border-top: 0.5px solid rgba(0,0,0,.05);
  padding-top: 8px;
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
