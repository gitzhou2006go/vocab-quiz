<template>
  <div class="app-shell">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showNav = computed(() => !route.path.startsWith('/quiz'))
</script>

<style>
/* ===== iOS Design System ===== */
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
  --radius: 12px;
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
}

#app {
  min-height: 100vh;
  padding-bottom: 82px;
  max-width: 480px;
  margin: 0 auto;
}

/* iPad / 大屏适配 */
@media (min-width: 640px) {
  #app {
    max-width: 85vw;
    padding: 0 24px 82px;
  }
  .page { padding: 24px; }
  h2.page-title { font-size: 1.8rem; }
}

@media (min-width: 900px) {
  #app { max-width: 780px; }
}

/* ===== Tab Bar (iOS style) ===== */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: flex;
  background: rgba(255,255,255,0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 0.5px solid rgba(0,0,0,0.1);
  z-index: 100;
  padding-bottom: var(--safe-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0 4px;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.tab-icon { font-size: 1.4rem; line-height: 1.4; }
.tab-label { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.01em; }

.tab-active { color: var(--primary); }
.tab-active .tab-icon { transform: scale(1.05); }

/* ===== Shared Components ===== */
.page { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

h2.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  padding: 8px 0 4px;
}

.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 16px;
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
  gap: 6px;
  padding: 12px 20px;
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font);
  font-size: 0.9rem;
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
  font-size: 0.68rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: var(--radius-pill);
  background: var(--primary-light);
  color: var(--primary);
}

.success-tag {
  background: #E8F8E8;
  color: var(--success);
}

.progress-bar-bg {
  height: 6px;
  background: #E8E8ED;
  border-radius: 6px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #5AC8FA);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.empty-state {
  text-align: center;
  padding: 48px 20px;
  color: var(--text-secondary);
}
.empty-state .empty-icon { font-size: 3rem; margin-bottom: 12px; }
.empty-state p { font-size: 0.9rem; margin-bottom: 16px; }

.text-muted { color: var(--text-muted); font-size: 0.78rem; }
.text-secondary { color: var(--text-secondary); }
</style>

<style scoped>
.app-shell { min-height: 100vh; }
</style>
