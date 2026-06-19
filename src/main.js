import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { initDB, replaceAllData } from './db.js'
import { listenRemote, downloadAll, cloudVersion } from './fb.js'
import { store, loadActiveRound } from './store.js'

const app = createApp(App)
app.use(router)

// 初始化数据库
initDB().then(async () => {
  console.log('DB initialized')

  // 先用本地数据渲染界面
  await loadActiveRound()

  // 尝试从云端拉取较新数据并落地
  try {
    const data = await downloadAll()
    if (data && data.version > 0 && Array.isArray(data.rounds)) {
      console.log('Downloaded data from cloud, version:', data.version)
      await replaceAllData(data.rounds, data.errors || [])
      await loadActiveRound()
    }
  } catch (err) {
    console.log('Cloud download failed, using local data', err)
  }

  // 监听远程数据变化 —— 真正落地到本地
  listenRemote(async (data) => {
    console.log('Remote data changed, version:', data.version)
    try {
      await replaceAllData(data.rounds || [], data.errors || [])
      await loadActiveRound()
    } catch (e) {
      console.error('Apply remote data failed', e)
    }
  })
})

app.mount('#app')
