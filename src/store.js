import { reactive } from 'vue'
import { getAll } from './db.js'

export const store = reactive({
  activeRounds: [],
  currentWord: null,
  rounds: [],
  errors: [],
  dictionaries: []
})

export async function loadActiveRound() {
  const rounds = await getAll('rounds')
  store.rounds = rounds
  store.activeRounds = rounds.filter(r => r.status === 'active')
}
