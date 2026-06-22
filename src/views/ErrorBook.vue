<template>
  <div class="page">
    <h2 class="page-title">📕 错题本</h2>

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
              <div class="error-title">{{ wordTitle(e.wordId) }}</div>
              <div class="error-subtitle">{{ wordSubtitle(e.wordId) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getErrorsByRound } from '../db.js'
import { DICTIONARIES, WORD_MAP } from '../vocab.js'

const groups = ref([])

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
}
.error-subtitle {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-top: 1px;
  word-break: break-word;
}
</style>
