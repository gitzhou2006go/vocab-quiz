<template>
  <div class="page home">
    <h2 class="page-title">单词考核</h2>
    <p class="text-secondary" style="margin-top:-8px;font-size:0.85rem">
      一轮一轮的词典考核，错题自动积累巩固
    </p>

    <!-- 进行中的轮次 -->
    <div v-if="store.activeRounds.length > 0" class="card-group" style="margin-top:-4px">
      <div v-for="r in store.activeRounds" :key="r.id" class="card" style="display:flex;align-items:flex-start;gap:8px;cursor:pointer" @click="goToQuiz(r)">
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <span class="pill-tag" style="background:#E8F8E8;color:#34C759">进行中</span>
            <span style="font-weight:600;flex:1;font-size:0.88rem">{{ r.name }}</span>
            <span class="pill-tag">{{ getDictName(r.dictId) }}</span>
          </div>
          <div class="progress-bar-bg" style="margin-bottom:6px">
            <div class="progress-bar-fill" :style="{ width: roundPercent(r) + '%' }"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-secondary)">
            <span>已完成 <strong>{{ roundCompleted(r) }}</strong> / {{ r.totalWords }}</span>
            <span>{{ roundPercent(r) }}%</span>
          </div>
          <div style="text-align:right;margin-top:6px;font-size:0.78rem;color:var(--primary);font-weight:500">
            继续 →
          </div>
        </div>
        <button class="del-btn" @click.stop="confirmDelete(r)" title="删除此轮">🗑</button>
      </div>
    </div>

    <!-- 选择词库 -->
    <div style="margin-top:4px">
      <h3 style="font-size:1rem;font-weight:600;margin-bottom:10px;padding:0 2px">词库</h3>
      <div class="card-group">
        <div
          v-for="dict in DICTIONARIES"
          :key="dict.id"
          class="card dict-row"
          :class="{ 'dict-selected': selectedDict === dict.id }"
          @click="selectedDict = dict.id"
        >
          <div style="flex:1;display:flex;align-items:center;gap:12px">
            <div class="dict-radio" :class="{ 'radio-on': selectedDict === dict.id }">
              <span v-if="selectedDict === dict.id" class="radio-dot"></span>
            </div>
            <div>
              <div style="font-weight:600;font-size:0.9rem">{{ dict.name }}</div>
              <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:1px">{{ dict.description }} · {{ dict.wordCount }} 词</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 开始考核按钮 -->
    <button class="btn btn-primary btn-block" style="margin-top:4px" @click="startNewRound">
      🎯 开始 {{ getDictName(selectedDict) }}
    </button>

    <!-- 快捷入口 -->
    <button class="btn btn-secondary btn-block planner-entry" @click="$router.push('/planner')">
      每日学习安排
    </button>

    <button class="btn btn-secondary btn-block dictation-entry" @click="$router.push('/dictation')">
      汉字拼音听写
    </button>

    <div style="display:flex;gap:10px;margin-top:4px">
      <button class="btn btn-secondary" style="flex:1" @click="$router.push('/errors')">
        📕 错题本
      </button>
      <button class="btn btn-secondary" style="flex:1" @click="$router.push('/rounds')">
        📊 轮次
      </button>
    </div>

    <!-- 高频错词 -->
    <div v-if="topErrors.length > 0" style="margin-top:4px">
      <h3 style="font-size:1rem;font-weight:600;margin-bottom:10px;padding:0 2px">高频错词 Top 5</h3>
      <div class="card-group">
        <div v-for="item in topErrors" :key="item.wordId" class="card" style="display:flex;align-items:center;gap:12px">
          <div style="flex:1">
            <div style="font-weight:600;font-size:0.88rem">{{ wordTitle(item.wordId) }}</div>
            <div style="font-size:0.78rem;color:var(--text-secondary)">{{ wordSubtitle(item.wordId) }}</div>
          </div>
          <span class="pill-tag" style="background:#FEF0F0;color:var(--danger)">{{ item.totalCount }} 次错</span>
        </div>
      </div>
    </div>

    <!-- 数据同步 -->
    <div class="card" style="margin-top:4px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:1rem">☁️</span>
        <span style="font-weight:600;font-size:0.88rem">数据同步</span>
        <span style="font-size:0.72rem;color:var(--text-muted)">自动</span>
      </div>
      <p style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px">
        Firebase 云端同步，多设备自动恢复进度
      </p>
    </div>

    <!-- Firebase 诊断 -->
    <details class="card" style="margin-top:2px;padding:10px 16px">
      <summary style="font-size:0.78rem;color:var(--text-muted);cursor:pointer;outline:none">
        🔧 诊断
      </summary>
      <div style="font-size:0.72rem;color:var(--text-muted);margin-top:6px;line-height:1.6">
        版本: <span id="app-version">{{ appVersion }}</span>
      </div>
      <button class="btn" style="background:var(--bg);color:var(--text-primary);font-size:0.82rem;padding:8px 16px;margin-top:8px;border-radius:8px" @click="testDB" :disabled="testingDB">
        {{ testingDB ? '测试中...' : '测试 Firebase 连接' }}
      </button>
      <button class="btn" style="background:#FEF0F0;color:var(--danger);font-size:0.82rem;padding:8px 16px;margin-top:6px;border-radius:8px;width:100%" @click="forceRefresh">
        🔄 强制刷新（清除缓存更新到最新，数据不丢失）
      </button>
      <p v-if="refreshMsg" style="font-size:0.8rem;margin-top:6px;padding:6px 12px;border-radius:8px;text-align:center;background:#E8F8E8;color:var(--success)">
        {{ refreshMsg }}
      </p>
      <p v-if="dbTestResult" style="font-size:0.8rem;margin-top:8px;padding:8px 12px;border-radius:8px;text-align:center" :style="{ background: dbTestResult.ok ? '#E8F8E8' : '#FEF0F0', color: dbTestResult.ok ? '#34C759' : '#FF3B30' }">
        {{ dbTestResult.msg }}
      </p>
    </details>

    <!-- 数据备份 -->
    <details class="card" style="margin-top:2px;padding:10px 16px">
      <summary style="font-size:0.78rem;color:var(--text-muted);cursor:pointer;outline:none">
        💾 数据备份
      </summary>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
        <button class="btn" style="background:var(--bg);color:var(--text-primary);font-size:0.82rem;padding:8px 16px;border-radius:8px" @click="exportData">
          📥 导出数据（下载 JSON 文件）
        </button>
        <button class="btn" style="background:var(--bg);color:var(--text-primary);font-size:0.82rem;padding:8px 16px;border-radius:8px" @click="document.getElementById('importFileInput').click()">
          📤 导入数据（从 JSON 文件恢复）
        </button>
        <input id="importFileInput" type="file" accept=".json" style="display:none" @change="importData" />
        <div style="border-top:0.5px solid rgba(0,0,0,.05);margin:4px 0"></div>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:4px">GitHub 备份（需要 Personal Access Token）</div>
        <input
          type="password"
          v-model="githubToken"
          placeholder="输入 GitHub Token"
          style="width:100%;padding:8px 10px;border:0.5px solid #C7C7CC;border-radius:8px;font-size:0.82rem;outline:none"
        />
        <div style="display:flex;gap:6px">
          <button class="btn" style="flex:1;background:var(--bg);color:var(--text-primary);font-size:0.82rem;padding:8px;border-radius:8px" @click="uploadToGithub" :disabled="githubBusy">
            {{ githubBusy ? '上传中...' : '☁️ 上传到 GitHub' }}
          </button>
          <button class="btn" style="flex:1;background:var(--bg);color:var(--text-primary);font-size:0.82rem;padding:8px;border-radius:8px" @click="downloadFromGithub" :disabled="githubBusy">
            {{ githubBusy ? '下载中...' : '☁️ 从 GitHub 下载' }}
          </button>
        </div>
      </div>
      <p v-if="githubMsg" style="font-size:0.8rem;margin-top:6px;padding:6px 12px;border-radius:8px;text-align:center" :style="{ background: githubOk ? '#E8F8E8' : '#FEF0F0', color: githubOk ? 'var(--success)' : 'var(--danger)' }">
        {{ githubMsg }}
      </p>
    </details>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store, loadActiveRound } from '../store.js'
