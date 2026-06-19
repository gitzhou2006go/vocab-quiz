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
      <button class="btn" style="background:var(--bg);color:var(--text-primary);font-size:0.82rem;padding:8px 16px;margin-top:8px;border-radius:8px" @click="testDB" :disabled="testingDB">
        {{ testingDB ? '测试中...' : '测试 Firebase 连接' }}
      </button>
      <p v-if="dbTestResult" style="font-size:0.8rem;margin-top:8px;padding:8px 12px;border-radius:8px;text-align:center" :style="{ background: dbTestResult.ok ? '#E8F8E8' : '#FEF0F0', color: dbTestResult.ok ? '#34C759' : '#FF3B30' }">
        {{ dbTestResult.msg }}
      </p>
    </details>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store, loadActiveRound } from '../store.js'
import { createRound, getAggregatedErrors, getAllRounds, deleteItem } from '../db.js'
import { downloadAll, testPing } from '../fb.js'
import { DICTIONARIES, WORD_MAP, getDictWords } from '../vocab.js'

const router = useRouter()
const errorStats = ref([])
const selectedDict = ref('core')
const testingDB = ref(false)
const dbTestResult = ref(null)

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
