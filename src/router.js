import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import ErrorBook from './views/ErrorBook.vue'
import Stats from './views/Stats.vue'
import Rounds from './views/Rounds.vue'
import Dictation from './views/Dictation.vue'
import Planner from './views/Planner.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/quiz/:id?', component: Quiz },
  { path: '/errors', component: ErrorBook },
  { path: '/stats', component: Stats },
  { path: '/rounds', component: Rounds },
  { path: '/dictation', component: Dictation },
  { path: '/planner', component: Planner }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
