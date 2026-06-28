<template>
  <div class="page planner-page">
    <div class="planner-head">
      <div>
        <h2 class="page-title">每日学习</h2>
        <p class="text-secondary">安排任务、计时，并回看每天真实完成时间</p>
      </div>
      <input class="date-input" type="date" v-model="selectedDate" />
    </div>

    <section class="card template-panel">
      <div class="section-title">任务模板</div>
      <form class="template-form" @submit.prevent="addTemplate">
        <select v-model="newTemplateSubject">
          <option v-for="subject in SUBJECTS" :key="subject" :value="subject">{{ subject }}</option>
        </select>
        <input v-model.trim="newTemplateName" placeholder="添加模板，例如：数学计算" />
        <button class="btn btn-primary" type="submit" :disabled="!newTemplateName">添加</button>
      </form>
      <div class="template-list">
        <span v-for="template in activeTemplates" :key="template.id" class="template-chip">
          <small>{{ templateSubject(template) }}</small>
          {{ template.name }}
          <button type="button" @click="archiveTemplate(template)" title="停用">×</button>
        </span>
      </div>
    </section>

    <section class="day-summary">
      <div class="summary-card">
        <span>今日学习</span>
        <strong>{{ formatDuration(dayStudyMs) }}</strong>
      </div>
      <div class="summary-card">
        <span>今日休息</span>
        <strong>{{ formatDuration(dayRestMs) }}</strong>
      </div>
      <div class="summary-card">
        <span>已完成任务</span>
        <strong>{{ completedTaskCount }}</strong>
      </div>
    </section>

    <section v-for="period in PERIODS" :key="period.key" class="period-card card">
      <div class="period-header">
        <div>
          <h3>{{ period.label }}</h3>
          <p>{{ periodTimeLabel(period.key) }}</p>
        </div>
        <div class="period-tools">
          <div class="period-stats">
            <span>学习 {{ formatDuration(periodStudyMs(period.key)) }}</span>
            <span>休息 {{ formatDuration(periodRestMs(period.key)) }}</span>
          </div>
          <button class="add-task-btn" type="button" @click="toggleTemplatePicker(period.key)">
            {{ pickerOpenByPeriod[period.key] ? '收起模板' : '添加任务' }}
          </button>
        </div>
      </div>

      <div v-if="pickerOpenByPeriod[period.key]" class="template-picker">
        <div v-for="group in activeTemplateGroups" :key="group.subject" class="picker-group">
          <div class="picker-subject">{{ group.subject }}</div>
          <div class="picker-chips">
            <button
              v-for="template in group.templates"
              :key="template.id"
              type="button"
              class="pick-chip"
              :class="{ selected: hasTemplate(period.key, template.id) }"
              @click="toggleTemplate(period.key, template)"
            >
              {{ template.name }}
            </button>
          </div>
        </div>
        <div v-if="activeTemplates.length === 0" class="empty-picker">先在上方添加任务模板</div>
      </div>

      <div v-if="plan.periods[period.key].tasks.length === 0" class="empty-period">
        这个时间段还没有安排
      </div>

      <div v-else class="task-list">
        <div
          v-for="task in plan.periods[period.key].tasks"
          :key="task.id"
          class="task-row"
          :class="{ running: !!task.runningStart }"
        >
          <div class="task-main">
            <div class="task-name">{{ task.name }}</div>
            <div class="task-meta">
              {{ taskSubject(task) }} · {{ taskStatus(task) }} · {{ sessionCount(task) }} 次
            </div>
          </div>
          <div class="task-time">{{ formatDuration(taskDurationMs(task)) }}</div>
          <div class="task-actions">
            <button class="mini-btn start" @click="startTask(period.key, task)" :disabled="!!activeTask || !!task.runningStart">开始</button>
            <button class="mini-btn stop" @click="stopTask(period.key, task)" :disabled="!task.runningStart">结束</button>
          </div>
        </div>
      </div>
    </section>

    <section class="card chart-panel">
      <div class="section-title">时间段统计</div>
      <div class="chart-toolbar">
        <input class="stats-date-input" type="date" v-model="selectedStatsDate" />
        <select v-model="selectedStatsPeriodKey">
          <option v-for="period in PERIODS" :key="period.key" :value="period.key">{{ period.label }}</option>
        </select>
      </div>
      <div class="stats-summary">
        <span>学习 {{ formatDuration(statsStudyMs) }}</span>
        <span>其他 {{ formatDuration(statsOtherMs) }}</span>
        <span>{{ statsPeriodLabel }}</span>
      </div>

      <div class="stats-block">
        <div class="stats-block-title">任务耗时</div>
        <div v-if="statsTaskBars.length === 0" class="empty-period">这个时间段还没有任务耗时</div>
        <div v-else class="duration-chart">
          <div v-for="bar in statsTaskBars" :key="bar.key" class="duration-row">
            <div class="duration-label">{{ bar.label }}</div>
            <div class="duration-track">
              <div class="duration-fill task-fill" :style="{ width: bar.width + '%' }"></div>
            </div>
            <div class="duration-value">{{ formatShortDuration(bar.ms) }}</div>
          </div>
        </div>
      </div>

      <div class="stats-block">
        <div class="stats-block-title">科目耗时</div>
        <div v-if="statsSubjectBars.length === 0" class="empty-period">这个时间段还没有科目耗时</div>
        <div v-else class="duration-chart">
          <div v-for="bar in statsSubjectBars" :key="bar.key" class="duration-row">
            <div class="duration-label">{{ bar.label }}</div>
            <div class="duration-track">
              <div class="duration-fill subject-fill" :style="{ width: bar.width + '%' }"></div>
            </div>
            <div class="duration-value">{{ formatShortDuration(bar.ms) }}</div>
          </div>
        </div>
      </div>

      <div class="stats-block">
        <div class="stats-block-title">其他时间</div>
        <div class="duration-chart">
          <div class="duration-row">
            <div class="duration-label">没有任务</div>
            <div class="duration-track">
              <div class="duration-fill other-fill" :style="{ width: statsOtherBarWidth + '%' }"></div>
            </div>
            <div class="duration-value">{{ formatShortDuration(statsOtherMs) }}</div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import {
  getTaskTemplates,
  saveTaskTemplate,
  getDailyPlan,
  saveDailyPlan,
  getDailyPlans
} from '../db.js'

