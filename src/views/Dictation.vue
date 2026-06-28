<template>
  <div class="page dictation-page">
    <h2 class="page-title">汉字听写</h2>

    <div class="toolbar-card">
      <label>
        <span>课程</span>
        <select v-model="selectedCourseId">
          <option v-for="course in DICTATION_COURSES" :key="course.id" :value="course.id">
            {{ course.name }}
          </option>
        </select>
      </label>
      <label>
        <span>课次</span>
        <select v-model="selectedLessonId">
          <option v-for="lesson in selectedCourse.lessons" :key="lesson.id" :value="lesson.id">
            {{ lesson.name }}
          </option>
        </select>
      </label>
    </div>

    <div class="summary-row">
      <span class="pill-tag">{{ selectedLesson.items.length }} 项</span>
      <span class="pill-tag ok">{{ knownCount }} 会</span>
      <span class="pill-tag danger">{{ unknownCount }} 不会</span>
    </div>

    <div class="dictation-list">
      <div
        v-for="item in selectedLesson.items"
        :key="item.id"
        class="dictation-row"
        :class="{ unknown: !knownMap[item.id] }"
      >
        <button class="speak-cell" @click="speakItem(item)" type="button">
          <span class="hanzi">{{ item.text }}</span>
          <span class="pinyin">{{ item.pinyin }}</span>
        </button>
        <label class="known-toggle">
          <input type="checkbox" v-model="knownMap[item.id]" />
          <span>{{ knownMap[item.id] ? '会' : '不会' }}</span>
        </label>
      </div>
    </div>

    <div class="bottom-actions">
      <button class="btn btn-secondary" @click="markAll(true)">全会</button>
      <button class="btn btn-secondary danger-btn" @click="markAll(false)">全不会</button>
      <button class="btn btn-primary submit-btn" @click="submitLesson" :disabled="saving">
        {{ saving ? '保存中...' : '完成本课' }}
      </button>
    </div>

    <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createDictationRound } from '../db.js'
import { DICTATION_COURSES } from '../dictation.js'
import { speakText } from '../speech.js'

const router = useRouter()
const selectedCourseId = ref(DICTATION_COURSES[0].id)
const selectedLessonId = ref(DICTATION_COURSES[0].lessons[0].id)
const knownMap = reactive({})
const saving = ref(false)
const toastMsg = ref('')
let toastTimer = null

const selectedCourse = computed(() => {
  return DICTATION_COURSES.find(c => c.id === selectedCourseId.value) || DICTATION_COURSES[0]
})

const selectedLesson = computed(() => {
  return selectedCourse.value.lessons.find(l => l.id === selectedLessonId.value) || selectedCourse.value.lessons[0]
})

const knownCount = computed(() => selectedLesson.value.items.filter(item => knownMap[item.id]).length)
const unknownCount = computed(() => selectedLesson.value.items.length - knownCount.value)

watch(selectedCourseId, () => {
  selectedLessonId.value = selectedCourse.value.lessons[0].id
})

watch(selectedLessonId, resetLesson, { immediate: true })

function resetLesson() {
  for (const key of Object.keys(knownMap)) delete knownMap[key]
  for (const item of selectedLesson.value.items) knownMap[item.id] = true
}

function markAll(known) {
  for (const item of selectedLesson.value.items) knownMap[item.id] = known
}

async function speakItem(item) {
  await speakText(item.text, { lang: 'zh-CN', rate: 0.85 })
}

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = ''; toastTimer = null }, 1800)
}

async function submitLesson() {
  if (saving.value) return
  saving.value = true
  try {
    const unknownItems = selectedLesson.value.items.filter(item => !knownMap[item.id])
    await createDictationRound(selectedCourse.value, selectedLesson.value, unknownItems)
    showToast(`已保存：${unknownItems.length} 项不会`)
    setTimeout(() => router.push('/stats'), 500)
  } catch (e) {
    console.error('save dictation failed', e)
    showToast('保存失败')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.dictation-page {
  max-width: 820px;
  margin: 0 auto;
}
.toolbar-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
}
.toolbar-card label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-weight: 600;
}
.toolbar-card select {
  width: 100%;
  border: 1px solid #D1D1D6;
  border-radius: 10px;
  background: #fff;
  color: var(--text-primary);
  padding: 10px 12px;
  font-size: 1rem;
  outline: none;
}
.summary-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.pill-tag.ok {
  background: #E8F8E8;
  color: var(--success);
}
.pill-tag.danger {
  background: #FEF0F0;
  color: var(--danger);
}
.dictation-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: var(--radius);
  overflow: hidden;
}
.dictation-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card-bg);
  padding: 14px 16px;
  border-bottom: 0.5px solid rgba(0,0,0,0.05);
}
.dictation-row.unknown {
  background: #FFF7F7;
}
.speak-cell {
  flex: 1;
  min-width: 0;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hanzi {
  display: block;
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
}
.pinyin {
  display: block;
  margin-top: 2px;
  font-size: 0.86rem;
  color: var(--text-secondary);
}
.known-toggle {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 72px;
  justify-content: flex-end;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-secondary);
}
.known-toggle input {
  width: 20px;
  height: 20px;
  accent-color: var(--primary);
}
.bottom-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr;
  gap: 10px;
  position: sticky;
  bottom: calc(90px + var(--safe-bottom));
  padding: 10px 0;
  background: var(--bg);
}
.danger-btn {
  color: var(--danger);
}
.submit-btn {
  min-width: 0;
}
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

@media (max-width: 560px) {
  .toolbar-card {
    grid-template-columns: 1fr;
  }
  .bottom-actions {
    grid-template-columns: 1fr;
  }
}
</style>
