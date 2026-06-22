<template>
  <div class="app-shell">
    <!-- 新版本更新提示横幅 -->
    <div v-if="updateAvailable" class="update-banner" @click="applyUpdate">
      <span class="update-icon">🔄</span>
      <span class="update-text">新版本可用，点击更新</span>
      <span class="update-btn">更新</span>
    </div>
    <router-view />
    <nav v-if="showNav" class="tab-bar">
      <router-link to="/" class="tab-item" exact-active-class="tab-active">
        <span class="tab-icon">🏠</span>
        <span class="tab-label">首页</span>
      </router-link>
      <router-link to="/quiz" class="tab-item" exact-active-class="tab-active">
        <span class="tab-icon">📝</span>
        <span class="tab-label">考核</span>
      </router-link>
      <router-link to="/errors" class="tab-item" exact-active-class="tab-active">
        <span class="tab-icon">📕</span>
        <span class="tab-label">错题本</span>
      </router-link>
      <router-link to="/rounds" class="tab-item" exact-active-class="tab-active">
        <span class="tab-icon">📊</span>
        <span class="tab-label">轮次</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showNav = computed(() => !route.path.startsWith('/quiz'))

// ===== Service Worker 更新检测 =====
const updateAvailable = ref(false)
let swRegistration = null

// 从 localStorage 恢复待更新标记，保证下次打开横幅还在
const pendingFlag = 'sw_pending_update'
if (localStorage.getItem(pendingFlag)) {
  updateAvailable.value = true
}

onMounted(async () => {
  if (!('serviceWorker' in navigator)) return

  try {
    swRegistration = await navigator.serviceWorker.register('sw.js')

    // 如果已有等待中的 SW（之前未点击更新）
    if (swRegistration.waiting) {
      updateAvailable.value = true
      localStorage.setItem(pendingFlag, '1')
    }

    // 监听新 SW 安装
    swRegistration.addEventListener('updatefound', () => {
      const newSW = swRegistration.installing
      if (!newSW) return
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed') {
          updateAvailable.value = true
          localStorage.setItem(pendingFlag, '1')
        }
      })
    })
  } catch (e) {
    console.log('SW registration failed', e)
  }
})

function applyUpdate() {
  if (swRegistration && swRegistration.waiting) {
    // 先注册 controllerchange，等 SW 接管后刷新
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      localStorage.removeItem(pendingFlag)
      window.location.reload()
    })
    swRegistration.waiting.postMessage('SKIP_WAITING')
  } else {
    // 没有 waiting SW 但 localStorage 有标记 → 清理标记
    localStorage.removeItem(pendingFlag)
    window.location.reload()
  }
}
</script>

<style>
/* ===== iPad Design System ===== */
:root {
  --primary: #007AFF;
  --primary-light: #E8F0FE;
  --success: #34C759;
  --danger: #FF3B30;
  --warning: #FF9500;
  --bg: #F2F2F7;
  --card-bg: #FFFFFF;
  --text-primary: #1C1C1E;
  --text-secondary: #8E8E93;
  --text-muted: #C7C7CC;
  --radius: 14px;
  --radius-pill: 999px;
  --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-lg: 0 4px 12px rgba(0,0,0,0.1);
  --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
}

#app {
  min-height: 100vh;
  padding-bottom: 90px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

/* ===== Tab Bar ===== */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 100%;
  display: flex;
  background: rgba(255,255,255,0.94);
  backdrop-filter: blur(12px);
  border-top: 0.5px solid rgba(0,0,0,0.1);
  z-index: 100;
  padding-bottom: var(--safe-bottom);
  border-radius: 16px 16px 0 0;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 8px;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.tab-icon { font-size: 1.6rem; line-height: 1.4; }
.tab-label { font-size: 0.75rem; font-weight: 500; margin-top: 2px; }
.tab-active { color: var(--primary); }

/* ===== Shared Components ===== */
.page { padding: 28px 8px; display: flex; flex-direction: column; gap: 16px; }

h2.page-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  padding: 14px 0 6px;
}

.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
}

.card-group {
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: var(--radius);
  overflow: hidden;
}
.card-group > .card {
  border-radius: 0;
  box-shadow: none;
  border-bottom: 0.5px solid rgba(0,0,0,0.05);
}
.card-group > .card:first-child { border-radius: var(--radius) var(--radius) 0 0; }
.card-group > .card:last-child { border-radius: 0 0 var(--radius) var(--radius); border-bottom: none; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.btn:active { transform: scale(0.97); opacity: 0.85; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.btn-primary { background: var(--primary); color: white; }
.btn-secondary { background: var(--bg); color: var(--primary); }
.btn-danger { background: var(--danger); color: white; }
.btn-block { width: 100%; }

.pill-tag {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: var(--radius-pill);
  background: var(--primary-light);
  color: var(--primary);
}

.progress-bar-bg {
  height: 8px;
  background: #E8E8ED;
  border-radius: 8px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #5AC8FA);
  border-radius: 8px;
  transition: width 0.3s ease;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}
.empty-state .empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
.empty-state p { font-size: 1rem; margin-bottom: 20px; }

.text-muted { color: var(--text-muted); font-size: 0.82rem; }
.text-secondary { color: var(--text-secondary); }
</style>

<style scoped>
.app-shell { min-height: 100vh; }

/* ===== 更新横幅 ===== */
.update-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  background: linear-gradient(135deg, var(--primary), #5AC8FA);
  color: white;
  cursor: pointer;
  animation: bannerSlideDown 0.35s ease;
  -webkit-tap-highlight-color: transparent;
}
.update-banner:active { opacity: 0.85; }
.update-icon { font-size: 1.2rem; flex-shrink: 0; }
.update-text { flex: 1; font-size: 0.88rem; font-weight: 500; }
.update-btn {
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(255,255,255,0.25);
  font-size: 0.82rem;
  font-weight: 600;
  flex-shrink: 0;
}
@keyframes bannerSlideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