import { createRound, getAggregatedErrors, getAllRounds, deleteItem, getAllData, replaceAllData } from '../db.js'
import { downloadAll, testPing } from '../fb.js'
import { DICTIONARIES, WORD_MAP, getDictWords } from '../vocab.js'

const router = useRouter()
const errorStats = ref([])
const selectedDict = ref('core')
const testingDB = ref(false)
const dbTestResult = ref(null)
const refreshMsg = ref('')
const appVersion = ref('...')
const githubToken = ref(localStorage.getItem('gh_backup_token') || '')
const githubMsg = ref('')
const githubOk = ref(false)
const githubBusy = ref(false)

// 从 version.json 获取版本号（比 DOM 查询更可靠）
fetch('/vocab-quiz/version.json?t=' + Date.now())
  .then(r => r.json())
  .then(d => { appVersion.value = d.version ? d.version.slice(0, 8) : '?' })
  .catch(() => { appVersion.value = '?' })

onMounted(async () => {
  await loadActiveRound()
  errorStats.value = await getAggregatedErrors()
  if (store.activeRounds.length > 0 && store.activeRounds[0].dictId) {
    selectedDict.value = store.activeRounds[0].dictId
  }
})

function roundCompleted(r) {
  return r.totalWords - (r.pendingWordIds?.length || 0)
}

