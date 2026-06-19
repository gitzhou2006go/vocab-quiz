<template>
  <div class="page">
    <h2 class="page-title">历史轮次</h2>

    <div v-if="rounds.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <p>还没有轮次记录</p>
      <button class="btn btn-primary" @click="$router.push('/')">去开一轮</button>
    </div>

    <div v-else class="card-group">
      <div
        v-for="r in sortedRounds"
        :key="r.id"
        class="card"
        :style="{ cursor: r.status === 'active' ? 'pointer' : 'default' }"
        @click="goQuiz(r)"
      >
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span class="pill-tag" :class="r.status === 'active' ? '' : 'completed-tag'">
            {{ r.status === 'active' ? '进行中' : '已完成' }}
          </span>
          <span style="font-weight:600;font-size:0.88rem;flex:1">{{ r.name }}</span>
          <span class="pill-tag">{{ getDictName(r.dictId) }}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: percent(r) + '%' }"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-secondary);margin-top:6px">
          <span>{{ completed(r) }} / {{ r.totalWords }} 词</span>
          <span>{{ percent(r) }}%</span>
        </div>
        <div v-if="r.createdAt" style="font-size:0.72rem;color:var(--text-muted);margin-top:6px">
          {{ formatTime(r.createdAt) }}
        </div>
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

function completed(r) {
  return r.totalWords - (r.pendingWordIds?.length || 0)
}

function percent(r) {
  if (!r.totalWords) return 0
  return Math.round((completed(r) / r.totalWords) * 100)
}

function formatTime(ts) {
  try {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  } catch { return '' }
}

function goQuiz(r) {
  if (r.status === 'active') router.push(`/quiz/${r.id}`)
}
</script>

<style scoped>
.completed-tag { background: #E8E8ED; color: var(--text-secondary); }
</style>
