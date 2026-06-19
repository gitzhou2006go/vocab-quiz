<template>
  <div id="app">
    <router-view />
    <nav class="bottom-nav" v-if="showNav">
      <router-link to="/" class="nav-item" exact>
        <span class="nav-icon">🏠</span>
        <span class="nav-label">首页</span>
      </router-link>
      <router-link to="/quiz" class="nav-item">
        <span class="nav-icon">📝</span>
        <span class="nav-label">考核</span>
      </router-link>
      <router-link to="/errors" class="nav-item">
        <span class="nav-icon">📕</span>
        <span class="nav-label">错题本</span>
      </router-link>
      <router-link to="/rounds" class="nav-item">
        <span class="nav-icon">📊</span>
        <span class="nav-label">轮次</span>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: flex;
  background: white;
  border-top: 1px solid #e0e0e0;
  z-index: 100;
}

.nav-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  text-decoration: none;
  color: #666;
  font-size: 12px;
}

.nav-item.router-link-active {
  color: #4CAF50;
}

.nav-icon {
  display: block;
  font-size: 20px;
  margin-bottom: 2px;
}

.nav-label {
  display: block;
}
</style>
