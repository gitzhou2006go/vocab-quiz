<template>
  <div class="error-book">
    <h2>错题本</h2>

    <div v-if="sortedErrors.length === 0" class="empty card">
      <div class="empty-emoji">🎉</div>
      <p>还没有错题，继续加油！</p>
    </div>

    <div v-else class="error-list">
      <div v-for="item in sortedErrors" :key="item.wordId" class="error-row card">
        <div class="error-main">
          <div class="error-word">{{ getWord(item.wordId)?.en || '未知' }}</div>
          <div class="error-zh">{{ getWord(item.wordId)?.zh || '' }}</div>
        </div>
        <span class="error-count-badge">{{ item.totalCount }} 次错</span>
      </div>
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
</script>

<style scoped>
.error-book { padding: 16px; }
.empty { padding: 40px 20px; text-align: center; }
.empty-emoji { font-size: 3rem; margin-bottom: 12px; }
.empty p { color: var(--text-secondary); }
.error-list { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
.error-row { display: flex; align-items: center; gap: 12px; padding: 14px 16px; }
.error-main { flex: 1; }
.error-word { font-weight: 600; font-size: 1rem; }
.error-zh { font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px; }
.error-count-badge { font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; background: #fff5f5; color: var(--danger, #e53e3e); font-weight: 600; white-space: nowrap; }
</style>