const PERIODS = [
  { key: 'morning', label: '上午' },
  { key: 'afternoon', label: '下午' },
  { key: 'evening', label: '晚上' }
]
const SUBJECTS = ['语文', '数学', '英语', '其他']
const DEFAULT_SUBJECT = '其他'
const MAX_TASK_MS = 60 * 60 * 1000

const selectedDate = ref(todayKey())
const templates = ref([])
const allPlans = ref([])
const newTemplateName = ref('')
const newTemplateSubject = ref('数学')
const selectedStatsDate = ref(todayKey())
const selectedStatsPeriodKey = ref(currentPeriodKey())
const pickerOpenByPeriod = reactive({ morning: false, afternoon: false, evening: false })
const tick = ref(Date.now())
const toastMsg = ref('')
let timer = null
let toastTimer = null
let autoStopSaving = false

const plan = reactive({
  date: selectedDate.value,
  periods: emptyPeriods(),
  createdAt: Date.now(),
  updatedAt: Date.now()
})

const activeTemplates = computed(() => templates.value.filter(t => !t.archived))
const activeTemplateGroups = computed(() => {
  return SUBJECTS
    .map(subject => ({
      subject,
      templates: activeTemplates.value.filter(template => templateSubject(template) === subject)
    }))
    .filter(group => group.templates.length > 0)
})

const activeTask = computed(() => {
  for (const period of PERIODS) {
    const task = plan.periods[period.key].tasks.find(t => t.runningStart)
    if (task) return task
  }
  return null
})

const dayStudyMs = computed(() => PERIODS.reduce((sum, p) => sum + periodStudyMs(p.key), 0))
const dayRestMs = computed(() => PERIODS.reduce((sum, p) => sum + periodRestMs(p.key), 0))
const completedTaskCount = computed(() => PERIODS.reduce((sum, p) => {
  return sum + plan.periods[p.key].tasks.filter(t => !t.runningStart && sessionCount(t) > 0).length
}, 0))

