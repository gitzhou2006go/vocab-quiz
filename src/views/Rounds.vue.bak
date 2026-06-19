<template>
  <div class="rounds">
    <h2>历史轮次</h2>

    <div v-if="rounds.length === 0" class="empty card">
      <div class="empty-emoji">📋</div>
      <p>还没有轮次记录</p>
      <button class="btn btn-primary" @click="$router.push('/')">去开一轮</button>
    </div>

    <div v-else class="round-list">
      <div
        v-for="round in sortedRounds"
        :key="round.id"
        class="round-card card"
        :class="{ clickable: round.status === 'active' }"
        @click="goQuiz(round)"
      >
        <div class="round-header">
          <span class="round-name">{{ round.name }}</span>
          <span class="status-badge" :class="round.status">
            {{ round.status === 'active' ? '进行中' : '已完成' }}
          </span>
        </div>
        <div class="round-meta">
          <span class="dict-tag">{{ getDictName(round.dictId) }}</span>
          <span class="progress-text">{{ completed(round) }} / {{ round.totalWords }} 词</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: percent(round) + '%' }"></div>
        </div>
        <div v-if="round.createdAt" class="round-time">{{ formatTime(round.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAll } from '../db.js'
import { DICTIONARIES } from '../vocab.js'

const router = useRouter()
const rounds = ref([])

onMounted(async () => {
  rounds.value = await getAll('rounds')
})

const sortedRounds = computed(() => {
  return [...rounds.value].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
})

function getDictName(dictId) {
  const d = DICTIONARIES.find(x => x.id === dictId)
  return d ? d.name : '未知词库'
}

function completed(round) {
  return round.totalWords - (round.pendingWordIds?.length || 0)
}

function percent(round) {
  if (!round.totalWords) return 0
  return Math.round((completed(round) / round.totalWords) * 100)
}

function formatTime(ts) {
  try {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  } catch {
    return ''
  }
}

function goQuiz(round) {
  if (round.status === 'active') {
    router.push(`/quiz/${round.id}`)
  }
}
</script>

<style scoped>
.rounds { padding: 16px; }
.empty { padding: 40px 20px; text-align: center; }
.empty-emoji { font-size: 3rem; margin-bottom: 12px; }
.empty p { color: var(--text-secondary); margin-bottom: 16px; }
.round-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
.round-card { padding: 14px 16px; }
.round-card.clickable { cursor: pointer; transition: transform 0.2s; }
.round-card.clickable:active { transform: scale(0.98); }
.round-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.round-name { font-weight: 600; font-size: 0.95rem; }
.status-badge { font-size: 0.72rem; padding: 2px 10px; border-radius: 10px; font-weight: 600; }
.status-badge.active { background: #c6f6d5; color: #276749; }
.status-badge.completed { background: #edf2f7; color: #4a5568; }
.round-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.dict-tag { font-size: 0.72rem; padding: 2px 8px; border-radius: 10px; background: #eef2ff; color: var(--primary, #4CAF50); font-weight: 500; }
.progress-text { font-size: 0.78rem; color: var(--text-secondary); }
.progress-bar-bg { height: 6px; background: #e2e8f0; border-radius: 6px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary, #4CAF50), var(--success, #38a169)); border-radius: 6px; transition: width 0.3s ease; }
.round-time { font-size: 0.72rem; color: var(--text-muted); margin-top: 8px; }
</style>