function roundPercent(r) {
  if (!r.totalWords) return 0
  return Math.round((roundCompleted(r) / r.totalWords) * 100)
}

const topErrors = computed(() => {
  return [...errorStats.value]
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 5)
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

function goToQuiz(round) {
  if (round) {
    router.push(`/quiz/${round.id}`)
  }
}

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function timeoutPromise(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时（10秒）')), ms))
}

async function testDB() {
  testingDB.value = true
  dbTestResult.value = null
  try {
    const result = await Promise.race([downloadAll(), timeoutPromise(10000)])
    if (result === false) {
      dbTestResult.value = { ok: false, msg: '❌ 连接失败：无法访问 Firebase' }
      return
    }
    const pingOk = await Promise.race([testPing(), timeoutPromise(10000)])
    if (pingOk) {
      const roundCount = result?.rounds?.length || 0
      const errCount = result?.errors?.length || 0
      dbTestResult.value = {
        ok: true,
        msg: `✅ Firebase 正常（云端 ${roundCount} 轮 · ${errCount} 条错题）`
      }
    } else {
      dbTestResult.value = { ok: false, msg: '⚠️ 读取正常，但写入失败' }
    }
  } catch (e) {
    dbTestResult.value = { ok: false, msg: `❌ ${e.message}` }
  } finally {
    testingDB.value = false
  }
}

async function forceRefresh() {
  refreshMsg.value = '正在清除缓存...'
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration()
    if (reg) await reg.unregister()
  }
  if ('caches' in window) {
    const names = await caches.keys()
    await Promise.all(names.map(n => caches.delete(n)))
  }
  refreshMsg.value = '✅ 缓存已清除，正在刷新...'
  setTimeout(() => window.location.reload(), 500)
}

// ===== 数据备份 =====

