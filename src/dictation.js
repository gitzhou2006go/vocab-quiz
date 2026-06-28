export const DICTATION_COURSES = [
  {
    id: 'hanzi_g1',
    name: '汉字拼音听写',
    description: '按课听写汉字、词语和拼音',
    lessons: [
      {
        id: 'hanzi_g1_l1',
        name: '第一课',
        items: [
          { id: 'hanzi_g1_l1_001', text: '天地', pinyin: 'tian di' },
          { id: 'hanzi_g1_l1_002', text: '人你我', pinyin: 'ren ni wo' },
          { id: 'hanzi_g1_l1_003', text: '日月', pinyin: 'ri yue' },
          { id: 'hanzi_g1_l1_004', text: '水火', pinyin: 'shui huo' },
          { id: 'hanzi_g1_l1_005', text: '山石田土', pinyin: 'shan shi tian tu' },
          { id: 'hanzi_g1_l1_006', text: '口耳目', pinyin: 'kou er mu' },
          { id: 'hanzi_g1_l1_007', text: '手足', pinyin: 'shou zu' },
          { id: 'hanzi_g1_l1_008', text: '上中下', pinyin: 'shang zhong xia' }
        ]
      },
      {
        id: 'hanzi_g1_l2',
        name: '第二课',
        items: [
          { id: 'hanzi_g1_l2_001', text: '爸爸', pinyin: 'ba ba' },
          { id: 'hanzi_g1_l2_002', text: '妈妈', pinyin: 'ma ma' },
          { id: 'hanzi_g1_l2_003', text: '哥哥', pinyin: 'ge ge' },
          { id: 'hanzi_g1_l2_004', text: '弟弟', pinyin: 'di di' },
          { id: 'hanzi_g1_l2_005', text: '姐姐', pinyin: 'jie jie' },
          { id: 'hanzi_g1_l2_006', text: '妹妹', pinyin: 'mei mei' },
          { id: 'hanzi_g1_l2_007', text: '老师', pinyin: 'lao shi' },
          { id: 'hanzi_g1_l2_008', text: '同学', pinyin: 'tong xue' }
        ]
      }
    ]
  }
]

export const DICTATION_ITEM_MAP = {}
export const DICTATION_LESSON_MAP = {}
export const DICTATION_COURSE_MAP = {}

for (const course of DICTATION_COURSES) {
  DICTATION_COURSE_MAP[course.id] = course
  for (const lesson of course.lessons) {
    DICTATION_LESSON_MAP[lesson.id] = { ...lesson, courseId: course.id, courseName: course.name }
    for (const item of lesson.items) {
      DICTATION_ITEM_MAP[item.id] = {
        ...item,
        type: 'dictation',
        courseId: course.id,
        courseName: course.name,
        lessonId: lesson.id,
        lessonName: lesson.name
      }
    }
  }
}