const selectedStatsPlan = computed(() => getPlanForDate(selectedStatsDate.value))
const selectedStatsPeriod = computed(() => selectedStatsPlan.value.periods[selectedStatsPeriodKey.value] || createEmptyPeriodState())
const statsStudyMs = computed(() => periodStudyMsFromPeriod(selectedStatsPeriod.value, selectedStatsDate.value === selectedDate.value))
const statsOtherMs = computed(() => periodOtherMsFromPeriod(selectedStatsPeriod.value, selectedStatsDate.value === selectedDate.value))
const statsPeriodLabel = computed(() => {
  const period = PERIODS.find(p => p.key === selectedStatsPeriodKey.value)
  return `${selectedStatsDate.value} ${period?.label || ''}`
})
const statsTaskBars = computed(() => {
  const rows = (selectedStatsPeriod.value.tasks || [])
    .map(task => ({
      key: task.id,
      label: task.name,
      ms: taskDurationMs(task, selectedStatsDate.value === selectedDate.value)
    }))
    .filter(row => row.ms > 0)
  return withBarWidths(rows)
})
const statsSubjectBars = computed(() => {
  const totals = {}
  for (const task of selectedStatsPeriod.value.tasks || []) {
    const subject = taskSubject(task)
    totals[subject] = (totals[subject] || 0) + taskDurationMs(task, selectedStatsDate.value === selectedDate.value)
  }
  const rows = Object.entries(totals)
    .map(([subject, ms]) => ({ key: subject, label: subject, ms }))
    .filter(row => row.ms > 0)
  return withBarWidths(rows)
})
const statsOtherBarWidth = computed(() => {
  const max = Math.max(statsStudyMs.value, statsOtherMs.value, 1)
  return Math.max(statsOtherMs.value > 0 ? 8 : 0, Math.round((statsOtherMs.value / max) * 100))
})