async function exportData() {
  try {
    const data = await getAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vocab-quiz-backup-${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    githubMsg.value = '✅ 数据已导出'
    githubOk.value = true
  } catch (e) {
    githubMsg.value = '❌ 导出失败: ' + e.message
    githubOk.value = false
  }
}

async function importData(e) {
  const file = e.target.files[0]
  if (!file) return
  try {
    const text = await file.text()
    const data = JSON.parse(text)
    if (!data.rounds || !data.errors) {
      throw new Error('无效的备份文件')
    }
    await replaceAllData(data)
    await loadActiveRound()
    errorStats.value = await getAggregatedErrors()
    githubMsg.value = `✅ 已恢复 ${data.rounds.length} 轮 · ${data.errors.length} 条错题`
    githubOk.value = true
  } catch (e) {
    githubMsg.value = '❌ 导入失败: ' + e.message
    githubOk.value = false
  }
  // 清空 input，允许重复导入同一文件
  e.target.value = ''
}

async function uploadToGithub() {
  const token = githubToken.value.trim()
  if (!token) {
    githubMsg.value = '❌ 请先输入 GitHub Token'
    githubOk.value = false
    return
  }
  localStorage.setItem('gh_backup_token', token)
  githubBusy.value = true
  githubMsg.value = ''
  try {
    const data = await getAllData()
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    const resp = await fetch('https://api.github.com/repos/gitzhou2006go/vocab-quiz/contents/backup/data.json', {
      method: 'PUT',
      headers: { Authorization: 'token ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'backup: vocab-quiz data ' + new Date().toISOString().slice(0, 10),
        content: content,
        branch: 'main'
      })
    })
    const result = await resp.json()
    if (resp.ok) {
      githubMsg.value = `✅ 已上传到 GitHub（${data.rounds.length} 轮 · ${data.errors.length} 条错题）`
      githubOk.value = true
    } else {
      githubMsg.value = '❌ 上传失败: ' + (result.message || resp.status)
      githubOk.value = false
    }
  } catch (e) {
    githubMsg.value = '❌ 上传失败: ' + e.message
    githubOk.value = false
  } finally {
    githubBusy.value = false
  }
}

async function downloadFromGithub() {
  githubBusy.value = true
  githubMsg.value = ''
  try {
    const resp = await fetch('https://raw.githubusercontent.com/gitzhou2006go/vocab-quiz/main/backup/data.json?t=' + Date.now())
    if (!resp.ok) throw new Error('没有找到备份文件 (HTTP ' + resp.status + ')')
    const data = await resp.json()
    if (!data.rounds || !data.errors) throw new Error('无效的备份文件')
    await replaceAllData(data)
    await loadActiveRound()
    errorStats.value = await getAggregatedErrors()
    githubMsg.value = `✅ 已从 GitHub 恢复（${data.rounds.length} 轮 · ${data.errors.length} 条错题）`
    githubOk.value = true
  } catch (e) {
    githubMsg.value = '❌ 下载失败: ' + e.message
    githubOk.value = false
  } finally {
    githubBusy.value = false
  }
}

async function startNewRound() {
  const dict = DICTIONARIES.find(d => d.id === selectedDict.value)
  if (!dict) return
  const words = getDictWords(dict.id)
  const wordIds = shuffleArray(words.map(w => w.id))
  if (wordIds.length === 0) return

  const allRounds = await getAllRounds()
  const roundNum = allRounds.filter(r => r.dictId === dict.id).length + 1

  const newRound = await createRound(`第${roundNum}轮`, wordIds, dict.id)
  router.push(`/quiz/${newRound.id}`)
}

async function confirmDelete(r) {
  if (!confirm(`确认删除「${r.name}」？`)) return
  try {
    await deleteItem('rounds', r.id)
    await loadActiveRound()
    errorStats.value = await getAggregatedErrors()
  } catch (e) {
    console.error('Delete failed', e)
  }
}
</script>

<style scoped>
.home { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.dict-row { cursor: pointer; transition: background 0.15s; -webkit-tap-highlight-color: transparent; }
.dict-row:active { background: rgba(0,122,255,0.03); }
.planner-entry { margin-top: 0; color: #6E4B00; background: #FFF4D6; }
.dictation-entry { margin-top: 0; color: #0A7A4B; background: #E8F8E8; }
.dict-radio { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #C7C7CC; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
.radio-on { border-color: var(--primary); background: var(--primary); }
.radio-dot { width: 8px; height: 8px; border-radius: 50%; background: white; }
.del-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  opacity: 0.4;
  transition: opacity 0.2s;
  flex-shrink: 0;
  margin-top: 2px;
  -webkit-tap-highlight-color: transparent;
}
.del-btn:hover, .del-btn:active { opacity: 1; background: #FEF0F0; }
</style>
