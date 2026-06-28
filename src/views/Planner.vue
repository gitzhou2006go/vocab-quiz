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
        <input v-model.trim="newTemplateName" placeholder="添加模板，例如：数学计算" />
        <button class="btn btn-primary" type="submit" :disabled="!newTemplateName">添加</button>
      </form>
      <div class="template-list">
        <span v-for="template in activeTemplates" :key="template.id" class="template-chip">
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
        <div class="period-stats">
          <span>学习 {{ formatDuration(periodStudyMs(period.key)) }}</span>
          <span>休息 {{ formatDuration(periodRestMs(period.key)) }}</span>
        </div>
      </div>

      <div class="add-row">
        <select v-model="selectedTemplateByPeriod[period.key]">
          <option value="">选择模板</option>
          <option v-for="template in activeTemplates" :key="template.id" :value="template.id">
            {{ template.name }}
          </option>
        </select>
        <button class="btn btn-secondary" @click="addTask(period.key)" :disabled="!selectedTemplateByPeriod[period.key]">加入</button>
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
              {{ taskStatus(task) }} · {{ sessionCount(task) }} 次
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
      <div class="section-title">模板每日耗时</div>
      <div class="chart-toolbar">
        <select v-model="selectedChartTemplateId">
          <option v-for="template in templates" :key="template.id" :value="template.id">
            {{ template.name }}
          </option>
        </select>
      </div>
      <div v-if="chartBars.length === 0" class="empty-period">暂无数据</div>
      <div v-else class="bar-chart">
        <div v-for="bar in chartBars" :key="bar.date" class="bar-item">
          <div class="bar-track">
            <div class="bar-fill" :style="{ height: bar.height + '%' }"></div>
          </div>
          <span class="bar-value">{{ formatShortDuration(bar.ms) }}</span>
          <span class="bar-label">{{ bar.label }}</span>
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

const selectedDate = ref(todayKey())
const templates = ref([])
const allPlans = ref([])
const selectedChartTemplateId = ref('')
const newTemplateName = ref('')
const selectedTemplateByPeriod = reactive({ morning: '', afternoon: '', evening: '' })
const tick = ref(Date.now())
const toastMsg = ref('')
let timer = null
let toastTimer = null

const plan = reactive({
  date: selectedDate.value,
  periods: emptyPeriods(),
  createdAt: Date.now(),
  updatedAt: Date.now()
})

const activeTemplates = computed(() => templates.value.filter(t => !t.archived))

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

const chartBars = computed(() => {
  if (!selectedChartTemplateId.value) return []
  const rows = allPlans.value
    .slice()
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .slice(-14)
    .map(dayPlan => {
      const ms = PERIODS.reduce((sum, period) => {
        const tasks = dayPlan.periods?.[period.key]?.tasks || []
        return sum + tasks
          .filter(task => task.templateId === selectedChartTemplateId.value)
          .reduce((taskSum, task) => taskSum + taskDurationMs(task, false), 0)
      }, 0)
      return {
        date: dayPlan.date,
        label: dayPlan.date.slice(5),
        ms
      }
    })
    .filter(row => row.ms > 0)
  const max = Math.max(...rows.map(row => row.ms), 1)
  return rows.map(row => ({ ...row, height: Math.max(8, Math.round((row.ms / max) * 100)) }))
})

onMounted(async () => {
  await loadTemplates()
  await loadPlan()
  timer = setInterval(() => { tick.value = Date.now() }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

watch(selectedDate, loadPlan)

async function loadTemplates() {
  templates.value = await getTaskTemplates()
  if (!selectedChartTemplateId.value && templates.value.length > 0) {
    selectedChartTemplateId.value = templates.value[0].id
  }
}

async function loadPlan() {
  const data = await getDailyPlan(selectedDate.value)
  Object.assign(plan, normalizePlan(data))
  allPlans.value = await getDailyPlans()
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
        ...task
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
  const item = await saveTaskTemplate({ name })
  newTemplateName.value = ''
  await loadTemplates()
  selectedChartTemplateId.value = item.id
}

async function archiveTemplate(template) {
  await saveTaskTemplate({ ...template, archived: true })
  await loadTemplates()
}

async function addTask(periodKey) {
  const template = templates.value.find(t => t.id === selectedTemplateByPeriod[periodKey])
  if (!template) return
  plan.periods[periodKey].tasks.push({
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    templateId: template.id,
    name: template.name,
    createdAt: Date.now(),
    sessions: [],
    runningStart: null
  })
  selectedTemplateByPeriod[periodKey] = ''
  await persistPlan()
}

async function startTask(periodKey, task) {
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
  task.sessions.push({ start: task.runningStart, end: now })
  task.runningStart = null
  const period = plan.periods[periodKey]
  if (!period.tasks.some(t => t.runningStart)) {
    period.endedAt = now
  }
  await persistPlan()
}

function periodStudyMs(periodKey) {
  tick.value
  return plan.periods[periodKey].tasks.reduce((sum, task) => sum + taskDurationMs(task), 0)
}

function periodRestMs(periodKey) {
  tick.value
  const period = plan.periods[periodKey]
  if (!period.startedAt) return 0
  const end = period.endedAt || (period.tasks.some(t => t.runningStart) ? Date.now() : period.startedAt)
  return Math.max(0, end - period.startedAt - periodStudyMs(periodKey))
}

function taskDurationMs(task, includeRunning = true) {
  tick.value
  const finished = (task.sessions || []).reduce((sum, session) => {
    if (!session.start || !session.end) return sum
    return sum + Math.max(0, session.end - session.start)
  }, 0)
  if (includeRunning && task.runningStart) {
    return finished + Math.max(0, Date.now() - task.runningStart)
  }
  return finished
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

function emptyPeriods() {
  return {
    morning: { startedAt: null, endedAt: null, tasks: [] },
    afternoon: { startedAt: null, endedAt: null, tasks: [] },
    evening: { startedAt: null, endedAt: null, tasks: [] }
  }
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
.template-form input,
.add-row select,
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
  grid-template-columns: 1fr auto;
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
.add-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
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
  margin-bottom: 12px;
}
.bar-chart {
  display: flex;
  align-items: end;
  gap: 8px;
  min-height: 180px;
  padding-top: 10px;
  overflow-x: auto;
}
.bar-item {
  min-width: 42px;
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-items: center;
  gap: 5px;
  height: 180px;
}
.bar-track {
  width: 24px;
  height: 120px;
  border-radius: 8px;
  background: #E8E8ED;
  display: flex;
  align-items: end;
  overflow: hidden;
}
.bar-fill {
  width: 100%;
  min-height: 4px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, #34C759, #007AFF);
}
.bar-value,
.bar-label {
  font-size: 0.68rem;
  color: var(--text-secondary);
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
  .day-summary {
    grid-template-columns: 1fr;
  }
  .template-form,
  .add-row,
  .task-row {
    grid-template-columns: 1fr;
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
