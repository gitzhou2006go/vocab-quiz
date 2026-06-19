import { reactive } from 'vue'
import { getAll } from './db.js'

export const store = reactive({
  activeRound: null,
  currentWord: null,
  rounds: [],
  errors: [],
  dictionaries: []
})

export async function loadActiveRound() {
  const rounds = await getAll('rounds')
  store.activeRound = rounds.find(r => r.status === 'active') || null
  store.rounds = rounds
  return store.activeRound
}
