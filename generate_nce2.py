#!/usr/bin/env python3
# 生成新概念英语第二册单词表 (vocab.js格式)
# 第二册约800词，按课次整理

words = [
  # Lesson 1-4
  (3568, 'private', '私人的'),
  (3569, 'public', '公共的'),
  (3570, 'pleasure', '愉快'),
  (3571, 'woods', '树林'),
  (3572, 'beautiful', '美丽的'),
  (3573, 'clear', '清晰的'),
  (3574, 'never', '从不'),
  (3575, 'ever', '曾经'),
  # Lesson 5-8
  (3576, 'cut', '切;割'),
  (3577, 'finger', '手指'),
  (3578, 'fail', '失败'),
  (3579, 'save', '救;节省'),
  (3580, 'pass', '通过;传递'),
  (3581, 'holiday', '假期'),
  (3582, 'village', '村庄'),
  (3583, 'mouth', '嘴'),
  (3584, 'swallow', '吞下'),
  (3585, 'later', '后来'),
  (3586, 'toilet', '厕所'),
  # Lesson 9-12
  (3587, 'cold', '冷的;感冒'),
  (3588, 'fever', '发烧'),
  (3589, 'cough', '咳嗽'),
  (3590, 'headache', '头疼'),
  (3591, 'earache', '耳朵疼'),
  (3592, 'toothache', '牙疼'),
  (3593, 'stomach ache', '胃疼'),
  (3594, 'temperature', '温度;发烧'),
  (3595, 'flu', '流感'),
  (3596, 'measles', '麻疹'),
  (3597, 'mumps', '腮腺炎'),
  # Lesson 13-16
  (3598, 'group', '组;群'),
  (3599, 'pop singer', '流行歌手'),
  (3600, 'club', '俱乐部'),
  (3601, 'performance', '表演'),
  (3602, 'occasion', '场合'),
  (3603, 'obvious', '明显的'),
  (3604, 'difference', '不同'),
  (3605, 'carry', '携带;搬运'),
  # Lesson 17-20
  (3606, 'appear', '出现'),
  (3607, 'stage', '舞台'),
  (3608, 'bright', '明亮的'),
  (3609, 'stocking', '长筒袜'),
  (3610, 'sock', '短袜'),
  (3611, 'hole', '洞'),
  (3612, 'repair', '修理'),
  (3613, 'try', '尝试'),
  (3614, 'believe', '相信'),
  (3615, 'may', '可以;可能'),
  # Lesson 21-24
  (3616, 'dream', '梦;梦想'),
  (3617, 'age', '年龄;时代'),
  (3618, 'channel', '频道;海峡'),
  (3619, 'throw', '扔;投掷'),
  (3620, 'rush', '冲;匆忙'),
  (3621, 'pole', '杆;极'),
  (3622, 'race', '比赛'),
  (3623, 'train', '火车;训练'),
  (3624, 'platform', '月台'),
  (3625, 'plenty', '大量'),
  # Lesson 25-28
  (3626, 'English', '英国的;英语'),
  (3627, 'reporter', '记者'),
  (3628, 'sensational', '轰动的'),
  (3629, 'mink coat', '貂皮大衣'),
  (3630, 'have been', '已经'),
  (3631, 'have gone', '已经去'),
  (3632, 'future', '未来'),
  (3633, 'get married', '结婚'),
  # Lesson 29-32
  (3634, 'land', '着陆;土地'),
  (3635, 'lonely', '孤独的'),
  (3636, 'roof', '屋顶'),
  (3637, 'block', '块;街区'),
  (3638, 'flat', '公寓;平坦的'),
  (3639, 'shelf', '架子'),
  (3640, 'desk', '书桌'),
  (3641, 'table', '桌子'),
  (3642, 'plate', '盘子'),
  (3643, 'cupboard', '碗柜'),
  # Lesson 33-36
  (3644, 'dark', '黑暗的'),
  (3645, 'torch', '手电筒'),
  (3646, 'shout', '喊叫'),
  (3647, 'purse', '钱包'),
  (3648, 'thief', '小偷'),
  (3649, 'enter', '进入'),
  (3650, 'happen', '发生'),
  (3651, 'story', '故事'),
  # Lesson 37-40
  (3652, 'customer', '顾客'),
  (3653, 'forget', '忘记'),
  (3654, 'manager', '经理'),
  (3655, 'serve', '服务'),
  (3656, 'counter', '柜台'),
  (3657, 'recognize', '认出'),
  (3658, 'trip', '旅行'),
  (3659, 'travel', '旅行'),
  (3660, 'travel agent', '旅行代理人'),
  (3661, 'exciting', '令人兴奋的'),
  (3662, 'abroad', '国外'),
  # Lesson 41-44
  (3663, 'water', '水'),
  (3664, 'sympathetic', '有同情心的'),
  (3665, 'complain', '抱怨'),
  (3666, 'wicked', '邪恶的'),
  (3667, 'contain', '包含'),
  (3668, 'honesty', '诚实'),
  (3669, 'famous', '著名的'),
  (3670, 'actress', '女演员'),
  (3671, 'at least', '至少'),
  (3672, 'actor', '男演员'),
  # Lesson 45-48
  (3673, 'forty', '四十'),
  (3674, 'over', '超过'),
  (3675, 'reach', '达到'),
  (3676, 'mile', '英里'),
  (3677, 'Egypt', '埃及'),
  (3678, 'abroad', '国外'),
  (3679, 'worry', '担心'),
  (3680, 'temperature', '温度'),
  # Lesson 49-52
  (3681, 'football', '足球'),
  (3682, 'pool', '池'),
  (3683, 'win', '赢'),
  (3684, 'world', '世界'),
  (3685, 'match', '比赛'),
  (3686, 'extra', '额外的'),
  (3687, 'overseas', '海外的'),
  (3688, 'engineering', '工程'),
  (3689, 'company', '公司'),
  (3690, 'line', '线路'),
  # Lesson 53-56
  (3691, 'excited', '兴奋的'),
  (3692, 'get on', '上车'),
  (3693, 'middle-aged', '中年的'),
  (3694, 'opposite', '对面的'),
  (3695, 'curiously', '好奇地'),
  (3696, 'funny', '有趣的'),
  (3697, 'surround', '包围'),
  (3698, 'wood', '树林'),
  (3699, 'beauty spot', '风景区'),
  (3700, 'hundred', '百'),
  (3701, 'city', '城市'),
  (3702, 'through', '穿过'),
  (3703, 'visitor', '游客'),
  # 继续添加第二册剩余单词...
  # 由于单词量太大，我先生成一部分，剩余的分批完成
]

# 生成 vocab.js 格式
output = '// ===== 新概念英语第二册 (ID 3568+) =====\n'
for id, en, zh in words:
    en_esc = en.replace("'", "\\'")
    output += f"w({id}, '{en_esc}', '{zh}')\n"

with open('nce2_vocab.txt', 'w', encoding='utf-8') as f:
    f.write(output)

print(f'Generated {len(words)} words for NCE Book 2')
print('Output written to nce2_vocab.txt')
print('NOTE: This is partial. Need to add more words for complete Book 2.')
