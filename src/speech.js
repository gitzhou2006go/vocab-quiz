function getVoices() {
  if (!('speechSynthesis' in window) || !window.speechSynthesis) return Promise.resolve([])
  const current = window.speechSynthesis.getVoices()
  if (current.length > 0) return Promise.resolve(current)

  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(window.speechSynthesis.getVoices()), 500)
    window.speechSynthesis.onvoiceschanged = () => {
      clearTimeout(timer)
      resolve(window.speechSynthesis.getVoices())
    }
  })
}

function pickVoice(voices, lang) {
  const normalizedLang = lang.toLowerCase()
  const sameLang = voices.filter(v => (v.lang || '').toLowerCase().startsWith(normalizedLang))
  const candidates = sameLang.length > 0 ? sameLang : voices.filter(v => (v.lang || '').toLowerCase().startsWith(normalizedLang.slice(0, 2)))
  if (candidates.length === 0) return null

  const preferred = [
    'aria', 'jenny', 'guy', 'natural', 'google us english', 'microsoft',
    'xiaoxiao', 'xiaoyi', 'yunxi', 'google 普通话', 'ting-ting', 'sin-ji'
  ]
  return candidates.find(v => preferred.some(k => v.name.toLowerCase().includes(k))) || candidates[0]
}

export async function speakText(text, { lang = 'en-US', rate = 0.9, pitch = 1.0 } = {}) {
  if (!text) return false

  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel()
      const voices = await getVoices()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = rate
      utterance.pitch = pitch
      const voice = pickVoice(voices, lang)
      if (voice) utterance.voice = voice
      window.speechSynthesis.speak(utterance)
      return true
    } catch (_) {}
  }

  if (lang.startsWith('en')) {
    try {
      const url = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(text) + '&type=2'
      const audio = new Audio(url)
      await audio.play()
      return true
    } catch (_) {}
  }
  return false
}
