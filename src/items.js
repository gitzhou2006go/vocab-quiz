import { DICTIONARIES, WORD_MAP } from './vocab.js'
import { DICTATION_COURSE_MAP, DICTATION_ITEM_MAP } from './dictation.js'

export function getStudyItem(itemId) {
  const word = WORD_MAP[itemId]
  if (word) {
    return {
      id: itemId,
      type: word.title ? 'poem' : 'word',
      title: word.en || word.title || '未知',
      subtitle: word.zh || word.author || '',
      speakText: word.en || word.title || '',
      speakLang: word.en ? 'en-US' : 'zh-CN'
    }
  }

  const dictation = DICTATION_ITEM_MAP[itemId]
  if (dictation) {
    return {
      id: itemId,
      type: 'dictation',
      title: dictation.text,
      subtitle: dictation.pinyin,
      speakText: dictation.text,
      speakLang: 'zh-CN',
      meta: `${dictation.courseName} · ${dictation.lessonName}`
    }
  }

  return {
    id: itemId,
    type: 'unknown',
    title: '未知',
    subtitle: '',
    speakText: '',
    speakLang: 'zh-CN'
  }
}

export function getSourceName(roundOrDictId) {
  const dictId = typeof roundOrDictId === 'object' ? roundOrDictId?.dictId : roundOrDictId
  if (dictId === 'dictation') {
    const courseId = typeof roundOrDictId === 'object' ? roundOrDictId?.courseId : null
    return courseId && DICTATION_COURSE_MAP[courseId] ? DICTATION_COURSE_MAP[courseId].name : '汉字听写'
  }
  const d = DICTIONARIES.find(x => x.id === dictId)
  return d ? d.name : '未知词库'
}

