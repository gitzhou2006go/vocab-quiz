import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import ErrorBook from './views/ErrorBook.vue'
import Rounds from './views/Rounds.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/quiz/:id?', component: Quiz },
  { path: '/errors', component: ErrorBook },
  { path: '/rounds', component: Rounds }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
