<template>
  <div class="page">
    <h2 class="page-title">错题本</h2>

    <div v-if="sortedErrors.length === 0" class="empty-state">
      <div class="empty-icon">🎉</div>
      <p>还没有错题，继续加油！</p>
    </div>

    <div v-else class="card-group">
      <div v-for="item in sortedErrors" :key="item.wordId" class="card" style="display:flex;align-items:center;gap:12px">
        <div style="flex:1">
          <div style="font-weight:600;font-size:0.9rem">{{ wordTitle(item.wordId) }}</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:1px">{{ wordSubtitle(item.wordId) }}</div>
        </div>
        <span class="pill-tag" style="background:#FEF0F0;color:var(--danger)">{{ item.totalCount }} 次错</span>
      </div>
    </div>

    <div v-if="sortedErrors.length > 0" style="text-align:center;padding-top:4px">
      <span class="text-muted">共 {{ sortedErrors.length }} 个错词</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAggregatedErrors } from '../db.js'
import { WORD_MAP } from '../vocab.js'

const errorStats = ref([])

onMounted(async () => {
  errorStats.value = await getAggregatedErrors()
})

const sortedErrors = computed(() => {
  return [...errorStats.value].sort((a, b) => b.totalCount - a.totalCount)
})

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
</script>

<style scoped>
</style>