onMounted(async () => {
  await loadTemplates()
  await loadPlan()
  timer = setInterval(() => {
    tick.value = Date.now()
    enforceAutoStopTasks().catch(() => {})
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

watch(selectedDate, loadPlan)

async function loadTemplates() {
  templates.value = await getTaskTemplates()
}

async function loadPlan() {
  const data = await getDailyPlan(selectedDate.value)
  Object.assign(plan, normalizePlan(data))
  allPlans.value = await getDailyPlans()
  closeTemplatePickers()
  await enforceAutoStopTasks()
}

function normalizePlan(data) {
  const normalized = {
    ...data,
    periods: {
      ...emptyPeriods(),
      ...(data.periods || {})
    }
  }
  for (const period of PERIODS) {
    normalized.periods[period.key] = {
      startedAt: normalized.periods[period.key]?.startedAt || null,
      endedAt: normalized.periods[period.key]?.endedAt || null,
      tasks: (normalized.periods[period.key]?.tasks || []).map(task => ({
        sessions: [],
        runningStart: null,
        ...task,
        subject: task.subject || inferSubjectFromName(task.name)
      }))
    }
  }
  return normalized
}

async function persistPlan() {
  await saveDailyPlan(JSON.parse(JSON.stringify(plan)))
  allPlans.value = await getDailyPlans()
}

async function addTemplate() {
  const name = newTemplateName.value.trim()
  if (!name) return
  await saveTaskTemplate({ name, subject: newTemplateSubject.value })
  newTemplateName.value = ''
  await loadTemplates()
}

async function archiveTemplate(template) {
  await saveTaskTemplate({ ...template, archived: true })
  await loadTemplates()
}

function hasTemplate(periodKey, templateId) {
  return plan.periods[periodKey].tasks.some(task => task.templateId === templateId)
}

function templateSubject(template) {
  return normalizeSubject(template?.subject || inferSubjectFromName(template?.name))
}

function taskSubject(task) {
  const template = templates.value.find(item => item.id === task.templateId)
  return normalizeSubject(task?.subject || template?.subject || inferSubjectFromName(task?.name || template?.name))
}

function normalizeSubject(subject) {
  return SUBJECTS.includes(subject) ? subject : DEFAULT_SUBJECT
}

function inferSubjectFromName(name = '') {
  if (name.includes('数学') || name.includes('计算')) return '数学'
  if (name.includes('英语') || name.includes('单词') || name.includes('vocab')) return '英语'
  if (name.includes('语文') || name.includes('汉字') || name.includes('听写') || name.includes('阅读')) return '语文'
  return DEFAULT_SUBJECT
}

function toggleTemplatePicker(periodKey) {
  pickerOpenByPeriod[periodKey] = !pickerOpenByPeriod[periodKey]
}

function closeTemplatePickers() {
  for (const period of PERIODS) {
    pickerOpenByPeriod[period.key] = false
  }
}

async function toggleTemplate(periodKey, template) {
  const tasks = plan.periods[periodKey].tasks
  const existingIndex = tasks.findIndex(task => task.templateId === template.id)
  if (existingIndex >= 0) {
    const existing = tasks[existingIndex]
    if (existing.runningStart) {
      showToast('请先结束该任务')
      return
    }
    tasks.splice(existingIndex, 1)
    await persistPlan()
    return
  }

  tasks.push({
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    templateId: template.id,
    name: template.name,
    subject: templateSubject(template),
    createdAt: Date.now(),
    sessions: [],
    runningStart: null
  })
  await persistPlan()
}

async function startTask(periodKey, task) {
  await enforceAutoStopTasks()
  if (activeTask.value) {
    showToast('请先结束当前任务')
    return
  }
  const now = Date.now()
  const period = plan.periods[periodKey]
  if (!period.startedAt) period.startedAt = now
  period.endedAt = null
  task.runningStart = now
  await persistPlan()
}

async function stopTask(periodKey, task) {
  if (!task.runningStart) return
  const now = Date.now()
  const end = Math.min(now, task.runningStart + MAX_TASK_MS)
  task.sessions.push({ start: task.runningStart, end })
  task.runningStart = null
  const period = plan.periods[periodKey]
  if (!period.tasks.some(t => t.runningStart)) {
    period.endedAt = end
  }
  if (now - end > 0) showToast('超过 1 小时，已按 1 小时结束计时')
  await persistPlan()
}

async function enforceAutoStopTasks() {
  if (autoStopSaving) return
  const now = Date.now()
  let changed = false
  for (const periodInfo of PERIODS) {
    const period = plan.periods[periodInfo.key]
    for (const task of period.tasks) {
      if (!task.runningStart || now - task.runningStart < MAX_TASK_MS) continue
      const end = task.runningStart + MAX_TASK_MS
      task.sessions.push({ start: task.runningStart, end })
      task.runningStart = null
      changed = true
      if (!period.tasks.some(t => t.runningStart)) {
        period.endedAt = end
      }
    }
  }
  if (!changed) return
  autoStopSaving = true
  try {
    await persistPlan()
    showToast('任务已超过 1 小时，系统已自动结束')
  } finally {
    autoStopSaving = false
  }
}

function periodStudyMs(periodKey) {
  tick.value
  return periodStudyMsFromPeriod(plan.periods[periodKey], true)
}

function periodRestMs(periodKey) {
  tick.value
  return periodOtherMsFromPeriod(plan.periods[periodKey], true)
}

function periodStudyMsFromPeriod(period, includeRunning = true) {
  return (period?.tasks || []).reduce((sum, task) => sum + taskDurationMs(task, includeRunning), 0)
}

function periodOtherMsFromPeriod(period, includeRunning = true) {
  if (!period.startedAt) return 0
  const end = period.endedAt || ((period.tasks || []).some(t => t.runningStart) && includeRunning ? Date.now() : period.startedAt)
  return Math.max(0, end - period.startedAt - periodStudyMsFromPeriod(period, includeRunning))
}

function taskDurationMs(task, includeRunning = true) {
  tick.value
  const finished = (task.sessions || []).reduce((sum, session) => {
    if (!session.start || !session.end) return sum
    return sum + Math.min(MAX_TASK_MS, Math.max(0, session.end - session.start))
  }, 0)
  if (includeRunning && task.runningStart) {
    return finished + Math.min(MAX_TASK_MS, Math.max(0, Date.now() - task.runningStart))
  }
  return finished
}

function getPlanForDate(date) {
  if (date === selectedDate.value) return plan
  const found = allPlans.value.find(dayPlan => dayPlan.date === date)
  return normalizePlan(found || { date, periods: emptyPeriods(), createdAt: Date.now(), updatedAt: Date.now() })
}

function withBarWidths(rows) {
  const max = Math.max(...rows.map(row => row.ms), 1)
  return rows.map(row => ({
    ...row,
    width: Math.max(row.ms > 0 ? 8 : 0, Math.round((row.ms / max) * 100))
  }))
}

function sessionCount(task) {
  return (task.sessions || []).length + (task.runningStart ? 1 : 0)
}

function taskStatus(task) {
  if (task.runningStart) return '进行中'
  if (sessionCount(task) > 0) return '已结束'
  return '未开始'
}

function periodTimeLabel(periodKey) {
  const period = plan.periods[periodKey]
  if (!period.startedAt) return '未开始'
  const start = formatClock(period.startedAt)
  const end = period.endedAt ? formatClock(period.endedAt) : '进行中'
  return `${start} - ${end}`
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}时${String(minutes).padStart(2, '0')}分`
  return `${minutes}分${String(seconds).padStart(2, '0')}秒`
}

function formatShortDuration(ms) {
  const minutes = Math.round(ms / 60000)
  if (minutes < 60) return `${minutes}分`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours}时${rest}分` : `${hours}时`
}

function formatClock(ts) {
  const date = new Date(ts)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function currentPeriodKey() {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}

function emptyPeriods() {
  return {
    morning: createEmptyPeriodState(),
    afternoon: createEmptyPeriodState(),
    evening: createEmptyPeriodState()
  }
}

function createEmptyPeriodState() {
  return { startedAt: null, endedAt: null, tasks: [] }
}

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = ''; toastTimer = null }, 1800)
}
</script>

<style scoped>
.planner-page {
  max-width: 900px;
  margin: 0 auto;
}
.planner-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}
.planner-head .page-title {
  padding-bottom: 2px;
}
.date-input,
.stats-date-input,
.template-form select,
.template-form input,
.chart-toolbar select {
  border: 1px solid #D1D1D6;
  border-radius: 10px;
  background: #fff;
  color: var(--text-primary);
  padding: 10px 12px;
  font-size: 1rem;
  outline: none;
}
.date-input {
  flex-shrink: 0;
}
.section-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
}
.template-form {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 10px;
}
.template-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.template-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 7px 10px 7px 12px;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 0.84rem;
  font-weight: 700;
}
.template-chip small {
  border-radius: 999px;
  background: rgba(0, 122, 255, 0.12);
  padding: 2px 7px;
  font-size: 0.68rem;
}
.template-chip button {
  border: 0;
  border-radius: 999px;
  width: 20px;
  height: 20px;
  background: rgba(0, 122, 255, 0.12);
  color: var(--primary);
  cursor: pointer;
}
.day-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.summary-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 14px 16px;
  box-shadow: var(--shadow);
}
.summary-card span {
  display: block;
  color: var(--text-secondary);
  font-size: 0.78rem;
  margin-bottom: 4px;
}
.summary-card strong {
  font-size: 1.1rem;
}
.period-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.period-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}
.period-header h3 {
  font-size: 1.08rem;
  margin-bottom: 2px;
}
.period-header p {
  font-size: 0.78rem;
  color: var(--text-secondary);
}
.period-tools {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.period-stats {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.period-stats span {
  border-radius: 999px;
  background: var(--bg);
  padding: 5px 10px;
  color: var(--text-secondary);
  font-size: 0.76rem;
  font-weight: 700;
}
.add-task-btn {
  border: 1px solid rgba(0, 122, 255, 0.22);
  border-radius: 999px;
  background: var(--primary-light);
  color: var(--primary);
  padding: 6px 11px;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
}
.template-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-radius: 12px;
  background: var(--bg);
}
.picker-group {
  display: grid;
  gap: 7px;
}
.picker-subject {
  color: var(--text-secondary);
  font-size: 0.74rem;
  font-weight: 800;
}
.picker-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pick-chip {
  border: 1px solid #D1D1D6;
  border-radius: 999px;
  background: #fff;
  color: var(--text-primary);
  padding: 9px 13px;
  font-size: 0.86rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.pick-chip.selected {
  border-color: var(--primary);
  background: var(--primary);
  color: #fff;
}
.pick-chip:active {
  transform: scale(0.97);
}
.empty-picker {
  color: var(--text-secondary);
  font-size: 0.84rem;
  padding: 4px 2px;
}
.empty-period {
  padding: 18px 4px;
  color: var(--text-secondary);
  font-size: 0.86rem;
  text-align: center;
}
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: 12px;
  overflow: hidden;
  background: #EFEFF4;
}
.task-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 12px;
}
.task-row.running {
  background: #F2FAF6;
}
.task-name {
  font-weight: 700;
  font-size: 0.95rem;
}
.task-meta {
  margin-top: 2px;
  color: var(--text-secondary);
  font-size: 0.76rem;
}
.task-time {
  min-width: 74px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  color: var(--text-primary);
}
.task-actions {
  display: flex;
  gap: 6px;
}
.mini-btn {
  border: 0;
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
}
.mini-btn:disabled {
  opacity: 0.36;
  cursor: not-allowed;
}
.mini-btn.start {
  background: var(--primary);
  color: #fff;
}
.mini-btn.stop {
  background: #FEF0F0;
  color: var(--danger);
}
.chart-toolbar {
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 10px;
  margin-bottom: 12px;
}
.stats-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.stats-summary span {
  border-radius: 999px;
  background: var(--bg);
  color: var(--text-secondary);
  font-size: 0.76rem;
  font-weight: 800;
  padding: 5px 10px;
}
.stats-block {
  display: grid;
  gap: 8px;
  padding-top: 12px;
}
.stats-block + .stats-block {
  margin-top: 6px;
  border-top: 1px solid #EFEFF4;
}
.stats-block-title {
  font-size: 0.86rem;
  font-weight: 800;
}
.duration-chart {
  display: grid;
  gap: 9px;
}
.duration-row {
  display: grid;
  grid-template-columns: minmax(76px, 1fr) 2fr 58px;
  gap: 9px;
  align-items: center;
}
.duration-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 700;
}
.duration-track {
  height: 12px;
  border-radius: 999px;
  background: #E8E8ED;
  overflow: hidden;
}
.duration-fill {
  height: 100%;
  min-width: 0;
  border-radius: 999px;
}
.task-fill {
  background: linear-gradient(90deg, #007AFF, #5AC8FA);
}
.subject-fill {
  background: linear-gradient(90deg, #34C759, #30D158);
}
.other-fill {
  background: linear-gradient(90deg, #FF9500, #FFD60A);
}
.duration-value {
  color: var(--text-secondary);
  font-size: 0.74rem;
  font-weight: 800;
  text-align: right;
  white-space: nowrap;
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
  font-weight: 700;
  background: #333;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

@media (max-width: 640px) {
  .planner-head,
  .period-header {
    flex-direction: column;
    align-items: stretch;
  }
  .period-tools,
  .period-stats {
    justify-content: flex-start;
  }
  .day-summary {
    grid-template-columns: 1fr;
  }
  .template-form,
  .task-row {
    grid-template-columns: 1fr;
  }
  .chart-toolbar,
  .duration-row {
    grid-template-columns: 1fr;
  }
  .duration-value {
    text-align: left;
  }
  .task-time {
    text-align: left;
  }
  .task-actions {
    justify-content: stretch;
  }
  .task-actions button {
    flex: 1;
  }
}
</style>
