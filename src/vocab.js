/**
 * 内置词库 — 多字典支持
 *
 * 结构:
 *   DICTIONARIES = [{ id, name, description, wordIds }]
 *   WORD_MAP     = { [id]: { id, en, zh } }
 *
 * 所有词全局唯一 ID:
 *   1-200   核心词汇
 *   1001+   人教版小学英语
 */

// ========== 字典定义 ==========

// ========== 新概念第一册课次表 ==========
// 每个课次块 = 课本的“正课 + 配套练习课”，wordIds 按课本生词顺序排列

export const NCE1_LESSONS = [
  {
    id: 'nce1_l1',
    name: 'Lesson 1-2',
    from: 1,
    to: 2,
    wordIds: [
      3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 6001, 6002, 6003, 6004,
      6005, 6006, 6007, 6008, 6009, 6010
    ]
  },
  {
    id: 'nce1_l3',
    name: 'Lesson 3-4',
    from: 3,
    to: 4,
    wordIds: [
      3012, 3013, 3014, 3015, 3016, 3017, 6011, 3018, 3019, 3020, 3021, 6012, 6013, 6014, 6015
    ]
  },
  {
    id: 'nce1_l5',
    name: 'Lesson 5-6',
    from: 5,
    to: 6,
    wordIds: [
      3022, 3023, 3024, 3025, 3026, 3027, 3028, 3029, 3030, 3031, 3032, 3033, 3034, 3035, 3207,
      6016, 6017, 6018, 6019, 6020, 6021, 6022, 6023, 6024, 6025, 6026, 6027
    ]
  },
  {
    id: 'nce1_l7',
    name: 'Lesson 7-8',
    from: 7,
    to: 8,
    wordIds: [
      6028, 6029, 3040, 3041, 3042, 3043, 3044, 3045, 3046, 3047, 3048, 3049, 3050, 3051, 3052,
      3053, 3054, 3055, 3056
    ]
  },
  {
    id: 'nce1_l9',
    name: 'Lesson 9-10',
    from: 9,
    to: 10,
    wordIds: [
      3036, 3037, 3038, 3039, 3058, 3059, 3060, 3061, 6030, 3057, 3062, 3063, 3064, 6031, 6032,
      6033, 6034, 6035, 6036, 3237, 6037, 3274, 6038, 6039, 6040, 6041
    ]
  },
  {
    id: 'nce1_l11',
    name: 'Lesson 11-12',
    from: 11,
    to: 12,
    wordIds: [
      3065, 3066, 3067, 3068, 3069, 3077, 3079, 6042, 6043, 6044, 6045, 6046, 6047
    ]
  },
  {
    id: 'nce1_l13',
    name: 'Lesson 13-14',
    from: 13,
    to: 14,
    wordIds: [
      6048, 3073, 3080, 3081, 3082, 3083, 3084, 3085, 3086, 3087, 3088
    ]
  },
  {
    id: 'nce1_l15',
    name: 'Lesson 15-16',
    from: 15,
    to: 16,
    wordIds: [
      3089, 3090, 3091, 6049, 3092, 6050, 3093, 3071, 3094, 6051, 6052, 3095, 3072, 3070, 3074,
      3075, 3076
    ]
  },
  {
    id: 'nce1_l17',
    name: 'Lesson 17-18',
    from: 17,
    to: 18,
    wordIds: [
      3096, 6053, 6054, 3099, 3100, 3101, 3097, 3098
    ]
  },
  {
    id: 'nce1_l19',
    name: 'Lesson 19-20',
    from: 19,
    to: 20,
    wordIds: [
      3102, 3103, 3104, 3105, 3106, 6055, 3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115,
      3116, 3117, 3118, 3119
    ]
  },
  {
    id: 'nce1_l21',
    name: 'Lesson 21-22',
    from: 21,
    to: 22,
    wordIds: [
      3122, 3121, 3120, 6056, 6057, 6058, 3472, 6059, 6060, 6061, 6062, 6063, 6064, 6065, 6066,
      6067
    ]
  },
  {
    id: 'nce1_l23',
    name: 'Lesson 23-24',
    from: 23,
    to: 24,
    wordIds: [
      3123, 3124, 3125, 3126, 3127, 3128, 3129, 3130, 3131, 3132, 3133, 3134, 3135, 3136
    ]
  },
  {
    id: 'nce1_l25',
    name: 'Lesson 25-26',
    from: 25,
    to: 26,
    wordIds: [
      6068, 6069, 3137, 3139, 3140, 3141, 3142, 6070, 6071, 6072, 6073
    ]
  },
  {
    id: 'nce1_l27',
    name: 'Lesson 27-28',
    from: 27,
    to: 28,
    wordIds: [
      3150, 3151, 3152, 3153, 3154, 3155, 3156, 3157
    ]
  },
  {
    id: 'nce1_l29',
    name: 'Lesson 29-30',
    from: 29,
    to: 30,
    wordIds: [
      3159, 3160, 3161, 3163, 6074, 3165, 3166, 3167, 3168, 3236, 6075, 3164, 6076, 6077, 6078
    ]
  },
  {
    id: 'nce1_l31',
    name: 'Lesson 31-32',
    from: 31,
    to: 32,
    wordIds: [
      3169, 3170, 3171, 3172, 3173, 3174, 3175, 3176, 3177, 3178, 6079, 6080, 6081, 6082, 6083,
      6084, 3239, 3240, 3241, 3242, 6085
    ]
  },
  {
    id: 'nce1_l33',
    name: 'Lesson 33-34',
    from: 33,
    to: 34,
    wordIds: [
      3179, 6086, 6087, 3180, 3181, 3182, 3183, 3184, 3185, 3186, 3187, 3188, 3189, 3190, 3419,
      6088, 6089, 6090, 6091, 6092, 6093
    ]
  },
  {
    id: 'nce1_l35',
    name: 'Lesson 35-36',
    from: 35,
    to: 36,
    wordIds: [
      6094, 3191, 3192, 3193, 3194, 3195, 3196, 3197, 3198, 3199, 3200, 3201, 3202, 3203, 3204,
      6095, 6096
    ]
  },
  {
    id: 'nce1_l37',
    name: 'Lesson 37-38',
    from: 37,
    to: 38,
    wordIds: [
      3205, 3206, 3208, 3209, 3210, 3078, 3212, 6097, 6098, 6099
    ]
  },
  {
    id: 'nce1_l39',
    name: 'Lesson 39-40',
    from: 39,
    to: 40,
    wordIds: [
      3213, 3214, 3215, 3216, 3217, 3218, 3219, 3220, 3365
    ]
  },
  {
    id: 'nce1_l41',
    name: 'Lesson 41-42',
    from: 41,
    to: 42,
    wordIds: [
      3221, 3222, 3223, 3224, 3225, 3226, 3227, 3228, 6100, 6101, 6102
    ]
  },
  {
    id: 'nce1_l43',
    name: 'Lesson 43-44',
    from: 43,
    to: 44,
    wordIds: [
      3143, 3144, 3145, 3146, 3147, 3148, 3149, 3229, 3233, 3234
    ]
  },
  {
    id: 'nce1_l45',
    name: 'Lesson 45-46',
    from: 45,
    to: 46,
    wordIds: [
      3230, 3231, 3232, 6103, 6104, 6105, 3238, 6106, 6107, 6108
    ]
  },
  {
    id: 'nce1_l47',
    name: 'Lesson 47-48',
    from: 47,
    to: 48,
    wordIds: [
      3243, 3244, 3245, 3246, 3247, 3248, 3249, 3250, 3251, 3252, 3253, 6109, 6110, 6111, 6112,
      6113, 6114
    ]
  },
  {
    id: 'nce1_l49',
    name: 'Lesson 49-50',
    from: 49,
    to: 50,
    wordIds: [
      3255, 3256, 3257, 3258, 3259, 3260, 3261, 3262, 3263, 3264, 3265, 6115, 6116, 6117, 6118,
      6119, 6120, 6121, 6122, 6123
    ]
  },
  {
    id: 'nce1_l51',
    name: 'Lesson 51-52',
    from: 51,
    to: 52,
    wordIds: [
      6124, 3266, 3280, 3267, 3268, 3269, 6125, 3270, 3271, 6126, 3272, 3273, 3275, 3276, 6127,
      6128, 6129, 6130, 3404, 6131, 6132, 6133, 6134, 6135, 6136, 6137, 6138, 6139, 6140, 6141,
      6142, 6143, 6144, 6145, 6146, 6147, 6148
    ]
  },
  {
    id: 'nce1_l53',
    name: 'Lesson 53-54',
    from: 53,
    to: 54,
    wordIds: [
      6149, 6150, 6151, 6152, 6153, 6154, 6155, 6156, 6157, 6158, 6159, 6160, 6161, 6162, 3277,
      3278, 3279, 3281, 6163, 6164, 6165, 6166, 6167, 6168, 6169, 6170, 6171, 6172, 6173, 6174,
      6175, 6176, 6177, 6178, 6179, 6180, 6181, 6182, 6183
    ]
  },
  {
    id: 'nce1_l55',
    name: 'Lesson 55-56',
    from: 55,
    to: 56,
    wordIds: [
      3282, 3283, 3284, 3285, 3286, 3287, 3288, 3289, 3290, 3291
    ]
  },
  {
    id: 'nce1_l57',
    name: 'Lesson 57-58',
    from: 57,
    to: 58,
    wordIds: [
      6184, 3293, 3294
    ]
  },
  {
    id: 'nce1_l59',
    name: 'Lesson 59-60',
    from: 59,
    to: 60,
    wordIds: [
      3295, 6185, 6186, 3299, 3303, 3304, 3301, 3302, 3300
    ]
  },
  {
    id: 'nce1_l61',
    name: 'Lesson 61-62',
    from: 61,
    to: 62,
    wordIds: [
      3306, 6187, 6188, 6189, 3296, 6190, 3495, 6191, 6192, 6193, 3307, 6194, 3308, 3309, 6195,
      3310, 6196, 3311, 3312, 3313, 3314
    ]
  },
  {
    id: 'nce1_l63',
    name: 'Lesson 63-64',
    from: 63,
    to: 64,
    wordIds: [
      3315, 6197, 6198, 3317, 3318, 3319, 3316, 3320, 3321, 6199, 3549, 6200, 6201, 6202, 6203,
      6204, 6205, 6206
    ]
  },
  {
    id: 'nce1_l65',
    name: 'Lesson 65-66',
    from: 65,
    to: 66,
    wordIds: [
      6207, 3324, 3323, 3325, 3326, 3327, 6208, 3328, 6209, 6210, 6211
    ]
  },
  {
    id: 'nce1_l67',
    name: 'Lesson 67-68',
    from: 67,
    to: 68,
    wordIds: [
      6212, 6213, 3351, 3352, 3353, 3354, 3370, 6214, 3329, 3355, 3356, 3357, 6215, 3335, 3336,
      3331, 3332, 3333, 3334
    ]
  },
  {
    id: 'nce1_l69',
    name: 'Lesson 69-70',
    from: 69,
    to: 70,
    wordIds: [
      3337, 3338, 3339, 3340, 3341, 3342, 6216, 6217, 6218, 6219, 3343
    ]
  },
  {
    id: 'nce1_l71',
    name: 'Lesson 71-72',
    from: 71,
    to: 72,
    wordIds: [
      3344, 6220, 6221, 6222, 6223, 3347, 3348, 3349
    ]
  },
  {
    id: 'nce1_l73',
    name: 'Lesson 73-74',
    from: 73,
    to: 74,
    wordIds: [
      3350, 6224, 6225, 6226, 6227, 6228, 6229, 6230, 3366, 6231, 6232, 6233, 6234, 3358, 6235,
      6236, 6237, 6238, 6239
    ]
  },
  {
    id: 'nce1_l75',
    name: 'Lesson 75-76',
    from: 75,
    to: 76,
    wordIds: [
      6240, 6241, 6242, 6243, 3361, 6244, 3362, 3363
    ]
  },
  {
    id: 'nce1_l77',
    name: 'Lesson 77-78',
    from: 77,
    to: 78,
    wordIds: [
      3367, 3368, 3369, 3371
    ]
  },
  {
    id: 'nce1_l79',
    name: 'Lesson 79-80',
    from: 79,
    to: 80,
    wordIds: [
      6245, 3375, 6246, 3374, 6247, 6248, 6249, 3373, 3372, 3376, 3377, 3378
    ]
  },
  {
    id: 'nce1_l81',
    name: 'Lesson 81-82',
    from: 81,
    to: 82,
    wordIds: [
      3379, 3380, 3381, 3382, 3383, 3384, 6250, 6251, 6252, 6253
    ]
  },
  {
    id: 'nce1_l83',
    name: 'Lesson 83-84',
    from: 83,
    to: 84,
    wordIds: [
      3386, 3387, 3388, 3389, 3390
    ]
  },
  {
    id: 'nce1_l85',
    name: 'Lesson 85-86',
    from: 85,
    to: 86,
    wordIds: [
      3391, 3392, 3393, 3394, 3360, 3396, 3397
    ]
  },
  {
    id: 'nce1_l87',
    name: 'Lesson 87-88',
    from: 87,
    to: 88,
    wordIds: [
      3398, 3364, 3399, 3400, 6254, 3401, 3402
    ]
  },
  {
    id: 'nce1_l89',
    name: 'Lesson 89-90',
    from: 89,
    to: 90,
    wordIds: [
      3403, 3407, 3408, 3409, 3305, 3411, 6255, 6256, 3443, 6257, 6258
    ]
  },
  {
    id: 'nce1_l91',
    name: 'Lesson 91-92',
    from: 91,
    to: 92,
    wordIds: [
      3322, 3413, 6259, 3416, 3417, 6260, 3415
    ]
  },
  {
    id: 'nce1_l93',
    name: 'Lesson 93-94',
    from: 93,
    to: 94,
    wordIds: [
      3418, 3420, 6261, 3421, 6262, 3426, 6263, 3422, 6264, 6265, 3423, 3424, 3425, 6266, 6267
    ]
  },
  {
    id: 'nce1_l95',
    name: 'Lesson 95-96',
    from: 95,
    to: 96,
    wordIds: [
      3428, 3429, 3430, 3385, 3432
    ]
  },
  {
    id: 'nce1_l97',
    name: 'Lesson 97-98',
    from: 97,
    to: 98,
    wordIds: [
      3436, 3437, 3438, 3439, 3440, 6268, 3441, 3442
    ]
  },
  {
    id: 'nce1_l99',
    name: 'Lesson 99-100',
    from: 99,
    to: 100,
    wordIds: [
      6269, 6270, 6271, 6272, 6273, 6274, 6275, 6276, 6277, 6278, 6279
    ]
  },
  {
    id: 'nce1_l101',
    name: 'Lesson 101-102',
    from: 101,
    to: 102,
    wordIds: [
      3448, 3449, 3450, 3451, 3452, 3453, 3297
    ]
  },
  {
    id: 'nce1_l103',
    name: 'Lesson 103-104',
    from: 103,
    to: 104,
    wordIds: [
      3454, 3455, 6280, 3457, 3458, 3459, 3460, 6281, 6282, 6283, 6284, 6285, 6286, 6287, 6288,
      6289, 3456, 6290, 6291, 6292, 3482, 6293, 6294, 6295, 6296, 6297
    ]
  },
  {
    id: 'nce1_l105',
    name: 'Lesson 105-106',
    from: 105,
    to: 106,
    wordIds: [
      3461, 3462, 3463, 3464, 3465, 6298, 6299
    ]
  },
  {
    id: 'nce1_l107',
    name: 'Lesson 107-108',
    from: 107,
    to: 108,
    wordIds: [
      3466, 6300, 3469, 3470
    ]
  },
  {
    id: 'nce1_l109',
    name: 'Lesson 109-110',
    from: 109,
    to: 110,
    wordIds: [
      3471, 3475, 3473, 3474, 3476, 6301, 6302, 6303, 6304, 6305, 6306, 6307
    ]
  },
  {
    id: 'nce1_l111',
    name: 'Lesson 111-112',
    from: 111,
    to: 112,
    wordIds: [
      3477, 3478, 3479, 3480, 3481, 6308
    ]
  },
  {
    id: 'nce1_l113',
    name: 'Lesson 113-114',
    from: 113,
    to: 114,
    wordIds: [
      3483, 3484, 3446, 3487, 6309, 6310, 6311, 6312, 6313
    ]
  },
  {
    id: 'nce1_l115',
    name: 'Lesson 115-116',
    from: 115,
    to: 116,
    wordIds: [
      3488, 3489, 3490, 3491, 3492, 6314, 6315, 6316, 6317, 6318, 6319, 6320
    ]
  },
  {
    id: 'nce1_l117',
    name: 'Lesson 117-118',
    from: 117,
    to: 118,
    wordIds: [
      3493, 3494, 3496, 3497, 3498, 3346
    ]
  },
  {
    id: 'nce1_l119',
    name: 'Lesson 119-120',
    from: 119,
    to: 120,
    wordIds: [
      3499, 3500, 3501, 3502, 3503, 3504, 6321, 6322, 3505, 3506, 6323
    ]
  },
  {
    id: 'nce1_l121',
    name: 'Lesson 121-122',
    from: 121,
    to: 122,
    wordIds: [
      3507, 3508, 3509, 3510, 3511, 3512, 6324
    ]
  },
  {
    id: 'nce1_l123',
    name: 'Lesson 123-124',
    from: 123,
    to: 124,
    wordIds: [
      6325, 3513, 3514, 6326, 6327, 6328, 6329, 3515, 3519, 6330
    ]
  },
  {
    id: 'nce1_l125',
    name: 'Lesson 125-126',
    from: 125,
    to: 126,
    wordIds: [
      6331, 6332, 6333, 6334, 6335, 3520, 3521, 3522, 3523, 6336
    ]
  },
  {
    id: 'nce1_l127',
    name: 'Lesson 127-128',
    from: 127,
    to: 128,
    wordIds: [
      3359, 3525, 3526, 3527, 3528
    ]
  },
  {
    id: 'nce1_l129',
    name: 'Lesson 129-130',
    from: 129,
    to: 130,
    wordIds: [
      6337, 6338, 3531, 6339, 6340, 6341, 6342, 6343, 6344, 6345, 3530
    ]
  },
  {
    id: 'nce1_l131',
    name: 'Lesson 131-132',
    from: 131,
    to: 132,
    wordIds: [
      3532, 3517, 3534, 3535
    ]
  },
  {
    id: 'nce1_l133',
    name: 'Lesson 133-134',
    from: 133,
    to: 134,
    wordIds: [
      3538, 3537, 3539, 3540, 3542
    ]
  },
  {
    id: 'nce1_l135',
    name: 'Lesson 135-136',
    from: 135,
    to: 136,
    wordIds: [
      3543, 3544, 6346, 6347, 6348
    ]
  },
  {
    id: 'nce1_l137',
    name: 'Lesson 137-138',
    from: 137,
    to: 138,
    wordIds: [
      3545, 3546, 3547, 3548, 6349
    ]
  },
  {
    id: 'nce1_l139',
    name: 'Lesson 139-140',
    from: 139,
    to: 140,
    wordIds: [
      3550, 3551, 3552, 3553, 3554
    ]
  },
  {
    id: 'nce1_l141',
    name: 'Lesson 141-142',
    from: 141,
    to: 142,
    wordIds: [
      3555, 3556, 3557, 3558, 3559, 3560, 6350, 6351, 6352, 6353, 6354, 6355, 6356, 6357
    ]
  },
  {
    id: 'nce1_l143',
    name: 'Lesson 143-144',
    from: 143,
    to: 144,
    wordIds: [
      3561, 3562, 3563, 3445, 3566, 3567, 6358, 6359, 6360, 6361, 6362, 6363, 6364, 6365, 6366,
      6367, 6368, 6369, 6370
    ]
  },
]

export const DICTIONARIES = [
  {
    id: 'core',
    name: '核心词汇',
    description: '常用英语核心词汇（CET-4 级别）',
    wordCount: 200,
    wordIds: Array.from({ length: 200 }, (_, i) => i + 1)
  },
  {
    id: 'pep',
    name: '人教版小学英语',
    description: 'PEP 小学英语 1-6 年级',
    subLabel: '1-6年级',
    wordCount: 340,
    wordIds: Array.from({ length: 340 }, (_, i) => 1001 + i)
  },
  {
    id: 'nce1',
    name: '新概念英语第一册',
    description: '经典版外研社新概念英语第一册（按课次）',
    subLabel: '初级',
    wordCount: NCE1_LESSONS.reduce((n, l) => n + l.wordIds.length, 0),
    lessons: NCE1_LESSONS,
    wordIds: NCE1_LESSONS.flatMap(l => l.wordIds)
  },
  {
    id: 'nce2',
    name: '新概念英语第二册',
    description: '经典版外研社新概念英语第二册',
    subLabel: '初级+',
    wordCount: 634,
    wordIds: Array.from({ length: 634 }, (_, i) => 3568 + i)
  },
  {
    id: 'sz_oxford',
    name: '深圳小学牛津版',
    description: '深圳小学牛津版英语 1-6 年级',
    subLabel: '1-6年级',
    wordCount: 319,
    wordIds: Array.from({ length: 319 }, (_, i) => 4202 + i)
  },
  {
    id: 'poems',
    name: '古诗词',
    description: '中华经典古诗词',
    subLabel: '待添加',
    wordCount: 0,
    wordIds: []
  }
]

// ========== 全局词表 ==========
// key = word id, value = { id, en, zh }

const W = {} // temporary builder

function w(id, en, zh, lesson) {
  W[id] = lesson ? { id, en, zh, lesson } : { id, en, zh }
}

function p(id, title, author, content) {
  W[id] = { id, title, author, content }
}

// ------ 1-200: 核心词汇 (CET-4) ------
w(1, 'abandon', '放弃；遗弃')
w(2, 'ability', '能力；才能')
w(3, 'abroad', '在国外；到国外')
w(4, 'absent', '缺席的；不在的')
w(5, 'absorb', '吸收；吸引')
w(6, 'abstract', '抽象的；摘要')
w(7, 'academic', '学术的；学院的')
w(8, 'accelerate', '加速；促进')
w(9, 'access', '通道；进入；访问')
w(10, 'accompany', '伴随；陪同')
w(11, 'accomplish', '完成；实现')
w(12, 'account', '账户；说明；理由')
w(13, 'accurate', '准确的；精确的')
w(14, 'achieve', '达到；取得')
w(15, 'acknowledge', '承认；致谢')
w(16, 'acquire', '获得；学到')
w(17, 'adapt', '适应；改编')
w(18, 'adequate', '足够的；适当的')
w(19, 'adjust', '调整；适应')
w(20, 'administration', '管理；行政')
w(21, 'adopt', '采纳；收养')
w(22, 'advance', '前进；进步；预付')
w(23, 'advantage', '优势；有利条件')
w(24, 'advertise', '做广告；宣传')
w(25, 'affair', '事务；事件')
w(26, 'affect', '影响；感动')
w(27, 'afford', '负担得起；提供')
w(28, 'agenda', '议程；日程')
w(29, 'aggressive', '侵略的；有进取心的')
w(30, 'agree', '同意；一致')
w(31, 'agriculture', '农业；农学')
w(32, 'allocate', '分配；拨出')
w(33, 'alternative', '替代的；选择')
w(34, 'amaze', '使惊奇；使惊愕')
w(35, 'ambition', '雄心；野心')
w(36, 'analysis', '分析；解析')
w(37, 'announce', '宣布；通告')
w(38, 'annual', '每年的；年度的')
w(39, 'anxiety', '焦虑；忧虑')
w(40, 'apparent', '显然的；表面的')
w(41, 'appeal', '呼吁；吸引；上诉')
w(42, 'appetite', '食欲；胃口；欲望')
w(43, 'appliance', '器具；电器')
w(44, 'application', '申请；应用；应用程序')
w(45, 'appoint', '任命；指定')
w(46, 'appreciate', '欣赏；感激；领会')
w(47, 'approach', '接近；方法；途径')
w(48, 'appropriate', '适当的；恰当的')
w(49, 'approve', '批准；赞成')
w(50, 'argument', '争论；论点')
w(51, 'arrange', '安排；排列')
w(52, 'arrest', '逮捕；阻止')
w(53, 'article', '文章；物品；冠词')
w(54, 'aspect', '方面；层面')
w(55, 'assemble', '集合；组装')
w(56, 'assess', '评估；评定')
w(57, 'assign', '分配；指定')
w(58, 'assist', '帮助；协助')
w(59, 'associate', '联系；关联；同事')
w(60, 'assume', '假设；承担')
w(61, 'atmosphere', '大气；氛围')
w(62, 'attach', '附上；连接；依恋')
w(63, 'attempt', '尝试；企图')
w(64, 'attend', '出席；参加；照料')
w(65, 'attitude', '态度；看法')
w(66, 'attract', '吸引；引起')
w(67, 'authority', '权威；当局')
w(68, 'available', '可用的；有效的')
w(69, 'average', '平均的；普通的')
w(70, 'avoid', '避免；回避')
w(71, 'aware', '意识到的；知道的')
w(72, 'balance', '平衡；余额')
w(73, 'barrier', '障碍；屏障')
w(74, 'behave', '行为；表现')
w(75, 'belief', '信念；信仰')
w(76, 'benefit', '利益；好处；受益')
w(77, 'blame', '责备；归咎于')
w(78, 'bother', '打扰；烦恼')
w(79, 'boundary', '边界；界限')
w(80, 'brand', '品牌；商标')
w(81, 'brilliant', '灿烂的；杰出的')
w(82, 'budget', '预算')
w(83, 'burden', '负担；重任')
w(84, 'calculate', '计算；推算')
w(85, 'campaign', '运动；战役')
w(86, 'capable', '有能力的')
w(87, 'capacity', '容量；能力')
w(88, 'capture', '捕获；夺取')
w(89, 'career', '职业；生涯')
w(90, 'category', '类别；种类')
w(91, 'celebrate', '庆祝；赞美')
w(92, 'challenge', '挑战')
w(93, 'characteristic', '特征；特点')
w(94, 'circumstance', '环境；情况')
w(95, 'claim', '声称；要求；索赔')
w(96, 'classify', '分类；归类')
w(97, 'climate', '气候；风气')
w(98, 'coach', '教练；指导')
w(99, 'collapse', '倒塌；崩溃')
w(100, 'command', '命令；指挥；掌握')
w(101, 'comment', '评论；注释')
w(102, 'commit', '犯（罪）；承诺')
w(103, 'communicate', '交流；传达')
w(104, 'community', '社区；团体')
w(105, 'companion', '同伴；伙伴')
w(106, 'compare', '比较；对比')
w(107, 'compete', '竞争；比赛')
w(108, 'complain', '抱怨；投诉')
w(109, 'complex', '复杂的；复合的')
w(110, 'component', '成分；组件')
w(111, 'concentrate', '集中；专注')
w(112, 'concept', '概念；观念')
w(113, 'concern', '关心；担忧；涉及')
w(114, 'conclude', '结论；结束')
w(115, 'condition', '条件；状况')
w(116, 'conduct', '行为；指挥；进行')
w(117, 'conference', '会议；讨论会')
w(118, 'confident', '自信的；有信心的')
w(119, 'confirm', '确认；证实')
w(120, 'conflict', '冲突；矛盾')
w(121, 'confuse', '使困惑；混淆')
w(122, 'connect', '连接；联系')
w(123, 'conscious', '有意识的；自觉的')
w(124, 'consequence', '结果；后果')
w(125, 'conservative', '保守的；传统的')
w(126, 'consider', '考虑；认为')
w(127, 'consistent', '一致的；稳定的')
w(128, 'constant', '不变的；经常的')
w(129, 'construct', '建造；构建')
w(130, 'consult', '咨询；查阅')
w(131, 'consume', '消费；消耗')
w(132, 'contact', '接触；联系')
w(133, 'contain', '包含；容纳')
w(134, 'contemporary', '当代的；同时代的')
w(135, 'content', '内容；满足的')
w(136, 'contest', '竞赛；比赛')
w(137, 'context', '上下文；背景')
w(138, 'contract', '合同；收缩')
w(139, 'contrast', '对比；反差')
w(140, 'contribute', '贡献；捐献；促成')
w(141, 'convenient', '方便的；便利的')
w(142, 'convince', '说服；使确信')
w(143, 'cooperate', '合作；协作')
w(144, 'correspond', '对应；通信')
w(145, 'council', '委员会；理事会')
w(146, 'count', '计数；重要')
w(147, 'create', '创造；创作')
w(148, 'credit', '信用；学分；赞扬')
w(149, 'crime', '犯罪；罪行')
w(150, 'crisis', '危机；紧要关头')
w(151, 'critical', '批评的；关键的')
w(152, 'cultivate', '培养；耕作')
w(153, 'curious', '好奇的；求知的')
w(154, 'current', '当前的；流通的')
w(155, 'custom', '习惯；风俗')
w(156, 'damage', '损害；损失')
w(157, 'debate', '辩论；争论')
w(158, 'debt', '债务；欠款')
w(159, 'decade', '十年')
w(160, 'declare', '宣布；声明')
w(161, 'decline', '下降；拒绝')
w(162, 'decorate', '装饰；布置')
w(163, 'decrease', '减少；降低')
w(164, 'defeat', '击败；失败')
w(165, 'defend', '防御；辩护')
w(166, 'define', '定义；界定')
w(167, 'definite', '明确的；肯定的')
w(168, 'deliberate', '故意的；深思熟虑的')
w(169, 'delicate', '精致的；微妙的')
w(170, 'deliver', '递送；发表；接生')
w(171, 'demand', '要求；需求')
w(172, 'demonstrate', '证明；示范')
w(173, 'depart', '离开；出发')
w(174, 'depend', '依赖；取决于')
w(175, 'deposit', '存款；押金；沉淀')
w(176, 'depress', '使沮丧；压低')
w(177, 'derive', '源于；获得')
w(178, 'describe', '描述；形容')
w(179, 'deserve', '值得；应得')
w(180, 'desperate', '绝望的；拼命的')
w(181, 'despite', '尽管；不管')
w(182, 'destination', '目的地；终点')
w(183, 'destroy', '破坏；消灭')
w(184, 'determine', '决定；确定')
w(185, 'develop', '发展；开发；培养')
w(186, 'device', '设备；装置')
w(187, 'devote', '致力于；奉献')
w(188, 'discipline', '纪律；学科')
w(189, 'discover', '发现；发觉')
w(190, 'display', '展示；陈列')
w(191, 'dispute', '争端；纠纷')
w(192, 'distinct', '明显的；独特的')
w(193, 'distinguish', '区分；辨别')
w(194, 'distribute', '分配；分发')
w(195, 'disturb', '打扰；扰乱')
w(196, 'dynamic', '动态的；有活力的')
w(197, 'economy', '经济；节约')
w(198, 'educate', '教育；培养')
w(199, 'efficient', '高效的；有效率的')
w(200, 'elaborate', '详尽阐述的；精心的')

// ------ 1001+: 人教版小学英语 (PEP 1-6年级) ------
// 按年级分组，方便查阅

// --- 三年级上册 (G3上) ---
w(1001, 'pen', '钢笔')
w(1002, 'pencil', '铅笔')
w(1003, 'pencil box', '铅笔盒')
w(1004, 'ruler', '尺子')
w(1005, 'eraser', '橡皮')
w(1006, 'crayon', '蜡笔')
w(1007, 'book', '书')
w(1008, 'bag', '书包；袋子')
w(1009, 'sharpener', '卷笔刀')
w(1010, 'school', '学校')
w(1011, 'head', '头')
w(1012, 'face', '脸')
w(1013, 'nose', '鼻子')
w(1014, 'mouth', '嘴')
w(1015, 'eye', '眼睛')
w(1016, 'ear', '耳朵')
w(1017, 'arm', '胳膊')
w(1018, 'hand', '手')
w(1019, 'leg', '腿')
w(1020, 'foot', '脚')
w(1021, 'body', '身体')
w(1022, 'red', '红色的')
w(1023, 'yellow', '黄色的')
w(1024, 'green', '绿色的')
w(1025, 'blue', '蓝色的')
w(1026, 'purple', '紫色的')
w(1027, 'white', '白色的')
w(1028, 'black', '黑色的')
w(1029, 'orange', '橙色的；橙子')
w(1030, 'pink', '粉色的')
w(1031, 'brown', '棕色的')
w(1032, 'cat', '猫')
w(1033, 'dog', '狗')
w(1034, 'monkey', '猴子')
w(1035, 'panda', '熊猫')
w(1036, 'rabbit', '兔子')
w(1037, 'duck', '鸭子')
w(1038, 'pig', '猪')
w(1039, 'bird', '鸟')
w(1040, 'bear', '熊')
w(1041, 'elephant', '大象')
w(1042, 'mouse', '老鼠')
w(1043, 'squirrel', '松鼠')
w(1044, 'cake', '蛋糕')
w(1045, 'bread', '面包')
w(1046, 'hot dog', '热狗')
w(1047, 'hamburger', '汉堡包')
w(1048, 'chicken', '鸡肉；鸡')
w(1049, 'French fries', '炸薯条')
w(1050, 'Coke', '可乐')
w(1051, 'juice', '果汁')
w(1052, 'milk', '牛奶')
w(1053, 'water', '水')
w(1054, 'tea', '茶')
w(1055, 'coffee', '咖啡')
w(1056, 'one', '一')
w(1057, 'two', '二')
w(1058, 'three', '三')
w(1059, 'four', '四')
w(1060, 'five', '五')
w(1061, 'six', '六')
w(1062, 'seven', '七')
w(1063, 'eight', '八')
w(1064, 'nine', '九')
w(1065, 'ten', '十')
w(1066, 'doll', '玩具娃娃')
w(1067, 'boat', '小船')
w(1068, 'ball', '球')
w(1069, 'kite', '风筝')
w(1070, 'balloon', '气球')
w(1071, 'car', '小汽车')

// --- 三年级下册 (G3下) ---
w(1072, 'boy', '男孩')
w(1073, 'girl', '女孩')
w(1074, 'teacher', '老师')
w(1075, 'student', '学生')
w(1076, 'friend', '朋友')
w(1077, 'father', '爸爸；父亲')
w(1078, 'mother', '妈妈；母亲')
w(1079, 'man', '男人')
w(1080, 'woman', '女人')
w(1081, 'grandmother', '（外）祖母')
w(1082, 'grandfather', '（外）祖父')
w(1083, 'sister', '姐妹')
w(1084, 'brother', '兄弟')
w(1085, 'eleven', '十一')
w(1086, 'twelve', '十二')
w(1087, 'thirteen', '十三')
w(1088, 'fourteen', '十四')
w(1089, 'fifteen', '十五')
w(1090, 'sixteen', '十六')
w(1091, 'seventeen', '十七')
w(1092, 'eighteen', '十八')
w(1093, 'nineteen', '十九')
w(1094, 'twenty', '二十')
w(1095, 'peach', '桃子')
w(1096, 'pear', '梨')
w(1097, 'apple', '苹果')
w(1098, 'banana', '香蕉')
w(1099, 'grape', '葡萄')
w(1100, 'watermelon', '西瓜')
w(1101, 'strawberry', '草莓')
w(1102, 'bus', '公共汽车')
w(1103, 'bike', '自行车')
w(1104, 'taxi', '出租车')
w(1105, 'jeep', '吉普车')

// --- 四年级上册 (G4上) ---
w(1106, 'classroom', '教室')
w(1107, 'window', '窗户')
w(1108, 'door', '门')
w(1109, 'picture', '图画')
w(1110, 'board', '写字板')
w(1111, 'desk', '书桌')
w(1112, 'chair', '椅子')
w(1113, 'floor', '地板')
w(1114, 'wall', '墙')
w(1115, 'computer', '电脑')
w(1116, 'fan', '风扇')
w(1117, 'light', '灯')
w(1118, 'schoolbag', '书包')
w(1119, 'notebook', '笔记本')
w(1120, 'maths', '数学')
w(1121, 'English', '英语')
w(1122, 'Chinese', '语文；中文')
w(1123, 'music', '音乐')
w(1124, 'science', '科学')
w(1125, 'sports', '体育运动')
w(1126, 'strong', '强壮的')
w(1127, 'friendly', '友好的')
w(1128, 'quiet', '安静的')
w(1129, 'hair', '头发')
w(1130, 'shoe', '鞋')
w(1131, 'glasses', '眼镜')
w(1132, 'bedroom', '卧室')
w(1133, 'living room', '客厅')
w(1134, 'kitchen', '厨房')
w(1135, 'bathroom', '浴室')
w(1136, 'sofa', '沙发')
w(1137, 'table', '桌子')
w(1138, 'fridge', '冰箱')

// --- 四年级下册 (G4下) ---
w(1139, 'playground', '操场')
w(1140, 'garden', '花园')
w(1141, 'library', '图书馆')
w(1142, 'canteen', '食堂')
w(1143, 'art room', '美术室')
w(1144, 'music room', '音乐室')
w(1145, 'computer room', '电脑室')
w(1146, 'breakfast', '早餐')
w(1147, 'lunch', '午餐')
w(1148, 'dinner', '晚餐')
w(1149, 'ready', '准备好的')
w(1150, 'plate', '盘子')
w(1151, 'knife', '刀')
w(1152, 'fork', '叉')
w(1153, 'spoon', '勺子')
w(1154, 'chopsticks', '筷子')
w(1155, 'vegetable', '蔬菜')
w(1156, 'potato', '土豆')
w(1157, 'tomato', '西红柿')
w(1158, 'cucumber', '黄瓜')
w(1159, 'carrot', '胡萝卜')
w(1160, 'shorts', '短裤')
w(1161, 'shirt', '衬衫')
w(1162, 'skirt', '裙子')
w(1163, 'dress', '连衣裙')
w(1164, 'jacket', '夹克')
w(1165, 'sweater', '毛衣')
w(1166, 'coat', '外套')
w(1167, 'socks', '袜子')
w(1168, 'gloves', '手套')
w(1169, 'hat', '帽子')

// --- 五年级上册 (G5上) ---
w(1170, 'old', '年老的；旧的')
w(1171, 'young', '年轻的')
w(1172, 'funny', '滑稽的')
w(1173, 'kind', '和蔼的')
w(1174, 'strict', '严格的')
w(1175, 'polite', '有礼貌的')
w(1176, 'hardworking', '勤奋的')
w(1177, 'helpful', '有帮助的')
w(1178, 'clever', '聪明的')
w(1179, 'shy', '害羞的')
w(1180, 'Monday', '星期一')
w(1181, 'Tuesday', '星期二')
w(1182, 'Wednesday', '星期三')
w(1183, 'Thursday', '星期四')
w(1184, 'Friday', '星期五')
w(1185, 'Saturday', '星期六')
w(1186, 'Sunday', '星期天')
w(1187, 'weekend', '周末')
w(1188, 'wash', '洗')
w(1189, 'watch', '看')
w(1190, 'read', '读；阅读')
w(1191, 'play', '玩；播放')
w(1192, 'cook', '做饭；厨师')
w(1193, 'swim', '游泳')
w(1194, 'sleep', '睡觉')
w(1195, 'sing', '唱歌')
w(1196, 'dance', '跳舞')
w(1197, 'draw', '画画')
w(1198, 'sandwich', '三明治')
w(1199, 'salad', '沙拉')
w(1200, 'fresh', '新鲜的')
w(1201, 'healthy', '健康的')
w(1202, 'delicious', '美味的')
w(1203, 'hot', '热的；辣的')
w(1204, 'sweet', '甜的')
w(1205, 'forest', '森林')
w(1206, 'river', '河流')
w(1207, 'lake', '湖')
w(1208, 'mountain', '山')
w(1209, 'hill', '小山')
w(1210, 'bridge', '桥')
w(1211, 'village', '村庄')
w(1212, 'building', '建筑物')
w(1213, 'house', '房子')

// --- 五年级下册 (G5下) ---
w(1214, 'morning', '早上')
w(1215, 'afternoon', '下午')
w(1216, 'evening', '傍晚')
w(1217, 'spring', '春天')
w(1218, 'summer', '夏天')
w(1219, 'autumn', '秋天')
w(1220, 'winter', '冬天')
w(1221, 'season', '季节')
w(1222, 'January', '一月')
w(1223, 'February', '二月')
w(1224, 'March', '三月')
w(1225, 'April', '四月')
w(1226, 'May', '五月')
w(1227, 'June', '六月')
w(1228, 'July', '七月')
w(1229, 'August', '八月')
w(1230, 'September', '九月')
w(1231, 'October', '十月')
w(1232, 'November', '十一月')
w(1233, 'December', '十二月')
w(1234, 'date', '日期')
w(1235, 'birthday', '生日')
w(1236, 'party', '聚会')
w(1237, 'snow', '雪')
w(1238, 'rain', '雨')
w(1239, 'wind', '风')
w(1240, 'cloud', '云')
w(1241, 'sun', '太阳')
w(1242, 'moon', '月亮')
w(1243, 'star', '星星')
w(1244, 'night', '夜晚')
w(1245, 'day', '白天；天')
w(1246, 'today', '今天')
w(1247, 'tomorrow', '明天')
w(1248, 'yesterday', '昨天')

// --- 六年级上册 (G6上) ---
w(1249, 'museum', '博物馆')
w(1250, 'hospital', '医院')
w(1251, 'cinema', '电影院')
w(1252, 'post office', '邮局')
w(1253, 'bookstore', '书店')
w(1254, 'supermarket', '超市')
w(1255, 'restaurant', '餐厅')
w(1256, 'park', '公园')
w(1257, 'school', '学校')
w(1258, 'factory', '工厂')
w(1259, 'map', '地图')
w(1260, 'straight', '笔直地')
w(1261, 'left', '左')
w(1262, 'right', '右')
w(1263, 'near', '附近')
w(1264, 'next to', '紧挨着')
w(1265, 'bus driver', '公交车司机')
w(1266, 'pilot', '飞行员')
w(1267, 'nurse', '护士')
w(1268, 'doctor', '医生')
w(1269, 'farmer', '农民')
w(1270, 'worker', '工人')
w(1271, 'scientist', '科学家')
w(1272, 'policeman', '警察')
w(1273, 'fisherman', '渔民')
w(1274, 'writer', '作家')
w(1275, 'singer', '歌手')
w(1276, 'postman', '邮递员')
w(1277, 'hobby', '爱好')
w(1278, 'painting', '绘画')
w(1279, 'kung fu', '功夫')
w(1280, 'email', '电子邮件')

// --- 六年级下册 (G6下) ---
w(1281, 'taller', '更高的')
w(1282, 'shorter', '更矮的')
w(1283, 'stronger', '更强壮的')
w(1284, 'older', '年龄更大的')
w(1285, 'younger', '更年轻的')
w(1286, 'bigger', '更大的')
w(1287, 'smaller', '更小的')
w(1288, 'longer', '更长的')
w(1289, 'heavier', '更重的')
w(1290, 'thinner', '更瘦的')
w(1291, 'better', '更好的')
w(1292, 'hotel', '旅馆')
w(1293, 'beach', '海滩')
w(1294, 'island', '岛')
w(1295, 'trip', '旅行')
w(1296, 'holiday', '假期')
w(1297, 'gift', '礼物')
w(1298, 'tent', '帐篷')
w(1299, 'fishing', '钓鱼')
w(1300, 'camping', '露营')
w(1301, 'rode', '骑（ride的过去式）')
w(1302, 'went', '去（go的过去式）')
w(1303, 'saw', '看见（see的过去式）')
w(1304, 'ate', '吃（eat的过去式）')
w(1305, 'drank', '喝（drink的过去式）')
w(1306, 'took', '拍；拿（take的过去式）')
w(1307, 'bought', '买（buy的过去式）')
w(1308, 'had', '有；吃（have的过去式）')
w(1309, 'slept', '睡觉（sleep的过去式）')
w(1310, 'sang', '唱歌（sing的过去式）')
w(1311, 'danced', '跳舞（dance的过去式）')
w(1312, 'happy', '快乐的')
w(1313, 'sad', '伤心的')
w(1314, 'angry', '生气的')
w(1315, 'afraid', '害怕的')
w(1316, 'worried', '担心的')
w(1317, 'ago', '以前')
w(1318, 'excited', '兴奋的')
w(1319, 'tired', '累的')
w(1320, 'ill', '生病的')
w(1321, 'hurt', '受伤的；疼痛')
w(1322, 'gym', '体育馆')
w(1323, 'library', '图书馆')
w(1324, 'dining hall', '餐厅')
w(1325, 'grass', '草')
w(1326, 'look like', '看起来像')
w(1327, 'dream', '梦')
w(1328, 'everyone', '每个人')
w(1329, 'everything', '一切')
w(1330, 'nothing', '没有什么')
w(1331, 'future', '未来')
w(1332, 'exercise', '锻炼；练习')
w(1333, 'remember', '记住')
w(1334, 'forget', '忘记')
w(1335, 'finish', '完成；结束')
w(1336, 'begin', '开始')
w(1337, 'learn', '学习')
w(1338, 'teach', '教')
w(1339, 'call', '打电话；称呼')
w(1340, 'visit', '拜访；参观')

// ========== 导出 ==========

export const WORD_MAP = W

/**
 * 根据字典 ID 获取该字典的所有词对象
 */
export function getDictWords(dictId) {
  const dict = DICTIONARIES.find(d => d.id === dictId)
  if (!dict) return []
  return dict.wordIds.map(id => W[id]).filter(Boolean)
}

/**
 * 根据词 ID 获取所属的字典
 */
export function getWordDict(wordId) {
  for (const dict of DICTIONARIES) {
    if (dict.wordIds.includes(wordId)) return dict
  }
  return null
}

/**
 * 从 pending ID 列表中随机选一个词
 */
export function pickRandomWord(pendingIds) {
  if (!pendingIds || pendingIds.length === 0) return null
  const idx = Math.floor(Math.random() * pendingIds.length)
  const wordId = pendingIds[idx]
  return W[wordId] || null
}

/**
 * 兼容旧接口 — 所有词平铺数组
 */
export const VOCAB_LIST = Object.values(W)
// ========== 新概念英语第一册（按课次，Lesson 1-144）==========

// Lesson 1-2
w(3001, 'excuse', '原谅', 'nce1_l1')
w(3002, 'me', '我(宾格)', 'nce1_l1')
w(3003, 'yes', '是的', 'nce1_l1')
w(3004, 'is', '是(be动词)', 'nce1_l1')
w(3005, 'this', '这;这个', 'nce1_l1')
w(3006, 'your', '你的;你们的', 'nce1_l1')
w(3007, 'handbag', '女用提包', 'nce1_l1')
w(3008, 'pardon', '原谅;请再说一遍', 'nce1_l1')
w(3009, 'it', '它', 'nce1_l1')
w(3010, 'thank you', '谢谢你', 'nce1_l1')
w(3011, 'very much', '非常', 'nce1_l1')
w(6001, 'pen', '钢笔', 'nce1_l1')
w(6002, 'pencil', '铅笔', 'nce1_l1')
w(6003, 'book', '书', 'nce1_l1')
w(6004, 'watch', '手表', 'nce1_l1')
w(6005, 'coat', '上衣，外衣', 'nce1_l1')
w(6006, 'dress', '连衣裙', 'nce1_l1')
w(6007, 'skirt', '裙子', 'nce1_l1')
w(6008, 'shirt', '衬衣', 'nce1_l1')
w(6009, 'car', '小汽车', 'nce1_l1')
w(6010, 'house', '房子', 'nce1_l1')

// Lesson 3-4
w(3012, 'umbrella', '伞', 'nce1_l3')
w(3013, 'please', '请', 'nce1_l3')
w(3014, 'here', '这里', 'nce1_l3')
w(3015, 'my', '我的', 'nce1_l3')
w(3016, 'ticket', '票', 'nce1_l3')
w(3017, 'number', '号码', 'nce1_l3')
w(6011, 'five', '五', 'nce1_l3')
w(3018, 'sorry', '对不起', 'nce1_l3')
w(3019, 'sir', '先生', 'nce1_l3')
w(3020, 'cloakroom', '衣帽存放处', 'nce1_l3')
w(3021, 'suit', '一套衣服', 'nce1_l3')
w(6012, 'school', '学校', 'nce1_l3')
w(6013, 'teacher', '老师', 'nce1_l3')
w(6014, 'son', '儿子', 'nce1_l3')
w(6015, 'daughter', '女儿', 'nce1_l3')

// Lesson 5-6
w(3022, 'Mr.', '先生', 'nce1_l5')
w(3023, 'good', '好', 'nce1_l5')
w(3024, 'morning', '早晨', 'nce1_l5')
w(3025, 'Miss', '小姐', 'nce1_l5')
w(3026, 'new', '新的', 'nce1_l5')
w(3027, 'student', '学生', 'nce1_l5')
w(3028, 'French', '法国人;法语', 'nce1_l5')
w(3029, 'German', '德国人;德语', 'nce1_l5')
w(3030, 'nice', '美好的;好的', 'nce1_l5')
w(3031, 'meet', '遇见;结识', 'nce1_l5')
w(3032, 'Japanese', '日本人;日语', 'nce1_l5')
w(3033, 'Korean', '韩国人;韩语', 'nce1_l5')
w(3034, 'Chinese', '中国人;汉语', 'nce1_l5')
w(3035, 'too', '也;太', 'nce1_l5')
w(3207, 'make', '做;制作', 'nce1_l5')
w(6016, 'Swedish', '瑞典的', 'nce1_l5')
w(6017, 'English', '英国的', 'nce1_l5')
w(6018, 'American', '美国的', 'nce1_l5')
w(6019, 'Italian', '意大利的', 'nce1_l5')
w(6020, 'Volvo', '沃尔沃', 'nce1_l5')
w(6021, 'Peugeot', '标致', 'nce1_l5')
w(6022, 'Mercedes', '梅赛德斯', 'nce1_l5')
w(6023, 'Toyota', '丰田', 'nce1_l5')
w(6024, 'Daewoo', '大宇', 'nce1_l5')
w(6025, 'Mini', '迷你', 'nce1_l5')
w(6026, 'Ford', '福特', 'nce1_l5')
w(6027, 'Fiat', '菲亚特', 'nce1_l5')

// Lesson 7-8
w(6028, 'I', '我', 'nce1_l7')
w(6029, 'am', '是', 'nce1_l7')
w(3040, 'name', '名字', 'nce1_l7')
w(3041, 'what', '什么', 'nce1_l7')
w(3042, 'nationality', '国籍', 'nce1_l7')
w(3043, 'job', '工作;职业', 'nce1_l7')
w(3044, 'keyboard', '电脑键盘', 'nce1_l7')
w(3045, 'operator', '操作人员', 'nce1_l7')
w(3046, 'engineer', '工程师', 'nce1_l7')
w(3047, 'policeman', '警察', 'nce1_l7')
w(3048, 'policewoman', '女警察', 'nce1_l7')
w(3049, 'taxi driver', '出租车司机', 'nce1_l7')
w(3050, 'air hostess', '空中小姐', 'nce1_l7')
w(3051, 'postman', '邮递员', 'nce1_l7')
w(3052, 'nurse', '护士', 'nce1_l7')
w(3053, 'mechanic', '机械师', 'nce1_l7')
w(3054, 'hairdresser', '理发师', 'nce1_l7')
w(3055, 'housewife', '家庭妇女', 'nce1_l7')
w(3056, 'milkman', '送奶工', 'nce1_l7')

// Lesson 9-10
w(3036, 'hello', '喂;你好', 'nce1_l9')
w(3037, 'hi', '嗨', 'nce1_l9')
w(3038, 'how', '怎样;如何', 'nce1_l9')
w(3039, 'today', '今天', 'nce1_l9')
w(3058, 'well', '好;健康的', 'nce1_l9')
w(3059, 'fine', '美好的', 'nce1_l9')
w(3060, 'thanks', '谢谢', 'nce1_l9')
w(3061, 'goodbye', '再见', 'nce1_l9')
w(6030, 'see', '见', 'nce1_l9')
w(3057, 'how are you', '你好吗', 'nce1_l9')
w(3062, 'see you', '再见', 'nce1_l9')
w(3063, 'tomorrow', '明天', 'nce1_l9')
w(3064, 'tonight', '今晚', 'nce1_l9')
w(6031, 'fat', '胖的', 'nce1_l9')
w(6032, 'woman', '女人', 'nce1_l9')
w(6033, 'thin', '瘦的', 'nce1_l9')
w(6034, 'tall', '高的', 'nce1_l9')
w(6035, 'short', '矮的', 'nce1_l9')
w(6036, 'dirty', '脏的', 'nce1_l9')
w(3237, 'clean', '清洁的;打扫', 'nce1_l9')
w(6037, 'hot', '热的', 'nce1_l9')
w(3274, 'cold', '冷的', 'nce1_l9')
w(6038, 'old', '老的', 'nce1_l9')
w(6039, 'young', '年轻的', 'nce1_l9')
w(6040, 'busy', '忙的', 'nce1_l9')
w(6041, 'lazy', '懒的', 'nce1_l9')

// Lesson 11-12
w(3065, 'whose', '谁的', 'nce1_l11')
w(3066, 'blue', '蓝色的', 'nce1_l11')
w(3067, 'perhaps', '也许', 'nce1_l11')
w(3068, 'white', '白色的', 'nce1_l11')
w(3069, 'catch', '抓住', 'nce1_l11')
w(3077, 'purple', '紫色的', 'nce1_l11')
w(3079, 'color', '颜色', 'nce1_l11')
w(6042, 'father', '父亲', 'nce1_l11')
w(6043, 'mother', '母亲', 'nce1_l11')
w(6044, 'blouse', '女衬衫', 'nce1_l11')
w(6045, 'sister', '姐，妹', 'nce1_l11')
w(6046, 'tie', '领带', 'nce1_l11')
w(6047, 'brother', '兄，弟', 'nce1_l11')

// Lesson 13-14
w(6048, 'colour', '颜色', 'nce1_l13')
w(3073, 'green', '绿色的', 'nce1_l13')
w(3080, 'come', '来', 'nce1_l13')
w(3081, 'upstairs', '楼上', 'nce1_l13')
w(3082, 'smart', '时髦的;聪明的', 'nce1_l13')
w(3083, 'hat', '帽子', 'nce1_l13')
w(3084, 'same', '相同的', 'nce1_l13')
w(3085, 'lovely', '可爱的;秀丽的', 'nce1_l13')
w(3086, 'case', '箱子;盒子', 'nce1_l13')
w(3087, 'carpet', '地毯', 'nce1_l13')
w(3088, 'dog', '狗', 'nce1_l13')

// Lesson 15-16
w(3089, 'Customs', '海关', 'nce1_l15')
w(3090, 'officer', '官员', 'nce1_l15')
w(3091, 'girl', '女孩', 'nce1_l15')
w(6049, 'Danish', '& n. 丹麦人', 'nce1_l15')
w(3092, 'friend', '朋友', 'nce1_l15')
w(6050, 'Norwegian', '& n. 挪威人', 'nce1_l15')
w(3093, 'passport', '护照', 'nce1_l15')
w(3071, 'brown', '棕色的', 'nce1_l15')
w(3094, 'tourist', '旅游者', 'nce1_l15')
w(6051, 'Russian', '& n. 俄罗斯人', 'nce1_l15')
w(6052, 'Dutch', '& n. 荷兰人', 'nce1_l15')
w(3095, 'these', '这些', 'nce1_l15')
w(3072, 'red', '红色的', 'nce1_l15')
w(3070, 'grey', '灰色的', 'nce1_l15')
w(3074, 'yellow', '黄色的', 'nce1_l15')
w(3075, 'black', '黑色的', 'nce1_l15')
w(3076, 'orange', '橙色的;橘子', 'nce1_l15')

// Lesson 17-18
w(3096, 'employee', '雇员', 'nce1_l17')
w(6053, 'hard-working', '勤奋的', 'nce1_l17')
w(6054, 'sales reps', '推销员', 'nce1_l17')
w(3099, 'man', '男人', 'nce1_l17')
w(3100, 'office', '办公室', 'nce1_l17')
w(3101, 'assistant', '助手', 'nce1_l17')
w(3097, 'hardworking', '勤奋的', 'nce1_l17')
w(3098, 'sales rep', '推销员', 'nce1_l17')

// Lesson 19-20
w(3102, 'matter', '事情;麻烦事', 'nce1_l19')
w(3103, 'children', '孩子们', 'nce1_l19')
w(3104, 'tired', '累的;疲倦的', 'nce1_l19')
w(3105, 'boy', '男孩', 'nce1_l19')
w(3106, 'thirsty', '口渴的', 'nce1_l19')
w(6055, 'mum', '妈妈(儿语)', 'nce1_l19')
w(3107, 'sit down', '坐下', 'nce1_l19')
w(3108, 'right', '对的;正确的', 'nce1_l19')
w(3109, 'ice cream', '冰淇淋', 'nce1_l19')
w(3110, 'big', '大的', 'nce1_l19')
w(3111, 'small', '小的', 'nce1_l19')
w(3112, 'open', '开着的;打开', 'nce1_l19')
w(3113, 'shut', '关着的;关闭', 'nce1_l19')
w(3114, 'light', '轻的;灯', 'nce1_l19')
w(3115, 'heavy', '重的', 'nce1_l19')
w(3116, 'long', '长的', 'nce1_l19')
w(3117, 'shoe', '鞋子', 'nce1_l19')
w(3118, 'grandfather', '祖父;外祖父', 'nce1_l19')
w(3119, 'grandmother', '祖母;外祖母', 'nce1_l19')

// Lesson 21-22
w(3122, 'give', '给', 'nce1_l21')
w(3121, 'one', '一个', 'nce1_l21')
w(3120, 'which', '哪一个', 'nce1_l21')
w(6056, 'empty', '空的', 'nce1_l21')
w(6057, 'full', '满的', 'nce1_l21')
w(6058, 'large', '大的', 'nce1_l21')
w(3472, 'little', '小的;少的', 'nce1_l21')
w(6059, 'sharp', '尖的，锋利的', 'nce1_l21')
w(6060, 'blunt', '钝的', 'nce1_l21')
w(6061, 'box', '盒子，箱子', 'nce1_l21')
w(6062, 'glass', '杯子', 'nce1_l21')
w(6063, 'cup', '茶杯', 'nce1_l21')
w(6064, 'bottle', '瓶子', 'nce1_l21')
w(6065, 'tin', '罐头', 'nce1_l21')
w(6066, 'knife', '刀子', 'nce1_l21')
w(6067, 'fork', '叉子', 'nce1_l21')

// Lesson 23-24
w(3123, 'on', '在...上', 'nce1_l23')
w(3124, 'shelf', '架子', 'nce1_l23')
w(3125, 'desk', '书桌', 'nce1_l23')
w(3126, 'table', '桌子', 'nce1_l23')
w(3127, 'plate', '盘子', 'nce1_l23')
w(3128, 'cupboard', '碗柜', 'nce1_l23')
w(3129, 'cigarette', '香烟', 'nce1_l23')
w(3130, 'television', '电视机', 'nce1_l23')
w(3131, 'floor', '地板;楼层', 'nce1_l23')
w(3132, 'dressing table', '梳妆台', 'nce1_l23')
w(3133, 'magazine', '杂志', 'nce1_l23')
w(3134, 'bed', '床', 'nce1_l23')
w(3135, 'newspaper', '报纸', 'nce1_l23')
w(3136, 'stereo', '立体声音响', 'nce1_l23')

// Lesson 25-26
w(6068, 'Mrs.', '夫人', 'nce1_l25')
w(6069, 'kitchen', '厨房', 'nce1_l25')
w(3137, 'refrigerator', '电冰箱', 'nce1_l25')
w(3139, 'electric', '带电的', 'nce1_l25')
w(3140, 'left', '左边', 'nce1_l25')
w(3141, 'cooker', '炉子', 'nce1_l25')
w(3142, 'middle', '中间', 'nce1_l25')
w(6070, 'of', '(属于)…的', 'nce1_l25')
w(6071, 'room', '房间', 'nce1_l25')
w(6072, 'where', '在哪里', 'nce1_l25')
w(6073, 'in', '在…里', 'nce1_l25')

// Lesson 27-28
w(3150, 'living room', '客厅', 'nce1_l27')
w(3151, 'near', '靠近', 'nce1_l27')
w(3152, 'window', '窗户', 'nce1_l27')
w(3153, 'armchair', '手扶椅', 'nce1_l27')
w(3154, 'door', '门', 'nce1_l27')
w(3155, 'picture', '图画', 'nce1_l27')
w(3156, 'wall', '墙', 'nce1_l27')
w(3157, 'trousers', '裤子', 'nce1_l27')

// Lesson 29-30
w(3159, 'bedroom', '卧室', 'nce1_l29')
w(3160, 'untidy', '不整齐的', 'nce1_l29')
w(3161, 'must', '必须', 'nce1_l29')
w(3163, 'air', '空气', 'nce1_l29')
w(6074, 'put', '放置', 'nce1_l29')
w(3165, 'clothes', '衣服', 'nce1_l29')
w(3166, 'wardrobe', '大衣柜', 'nce1_l29')
w(3167, 'dust', '掸掉灰尘', 'nce1_l29')
w(3168, 'sweep', '扫', 'nce1_l29')
w(3236, 'read', '读', 'nce1_l29')
w(6075, 'sharpen', '削尖，使锋利', 'nce1_l29')
w(3164, 'put on', '穿上', 'nce1_l29')
w(6076, 'take off', '脱掉', 'nce1_l29')
w(6077, 'turn on', '开(电灯)', 'nce1_l29')
w(6078, 'turn off', '关(电灯)', 'nce1_l29')

// Lesson 31-32
w(3169, 'garden', '花园', 'nce1_l31')
w(3170, 'under', '在...下面', 'nce1_l31')
w(3171, 'tree', '树', 'nce1_l31')
w(3172, 'climb', '爬', 'nce1_l31')
w(3173, 'who', '谁', 'nce1_l31')
w(3174, 'run', '跑', 'nce1_l31')
w(3175, 'grass', '草;草地', 'nce1_l31')
w(3176, 'after', '在...之后', 'nce1_l31')
w(3177, 'cat', '猫', 'nce1_l31')
w(3178, 'typist', '打字员', 'nce1_l31')
w(6079, 'type', '打字', 'nce1_l31')
w(6080, 'letter', '信', 'nce1_l31')
w(6081, 'basket', '篮子', 'nce1_l31')
w(6082, 'eat', '吃', 'nce1_l31')
w(6083, 'bone', '骨头', 'nce1_l31')
w(6084, 'tooth', '牙齿', 'nce1_l31')
w(3239, 'cook', '做饭', 'nce1_l31')
w(3240, 'milk', '牛奶', 'nce1_l31')
w(3241, 'meal', '一餐', 'nce1_l31')
w(3242, 'drink', '喝', 'nce1_l31')
w(6085, 'tap', '(水)龙头', 'nce1_l31')

// Lesson 33-34
w(3179, 'day', '天;日', 'nce1_l33')
w(6086, 'cloud', '云', 'nce1_l33')
w(6087, 'sky', '天空', 'nce1_l33')
w(3180, 'sun', '太阳', 'nce1_l33')
w(3181, 'shine', '照耀', 'nce1_l33')
w(3182, 'with', '和...一起', 'nce1_l33')
w(3183, 'family', '家庭', 'nce1_l33')
w(3184, 'walk', '走路;散步', 'nce1_l33')
w(3185, 'over', '跨越;在...上方', 'nce1_l33')
w(3186, 'bridge', '桥', 'nce1_l33')
w(3187, 'boat', '船', 'nce1_l33')
w(3188, 'river', '河', 'nce1_l33')
w(3189, 'ship', '轮船', 'nce1_l33')
w(3190, 'aeroplane', '飞机', 'nce1_l33')
w(3419, 'fly', '飞', 'nce1_l33')
w(6088, 'sleep', '睡觉', 'nce1_l33')
w(6089, 'shave', '刮脸', 'nce1_l33')
w(6090, 'cry', '哭，喊', 'nce1_l33')
w(6091, 'wash', '洗', 'nce1_l33')
w(6092, 'wait', '等', 'nce1_l33')
w(6093, 'jump', '跳', 'nce1_l33')

// Lesson 35-36
w(6094, 'photograph', '照片', 'nce1_l35')
w(3191, 'village', '村庄', 'nce1_l35')
w(3192, 'valley', '山谷', 'nce1_l35')
w(3193, 'between', '在...之间', 'nce1_l35')
w(3194, 'hill', '小山', 'nce1_l35')
w(3195, 'another', '另一个', 'nce1_l35')
w(3196, 'wife', '妻子', 'nce1_l35')
w(3197, 'along', '沿着', 'nce1_l35')
w(3198, 'bank', '河岸', 'nce1_l35')
w(3199, 'water', '水', 'nce1_l35')
w(3200, 'swim', '游泳', 'nce1_l35')
w(3201, 'across', '穿过', 'nce1_l35')
w(3202, 'building', '建筑物', 'nce1_l35')
w(3203, 'park', '公园', 'nce1_l35')
w(3204, 'into', '进入', 'nce1_l35')
w(6095, 'beside', '在…旁', 'nce1_l35')
w(6096, 'off', '离开', 'nce1_l35')

// Lesson 37-38
w(3205, 'work', '工作', 'nce1_l37')
w(3206, 'hard', '努力地', 'nce1_l37')
w(3208, 'bookcase', '书柜', 'nce1_l37')
w(3209, 'hammer', '锤子', 'nce1_l37')
w(3210, 'paint', '油漆;绘画', 'nce1_l37')
w(3078, 'pink', '粉红色的', 'nce1_l37')
w(3212, 'favourite', '最喜欢的', 'nce1_l37')
w(6097, 'homework', '作业', 'nce1_l37')
w(6098, 'listen', '听', 'nce1_l37')
w(6099, 'dish', '盘子，碟子', 'nce1_l37')

// Lesson 39-40
w(3213, 'front', '前面', 'nce1_l39')
w(3214, 'in front of', '在...前面', 'nce1_l39')
w(3215, 'careful', '小心的', 'nce1_l39')
w(3216, 'vase', '花瓶', 'nce1_l39')
w(3217, 'drop', '掉落', 'nce1_l39')
w(3218, 'flower', '花', 'nce1_l39')
w(3219, 'show', '展示', 'nce1_l39')
w(3220, 'send', '发送', 'nce1_l39')
w(3365, 'take', '拿走;花费', 'nce1_l39')

// Lesson 41-42
w(3221, 'cheese', '奶酪', 'nce1_l41')
w(3222, 'bread', '面包', 'nce1_l41')
w(3223, 'soap', '肥皂', 'nce1_l41')
w(3224, 'chocolate', '巧克力', 'nce1_l41')
w(3225, 'sugar', '糖', 'nce1_l41')
w(3226, 'coffee', '咖啡', 'nce1_l41')
w(3227, 'tea', '茶', 'nce1_l41')
w(3228, 'tobacco', '烟草', 'nce1_l41')
w(6100, 'bird', '鸟', 'nce1_l41')
w(6101, 'any', '一些', 'nce1_l41')
w(6102, 'some', '一些', 'nce1_l41')

// Lesson 43-44
w(3143, 'of course', '当然', 'nce1_l43')
w(3144, 'kettle', '水壶', 'nce1_l43')
w(3145, 'behind', '在...后面', 'nce1_l43')
w(3146, 'teapot', '茶壶', 'nce1_l43')
w(3147, 'now', '现在', 'nce1_l43')
w(3148, 'find', '找到', 'nce1_l43')
w(3149, 'boil', '沸腾', 'nce1_l43')
w(3229, 'hurry up', '快点', 'nce1_l43')
w(3233, 'hour', '小时', 'nce1_l43')
w(3234, 'o\'clock', '...点钟', 'nce1_l43')

// Lesson 45-46
w(3230, 'can', '能;可以', 'nce1_l45')
w(3231, 'boss', '老板', 'nce1_l45')
w(3232, 'minute', '分钟', 'nce1_l45')
w(6103, 'ask', '请求，要求', 'nce1_l45')
w(6104, 'handwriting', '书写', 'nce1_l45')
w(6105, 'terrible', '糟糕的，可怕的', 'nce1_l45')
w(3238, 'teeth', '牙齿', 'nce1_l45')
w(6106, 'lift', '拿起，搬起，举起', 'nce1_l45')
w(6107, 'cake', '饼，蛋糕', 'nce1_l45')
w(6108, 'biscuit', '饼干', 'nce1_l45')

// Lesson 47-48
w(3243, 'like', '喜欢;像', 'nce1_l47')
w(3244, 'want', '想要', 'nce1_l47')
w(3245, 'fresh', '新鲜的', 'nce1_l47')
w(3246, 'egg', '鸡蛋', 'nce1_l47')
w(3247, 'butter', '黄油', 'nce1_l47')
w(3248, 'pure', '纯的', 'nce1_l47')
w(3249, 'honey', '蜂蜜', 'nce1_l47')
w(3250, 'ripe', '成熟的', 'nce1_l47')
w(3251, 'banana', '香蕉', 'nce1_l47')
w(3252, 'jam', '果酱', 'nce1_l47')
w(3253, 'sweet', '甜的', 'nce1_l47')
w(6109, 'Scotch whisky', '苏格兰威士忌', 'nce1_l47')
w(6110, 'choice', '上等的，精选的', 'nce1_l47')
w(6111, 'apple', '苹果', 'nce1_l47')
w(6112, 'wine', '酒，果酒', 'nce1_l47')
w(6113, 'beer', '啤酒', 'nce1_l47')
w(6114, 'blackboard', '黑板', 'nce1_l47')

// Lesson 49-50
w(3255, 'butcher', '屠夫', 'nce1_l49')
w(3256, 'meat', '肉', 'nce1_l49')
w(3257, 'beef', '牛肉', 'nce1_l49')
w(3258, 'lamb', '羔羊肉', 'nce1_l49')
w(3259, 'husband', '丈夫', 'nce1_l49')
w(3260, 'steak', '牛排', 'nce1_l49')
w(3261, 'mince', '肉馅', 'nce1_l49')
w(3262, 'chicken', '鸡', 'nce1_l49')
w(3263, 'tell', '告诉', 'nce1_l49')
w(3264, 'truth', '真相', 'nce1_l49')
w(3265, 'either', '也(否定句)', 'nce1_l49')
w(6115, 'tomato', '西红柿', 'nce1_l49')
w(6116, 'potato', '土豆', 'nce1_l49')
w(6117, 'cabbage', '卷心菜', 'nce1_l49')
w(6118, 'lettuce', '莴苣', 'nce1_l49')
w(6119, 'pea', '豌豆', 'nce1_l49')
w(6120, 'bean', '豆角', 'nce1_l49')
w(6121, 'pear', '梨', 'nce1_l49')
w(6122, 'grape', '葡萄', 'nce1_l49')
w(6123, 'peach', '桃', 'nce1_l49')

// Lesson 51-52
w(6124, 'Greece', '希腊', 'nce1_l51')
w(3266, 'climate', '气候', 'nce1_l51')
w(3280, 'country', '国家;乡村', 'nce1_l51')
w(3267, 'pleasant', '宜人的', 'nce1_l51')
w(3268, 'weather', '天气', 'nce1_l51')
w(3269, 'spring', '春天', 'nce1_l51')
w(6125, 'windy', '有风的', 'nce1_l51')
w(3270, 'warm', '温暖的', 'nce1_l51')
w(3271, 'rain', '下雨;雨', 'nce1_l51')
w(6126, 'sometimes', '有时', 'nce1_l51')
w(3272, 'summer', '夏天', 'nce1_l51')
w(3273, 'autumn', '秋天', 'nce1_l51')
w(3275, 'winter', '冬天', 'nce1_l51')
w(3276, 'snow', '雪', 'nce1_l51')
w(6127, 'January', '1月', 'nce1_l51')
w(6128, 'February', '2月', 'nce1_l51')
w(6129, 'March', '3月', 'nce1_l51')
w(6130, 'April', '4月', 'nce1_l51')
w(3404, 'May', '可以;可能', 'nce1_l51')
w(6131, 'June', '6月', 'nce1_l51')
w(6132, 'July', '7月', 'nce1_l51')
w(6133, 'August', '8月', 'nce1_l51')
w(6134, 'September', '9月', 'nce1_l51')
w(6135, 'October', '10月', 'nce1_l51')
w(6136, 'November', '11月', 'nce1_l51')
w(6137, 'December', '12月', 'nce1_l51')
w(6138, 'the U.S.', '美国', 'nce1_l51')
w(6139, 'Brazil', '巴西', 'nce1_l51')
w(6140, 'Holland', '荷兰', 'nce1_l51')
w(6141, 'England', '英国', 'nce1_l51')
w(6142, 'France', '法国', 'nce1_l51')
w(6143, 'Germany', '德国', 'nce1_l51')
w(6144, 'Italy', '意大利', 'nce1_l51')
w(6145, 'Norway', '挪威', 'nce1_l51')
w(6146, 'Russia', '俄罗斯', 'nce1_l51')
w(6147, 'Spain', '西班牙', 'nce1_l51')
w(6148, 'Sweden', '瑞典', 'nce1_l51')

// Lesson 53-54
w(6149, 'mild', '温和的，温暖的', 'nce1_l53')
w(6150, 'always', '总是', 'nce1_l53')
w(6151, 'north', '北方', 'nce1_l53')
w(6152, 'east', '东方', 'nce1_l53')
w(6153, 'wet', '潮湿的', 'nce1_l53')
w(6154, 'west', '西方', 'nce1_l53')
w(6155, 'south', '南方', 'nce1_l53')
w(6156, 'season', '季节', 'nce1_l53')
w(6157, 'best', '最', 'nce1_l53')
w(6158, 'night', '夜晚', 'nce1_l53')
w(6159, 'rise', '升起', 'nce1_l53')
w(6160, 'early', '早', 'nce1_l53')
w(6161, 'set', '(太阳)落下去', 'nce1_l53')
w(6162, 'late', '晚，迟', 'nce1_l53')
w(3277, 'interesting', '有趣的', 'nce1_l53')
w(3278, 'subject', '话题;科目', 'nce1_l53')
w(3279, 'conversation', '对话', 'nce1_l53')
w(3281, 'up to date', '最新的', 'nce1_l53')
w(6163, 'Australia', '澳大利亚', 'nce1_l53')
w(6164, 'Australian', '澳大利亚人', 'nce1_l53')
w(6165, 'Austria', '奥地利', 'nce1_l53')
w(6166, 'Austrian', '奥地利人', 'nce1_l53')
w(6167, 'Canada', '加拿大', 'nce1_l53')
w(6168, 'Canadian', '加拿大人', 'nce1_l53')
w(6169, 'China', '中国', 'nce1_l53')
w(6170, 'Finland', '芬兰', 'nce1_l53')
w(6171, 'Finnish', '芬兰人', 'nce1_l53')
w(6172, 'India', '印度', 'nce1_l53')
w(6173, 'Indian', '印度人', 'nce1_l53')
w(6174, 'Japan', '日本', 'nce1_l53')
w(6175, 'Nigeria', '尼日利亚', 'nce1_l53')
w(6176, 'Nigerian', '尼日利亚人', 'nce1_l53')
w(6177, 'Turkey', '土耳其', 'nce1_l53')
w(6178, 'Turkish', '土耳其人', 'nce1_l53')
w(6179, 'Korea', '韩国', 'nce1_l53')
w(6180, 'Polish', '波兰人', 'nce1_l53')
w(6181, 'Poland', '波兰', 'nce1_l53')
w(6182, 'Thai', '泰国人', 'nce1_l53')
w(6183, 'Thailand', '泰国', 'nce1_l53')

// Lesson 55-56
w(3282, 'live', '居住', 'nce1_l55')
w(3283, 'stay', '停留', 'nce1_l55')
w(3284, 'home', '家', 'nce1_l55')
w(3285, 'housework', '家务', 'nce1_l55')
w(3286, 'lunch', '午饭', 'nce1_l55')
w(3287, 'afternoon', '下午', 'nce1_l55')
w(3288, 'usually', '通常', 'nce1_l55')
w(3289, 'together', '一起', 'nce1_l55')
w(3290, 'evening', '晚上', 'nce1_l55')
w(3291, 'arrive', '到达', 'nce1_l55')

// Lesson 57-58
w(6184, 'o\'clock', '点钟', 'nce1_l57')
w(3293, 'shop', '商店', 'nce1_l57')
w(3294, 'moment', '片刻', 'nce1_l57')

// Lesson 59-60
w(3295, 'envelope', '信封', 'nce1_l59')
w(6185, 'writing paper', '信纸', 'nce1_l59')
w(6186, 'shop assistant', '售货员', 'nce1_l59')
w(3299, 'size', '尺寸;尺码', 'nce1_l59')
w(3303, 'pad', '便笺簿', 'nce1_l59')
w(3304, 'glue', '胶水', 'nce1_l59')
w(3301, 'chalk', '粉笔', 'nce1_l59')
w(3302, 'change', '零钱;改变', 'nce1_l59')
w(3300, 'collar', '衣领', 'nce1_l59')

// Lesson 61-62
w(3306, 'feel', '感觉', 'nce1_l61')
w(6187, 'look', '看(起来)', 'nce1_l61')
w(6188, 'call', '叫，请', 'nce1_l61')
w(6189, 'doctor', '医生', 'nce1_l61')
w(3296, 'telephone', '电话', 'nce1_l61')
w(6190, 'remember', '记得，记住', 'nce1_l61')
w(3495, 'mouth', '嘴', 'nce1_l61')
w(6191, 'tongue', '舌头', 'nce1_l61')
w(6192, 'bad', '坏的，严重的', 'nce1_l61')
w(6193, 'news', '消息', 'nce1_l61')
w(3307, 'headache', '头疼', 'nce1_l61')
w(6194, 'aspirin', '阿斯匹林', 'nce1_l61')
w(3308, 'earache', '耳朵疼', 'nce1_l61')
w(3309, 'toothache', '牙疼', 'nce1_l61')
w(6195, 'dentist', '牙医', 'nce1_l61')
w(3310, 'stomach ache', '胃疼', 'nce1_l61')
w(6196, 'medicine', '药', 'nce1_l61')
w(3311, 'temperature', '温度;发烧', 'nce1_l61')
w(3312, 'flu', '流感', 'nce1_l61')
w(3313, 'measles', '麻疹', 'nce1_l61')
w(3314, 'mumps', '腮腺炎', 'nce1_l61')

// Lesson 63-64
w(3315, 'better', '更好的;好转的', 'nce1_l63')
w(6197, 'certainly', '当然', 'nce1_l63')
w(6198, 'get up', '起床', 'nce1_l63')
w(3317, 'yet', '还;仍', 'nce1_l63')
w(3318, 'rich', '富的', 'nce1_l63')
w(3319, 'food', '食物', 'nce1_l63')
w(3316, 'remain', '保持;留下', 'nce1_l63')
w(3320, 'remain in bed', '卧床休息', 'nce1_l63')
w(3321, 'each', '每个', 'nce1_l63')
w(6199, 'play', '玩', 'nce1_l63')
w(3549, 'match', '比赛', 'nce1_l63')
w(6200, 'talk', '谈话', 'nce1_l63')
w(6201, 'library', '图书馆', 'nce1_l63')
w(6202, 'drive', '开车', 'nce1_l63')
w(6203, 'so', '如此地', 'nce1_l63')
w(6204, 'quickly', '快地', 'nce1_l63')
w(6205, 'lean out of', '身体探出', 'nce1_l63')
w(6206, 'break', '打破', 'nce1_l63')

// Lesson 65-66
w(6207, 'Dad', '爸(儿语)', 'nce1_l65')
w(3324, 'key', '钥匙', 'nce1_l65')
w(3323, 'baby', '婴儿', 'nce1_l65')
w(3325, 'hear', '听见', 'nce1_l65')
w(3326, 'enjoy', '享受', 'nce1_l65')
w(3327, 'yourself', '你自己', 'nce1_l65')
w(6208, 'ourselves', '我们自己', 'nce1_l65')
w(3328, 'myself', '我自己', 'nce1_l65')
w(6209, 'themselves', '他们自己', 'nce1_l65')
w(6210, 'himself', '他自己', 'nce1_l65')
w(6211, 'herself', '她自己', 'nce1_l65')

// Lesson 67-68
w(6212, 'greengrocer', '蔬菜水果零售商', 'nce1_l67')
w(6213, 'absent', '缺席的', 'nce1_l67')
w(3351, 'Monday', '星期一', 'nce1_l67')
w(3352, 'Tuesday', '星期二', 'nce1_l67')
w(3353, 'Wednesday', '星期三', 'nce1_l67')
w(3354, 'Thursday', '星期四', 'nce1_l67')
w(3370, 'keep', '保持;保留', 'nce1_l67')
w(6214, 'spend', '度过', 'nce1_l67')
w(3329, 'weekend', '周末', 'nce1_l67')
w(3355, 'Friday', '星期五', 'nce1_l67')
w(3356, 'Saturday', '星期六', 'nce1_l67')
w(3357, 'Sunday', '星期日', 'nce1_l67')
w(6215, 'lucky', '幸运的', 'nce1_l67')
w(3335, 'stationer', '文具商', 'nce1_l67')
w(3336, 'weekday', '工作日', 'nce1_l67')
w(3331, 'church', '教堂', 'nce1_l67')
w(3332, 'dairy', '乳品店', 'nce1_l67')
w(3333, 'baker', '面包师', 'nce1_l67')
w(3334, 'grocer', '食品商', 'nce1_l67')

// Lesson 69-70
w(3337, 'year', '年', 'nce1_l69')
w(3338, 'race', '比赛', 'nce1_l69')
w(3339, 'town', '城镇', 'nce1_l69')
w(3340, 'crowd', '人群', 'nce1_l69')
w(3341, 'stand', '站立;看台', 'nce1_l69')
w(3342, 'exciting', '令人兴奋的', 'nce1_l69')
w(6216, 'just', '正好，恰好', 'nce1_l69')
w(6217, 'finish', '结尾，结束', 'nce1_l69')
w(6218, 'winner', '获胜者', 'nce1_l69')
w(6219, 'way', '路途', 'nce1_l69')
w(3343, 'on the way', '在路上', 'nce1_l69')

// Lesson 71-72
w(3344, 'awful', '糟糕的', 'nce1_l71')
w(6220, 'time', '次(数)', 'nce1_l71')
w(6221, 'answer', '接(电话)', 'nce1_l71')
w(6222, 'last', '最后的，前一次的', 'nce1_l71')
w(6223, 'phone', '电话(=telephone)', 'nce1_l71')
w(3347, 'again', '再次', 'nce1_l71')
w(3348, 'say', '说', 'nce1_l71')
w(3349, 'punctual', '准时的', 'nce1_l71')

// Lesson 73-74
w(3350, 'week', '周', 'nce1_l73')
w(6224, 'London', '伦敦', 'nce1_l73')
w(6225, 'suddenly', '突然地', 'nce1_l73')
w(6226, 'bus stop', '公共汽车车站', 'nce1_l73')
w(6227, 'smile', '微笑', 'nce1_l73')
w(6228, 'pleasantly', '愉快地', 'nce1_l73')
w(6229, 'understand', '懂，明白', 'nce1_l73')
w(6230, 'speak', '讲，说', 'nce1_l73')
w(3366, 'hand', '手;交给', 'nce1_l73')
w(6231, 'pocket', '衣袋', 'nce1_l73')
w(6232, 'phrasebook  n.', '短语手册，常用语手册', 'nce1_l73')
w(6233, 'phrase', '短语', 'nce1_l73')
w(6234, 'slowly', '缓慢地', 'nce1_l73')
w(3358, 'museum', '博物馆', 'nce1_l73')
w(6235, 'hurriedly', '匆忙地', 'nce1_l73')
w(6236, 'cut', '割，切', 'nce1_l73')
w(6237, 'thirstily', '口渴地', 'nce1_l73')
w(6238, 'go', '走', 'nce1_l73')
w(6239, 'greet', '问候，找招呼', 'nce1_l73')

// Lesson 75-76
w(6240, 'ago', '以前', 'nce1_l75')
w(6241, 'buy', '买', 'nce1_l75')
w(6242, 'pair', '双，对', 'nce1_l75')
w(6243, 'fashion', '(服装的)流行式样', 'nce1_l75')
w(3361, 'uncomfortable', '不舒服的', 'nce1_l75')
w(6244, 'wear', '穿着', 'nce1_l75')
w(3362, 'airport', '机场', 'nce1_l75')
w(3363, 'pilgrimage', '朝圣', 'nce1_l75')

// Lesson 77-78
w(3367, 'appointment', '约会', 'nce1_l77')
w(3368, 'urgent', '紧急的', 'nce1_l77')
w(3369, 'till', '直到', 'nce1_l77')
w(3371, 'distance', '距离', 'nce1_l77')

// Lesson 79-80
w(6245, 'shopping', '购物', 'nce1_l79')
w(3375, 'list', '清单', 'nce1_l79')
w(6246, 'vegetable', '蔬菜', 'nce1_l79')
w(3374, 'need', '需要', 'nce1_l79')
w(6247, 'hope', '希望', 'nce1_l79')
w(6248, 'thing', '事情', 'nce1_l79')
w(6249, 'money', '钱', 'nce1_l79')
w(3373, 'groceries', '食品;杂货', 'nce1_l79')
w(3372, 'fruit', '水果', 'nce1_l79')
w(3376, 'stationery', '文具', 'nce1_l79')
w(3377, 'newsagent', '报刊经销商', 'nce1_l79')
w(3378, 'chemist', '化学家;药剂师', 'nce1_l79')

// Lesson 81-82
w(3379, 'bath', '洗澡', 'nce1_l81')
w(3380, 'nearly', '几乎', 'nce1_l81')
w(3381, 'ready', '准备好的', 'nce1_l81')
w(3382, 'dinner', '正餐;晚餐', 'nce1_l81')
w(3383, 'restaurant', '餐馆', 'nce1_l81')
w(3384, 'roast', '烤的', 'nce1_l81')
w(6250, 'breakfast', '早饭', 'nce1_l81')
w(6251, 'haircut', '理发', 'nce1_l81')
w(6252, 'party', '聚会', 'nce1_l81')
w(6253, 'holiday', '假日', 'nce1_l81')

// Lesson 83-84
w(3386, 'mess', '杂乱', 'nce1_l83')
w(3387, 'pack', '打包', 'nce1_l83')
w(3388, 'suitcase', '手提箱', 'nce1_l83')
w(3389, 'leave', '离开;留下', 'nce1_l83')
w(3390, 'already', '已经', 'nce1_l83')

// Lesson 85-86
w(3391, 'Paris', '巴黎', 'nce1_l85')
w(3392, 'cinema', '电影院', 'nce1_l85')
w(3393, 'film', '电影;胶卷', 'nce1_l85')
w(3394, 'beautiful', '美丽的', 'nce1_l85')
w(3360, 'city', '城市', 'nce1_l85')
w(3396, 'never', '从不', 'nce1_l85')
w(3397, 'ever', '曾经', 'nce1_l85')

// Lesson 87-88
w(3398, 'attendant', '服务员', 'nce1_l87')
w(3364, 'bring', '带来', 'nce1_l87')
w(3399, 'garage', '车库;加油站', 'nce1_l87')
w(3400, 'crash', '碰撞', 'nce1_l87')
w(6254, 'lamp-post', '灯杆', 'nce1_l87')
w(3401, 'repair', '修理', 'nce1_l87')
w(3402, 'try', '尝试', 'nce1_l87')

// Lesson 89-90
w(3403, 'believe', '相信', 'nce1_l89')
w(3407, 'how long', '多久', 'nce1_l89')
w(3408, 'since', '自从', 'nce1_l89')
w(3409, 'why', '为什么', 'nce1_l89')
w(3305, 'sell', '卖', 'nce1_l89')
w(3411, 'because', '因为', 'nce1_l89')
w(6255, 'retire', '退休', 'nce1_l89')
w(6256, 'cost', '花费', 'nce1_l89')
w(3443, 'pound', '英镑;磅', 'nce1_l89')
w(6257, 'worth', '值…钱', 'nce1_l89')
w(6258, 'penny', '便士', 'nce1_l89')

// Lesson 91-92
w(3322, 'still', '仍然', 'nce1_l91')
w(3413, 'move', '移动;搬家', 'nce1_l91')
w(6259, 'neighbour', '邻居', 'nce1_l91')
w(3416, 'person', '人', 'nce1_l91')
w(3417, 'people', '人们', 'nce1_l91')
w(6260, 'poor', '可怜的', 'nce1_l91')
w(3415, 'neighbor', '邻居', 'nce1_l91')

// Lesson 93-94
w(3418, 'pilot', '飞行员', 'nce1_l93')
w(3420, 'return', '返回', 'nce1_l93')
w(6261, 'New York', '纽约', 'nce1_l93')
w(3421, 'Tokyo', '东京', 'nce1_l93')
w(6262, 'Madrid', '马德里', 'nce1_l93')
w(3426, 'Mumbai', '孟买', 'nce1_l93')
w(6263, 'Athens', '雅典', 'nce1_l93')
w(3422, 'Berlin', '柏林', 'nce1_l93')
w(6264, 'Bombay', '孟买', 'nce1_l93')
w(6265, 'Geneva', '日内瓦', 'nce1_l93')
w(3423, 'Moscow', '莫斯科', 'nce1_l93')
w(3424, 'Rome', '罗马', 'nce1_l93')
w(3425, 'Seoul', '首尔', 'nce1_l93')
w(6266, 'Stockholm', '斯德哥尔摩', 'nce1_l93')
w(6267, 'Sydney', '悉尼', 'nce1_l93')

// Lesson 95-96
w(3428, 'train', '火车', 'nce1_l95')
w(3429, 'platform', '月台', 'nce1_l95')
w(3430, 'plenty', '大量', 'nce1_l95')
w(3385, 'bar', '酒吧', 'nce1_l95')
w(3432, 'station', '车站', 'nce1_l95')

// Lesson 97-98
w(3436, 'describe', '描述', 'nce1_l97')
w(3437, 'zip', '拉链', 'nce1_l97')
w(3438, 'label', '标签', 'nce1_l97')
w(3439, 'handle', '把手', 'nce1_l97')
w(3440, 'address', '地址', 'nce1_l97')
w(6268, 'pence', 'penny的复数形式', 'nce1_l97')
w(3441, 'belong', '属于', 'nce1_l97')
w(3442, 'owe', '欠', 'nce1_l97')

// Lesson 99-100
w(6269, 'ow', '哎哟', 'nce1_l99')
w(6270, 'slip', '滑倒，滑了一脚', 'nce1_l99')
w(6271, 'fall', '落下，跌倒', 'nce1_l99')
w(6272, 'downstairs', '下楼', 'nce1_l99')
w(6273, 'hurt', '伤，伤害，疼痛', 'nce1_l99')
w(6274, 'back', '背', 'nce1_l99')
w(6275, 'stand up', '起立，站起来', 'nce1_l99')
w(6276, 'help', '帮助', 'nce1_l99')
w(6277, 'at once', '立即', 'nce1_l99')
w(6278, 'sure', '一定的，确信的', 'nce1_l99')
w(6279, 'X-ray', 'X光透视', 'nce1_l99')

// Lesson 101-102
w(3448, 'Scotland', '苏格兰', 'nce1_l101')
w(3449, 'card', '卡片', 'nce1_l101')
w(3450, 'youth', '青年', 'nce1_l101')
w(3451, 'hostel', '招待所', 'nce1_l101')
w(3452, 'association', '协会', 'nce1_l101')
w(3453, 'soon', '很快', 'nce1_l101')
w(3297, 'write', '写', 'nce1_l101')

// Lesson 103-104
w(3454, 'exam', '考试', 'nce1_l103')
w(3455, 'pass', '通过', 'nce1_l103')
w(6280, 'mathematics', '数学', 'nce1_l103')
w(3457, 'question', '问题', 'nce1_l103')
w(3458, 'easy', '容易的', 'nce1_l103')
w(3459, 'enough', '足够的', 'nce1_l103')
w(3460, 'paper', '纸;论文', 'nce1_l103')
w(6281, 'fail', '未及格，失败', 'nce1_l103')
w(6282, 'mark', '分数', 'nce1_l103')
w(6283, 'rest', '其他的东西', 'nce1_l103')
w(6284, 'difficult', '困难的', 'nce1_l103')
w(6285, 'hate', '讨厌', 'nce1_l103')
w(6286, 'low', '低的', 'nce1_l103')
w(6287, 'cheer', '振作，振奋', 'nce1_l103')
w(6288, 'guy', '家伙，人', 'nce1_l103')
w(6289, 'top', '上方，顶部', 'nce1_l103')
w(3456, 'maths', '数学', 'nce1_l103')
w(6290, 'clever', '聪明的', 'nce1_l103')
w(6291, 'stupid', '笨的', 'nce1_l103')
w(6292, 'cheap', '便宜的', 'nce1_l103')
w(3482, 'expensive', '贵的', 'nce1_l103')
w(6293, 'stale', '变馊的', 'nce1_l103')
w(6294, 'loud', '大声的', 'nce1_l103')
w(6295, 'high', '高的', 'nce1_l103')
w(6296, 'soft', '软的', 'nce1_l103')
w(6297, 'sour', '酸的', 'nce1_l103')

// Lesson 105-106
w(3461, 'spell', '拼写', 'nce1_l105')
w(3462, 'intelligent', '聪明的', 'nce1_l105')
w(3463, 'mistake', '错误', 'nce1_l105')
w(3464, 'present', '礼物;现在的', 'nce1_l105')
w(3465, 'dictionary', '字典', 'nce1_l105')
w(6298, 'carry', '携带', 'nce1_l105')
w(6299, 'correct', '改正，纠正', 'nce1_l105')

// Lesson 107-108
w(3466, 'madam', '夫人;女士', 'nce1_l107')
w(6300, 'as well', '同样', 'nce1_l107')
w(3469, 'pretty', '漂亮的', 'nce1_l107')
w(3470, 'foreign', '外国的', 'nce1_l107')

// Lesson 109-110
w(3471, 'idea', '主意', 'nce1_l109')
w(3475, 'a little', '一点', 'nce1_l109')
w(3473, 'teaspoonful', '一茶匙的量', 'nce1_l109')
w(3474, 'less', '更少的', 'nce1_l109')
w(3476, 'a few', '一些', 'nce1_l109')
w(6301, 'pity', '遗憾', 'nce1_l109')
w(6302, 'instead', '代替', 'nce1_l109')
w(6303, 'advice', '建议，忠告', 'nce1_l109')
w(6304, 'most', '(many,much的最高级)最多的', 'nce1_l109')
w(6305, 'least', '(little的最高级)最小的，最少的', 'nce1_l109')
w(6306, 'worse', '(bad的比较级)更坏的', 'nce1_l109')
w(6307, 'worst', '(bad的最高级)最坏的', 'nce1_l109')

// Lesson 111-112
w(3477, 'model', '模型;模特', 'nce1_l111')
w(3478, 'afford', '负担得起', 'nce1_l111')
w(3479, 'deposit', '定金;存款', 'nce1_l111')
w(3480, 'instalment', '分期付款', 'nce1_l111')
w(3481, 'price', '价格', 'nce1_l111')
w(6308, 'millionaire', '百万富翁', 'nce1_l111')

// Lesson 113-114
w(3483, 'conductor', '售票员', 'nce1_l113')
w(3484, 'fare', '车费', 'nce1_l113')
w(3446, 'note', '钞票;笔记', 'nce1_l113')
w(3487, 'passenger', '乘客', 'nce1_l113')
w(6309, 'none', '没有任何东西', 'nce1_l113')
w(6310, 'neither', '也不', 'nce1_l113')
w(6311, 'get off', '下车', 'nce1_l113')
w(6312, 'tramp', '流浪汉', 'nce1_l113')
w(6313, 'except', '除…外', 'nce1_l113')

// Lesson 115-116
w(3488, 'anyone', '任何人', 'nce1_l115')
w(3489, 'knock', '敲', 'nce1_l115')
w(3490, 'everything', '每件事', 'nce1_l115')
w(3491, 'quiet', '安静的', 'nce1_l115')
w(3492, 'impossible', '不可能的', 'nce1_l115')
w(6314, 'invite', '邀请', 'nce1_l115')
w(6315, 'anything', '任何东西', 'nce1_l115')
w(6316, 'nothing', '什么也没有', 'nce1_l115')
w(6317, 'lemonade', '柠檬水', 'nce1_l115')
w(6318, 'joke', '开玩笑', 'nce1_l115')
w(6319, 'asleep', '睡觉，睡着(用作表语)', 'nce1_l115')
w(6320, 'glasses', '眼镜', 'nce1_l115')

// Lesson 117-118
w(3493, 'dining room', '餐厅', 'nce1_l117')
w(3494, 'coin', '硬币', 'nce1_l117')
w(3496, 'swallow', '吞下', 'nce1_l117')
w(3497, 'later', '后来', 'nce1_l117')
w(3498, 'toilet', '厕所', 'nce1_l117')
w(3346, 'ring', '打电话;铃声', 'nce1_l117')

// Lesson 119-120
w(3499, 'story', '故事', 'nce1_l119')
w(3500, 'happen', '发生', 'nce1_l119')
w(3501, 'thief', '小偷', 'nce1_l119')
w(3502, 'enter', '进入', 'nce1_l119')
w(3503, 'dark', '黑暗的', 'nce1_l119')
w(3504, 'torch', '手电筒', 'nce1_l119')
w(6321, 'voice', '(说话的)声音', 'nce1_l119')
w(6322, 'parrot', '鹦鹉', 'nce1_l119')
w(3505, 'shout', '喊叫', 'nce1_l119')
w(3506, 'purse', '钱包', 'nce1_l119')
w(6323, 'exercise book', '练习本', 'nce1_l119')

// Lesson 121-122
w(3507, 'customer', '顾客', 'nce1_l121')
w(3508, 'forget', '忘记', 'nce1_l121')
w(3509, 'manager', '经理', 'nce1_l121')
w(3510, 'serve', '服务', 'nce1_l121')
w(3511, 'counter', '柜台', 'nce1_l121')
w(3512, 'recognize', '认出', 'nce1_l121')
w(6324, 'road', '路', 'nce1_l121')

// Lesson 123-124
w(6325, 'during', '在…期间', 'nce1_l123')
w(3513, 'trip', '旅行', 'nce1_l123')
w(3514, 'travel', '旅行', 'nce1_l123')
w(6326, 'offer', '提供', 'nce1_l123')
w(6327, 'guess', '猜', 'nce1_l123')
w(6328, 'grow', '长，让…生长', 'nce1_l123')
w(6329, 'beard', '(下巴上的)胡子，络腮胡子', 'nce1_l123')
w(3515, 'travel agent', '旅行代理人', 'nce1_l123')
w(3519, 'sympathetic', '有同情心的', 'nce1_l123')
w(6330, 'kitten', '小猫', 'nce1_l123')

// Lesson 125-126
w(6331, 'terribly', '非常', 'nce1_l125')
w(6332, 'dry', '干燥的，干的', 'nce1_l125')
w(6333, 'nuisance', '讨厌的东西或人', 'nce1_l125')
w(6334, 'mean', '意味着，意思是', 'nce1_l125')
w(6335, 'surprise', '惊奇，意外的事', 'nce1_l125')
w(3520, 'complain', '抱怨', 'nce1_l125')
w(3521, 'wicked', '邪恶的', 'nce1_l125')
w(3522, 'contain', '包含', 'nce1_l125')
w(3523, 'honesty', '诚实', 'nce1_l125')
w(6336, 'immediately', '立即地', 'nce1_l125')

// Lesson 127-128
w(3359, 'famous', '著名的', 'nce1_l127')
w(3525, 'actress', '女演员', 'nce1_l127')
w(3526, 'at least', '至少', 'nce1_l127')
w(3527, 'actor', '男演员', 'nce1_l127')
w(3528, 'forty', '四十', 'nce1_l127')

// Lesson 129-130
w(6337, 'wave', '招手', 'nce1_l129')
w(6338, 'track', '跑道', 'nce1_l129')
w(3531, 'mile', '英里', 'nce1_l129')
w(6339, 'overtake', '从后面超越，超车', 'nce1_l129')
w(6340, 'speed', '限速', 'nce1_l129')
w(6341, 'dream', '做梦，思想不集中', 'nce1_l129')
w(6342, 'sign', '标记，牌子', 'nce1_l129')
w(6343, 'driving licence', '驾驶执照', 'nce1_l129')
w(6344, 'charge', '罚款', 'nce1_l129')
w(6345, 'darling', '亲爱的(用作表示称呼)', 'nce1_l129')
w(3530, 'reach', '达到', 'nce1_l129')

// Lesson 131-132
w(3532, 'Egypt', '埃及', 'nce1_l131')
w(3517, 'abroad', '国外', 'nce1_l131')
w(3534, 'worry', '担心', 'nce1_l131')
w(3535, 'contain', '包含', 'nce1_l131')

// Lesson 133-134
w(3538, 'reporter', '记者', 'nce1_l133')
w(3537, 'sensational', '轰动的', 'nce1_l133')
w(3539, 'mink coat', '貂皮大衣', 'nce1_l133')
w(3540, 'have been', '已经', 'nce1_l133')
w(3542, 'have gone', '已经去', 'nce1_l133')

// Lesson 135-136
w(3543, 'future', '未来', 'nce1_l135')
w(3544, 'get married', '结婚', 'nce1_l135')
w(6346, 'hotel', '饭店', 'nce1_l135')
w(6347, 'latest', '最新的', 'nce1_l135')
w(6348, 'introduce', '介绍', 'nce1_l135')

// Lesson 137-138
w(3545, 'football', '足球', 'nce1_l137')
w(3546, 'pool', '池', 'nce1_l137')
w(3547, 'win', '赢', 'nce1_l137')
w(3548, 'world', '世界', 'nce1_l137')
w(6349, 'depend', '依靠(on)', 'nce1_l137')

// Lesson 139-140
w(3550, 'extra', '额外的', 'nce1_l139')
w(3551, 'overseas', '海外的', 'nce1_l139')
w(3552, 'engineering', '工程', 'nce1_l139')
w(3553, 'company', '公司', 'nce1_l139')
w(3554, 'line', '线路', 'nce1_l139')

// Lesson 141-142
w(3555, 'excited', '兴奋的', 'nce1_l141')
w(3556, 'get on', '上车', 'nce1_l141')
w(3557, 'middle-aged', '中年的', 'nce1_l141')
w(3558, 'opposite', '对面的', 'nce1_l141')
w(3559, 'curiously', '好奇地', 'nce1_l141')
w(3560, 'funny', '有趣的', 'nce1_l141')
w(6350, 'powder', '香粉', 'nce1_l141')
w(6351, 'compact', '带镜的化妆盒', 'nce1_l141')
w(6352, 'kindly', '和蔼地', 'nce1_l141')
w(6353, 'ugly', '丑陋的', 'nce1_l141')
w(6354, 'amused', '有趣的', 'nce1_l141')
w(6355, 'embarrassed', '尴尬的，窘迫的', 'nce1_l141')
w(6356, 'worried', '担心，担忧', 'nce1_l141')
w(6357, 'regularly', '经常地，定期地', 'nce1_l141')

// Lesson 143-144
w(3561, 'surround', '包围', 'nce1_l143')
w(3562, 'wood', '树林', 'nce1_l143')
w(3563, 'beauty spot', '风景区', 'nce1_l143')
w(3445, 'hundred', '百', 'nce1_l143')
w(3566, 'through', '穿过', 'nce1_l143')
w(3567, 'visitor', '游客', 'nce1_l143')
w(6358, 'tidy', '整齐的', 'nce1_l143')
w(6359, 'litter', '杂乱的东西', 'nce1_l143')
w(6360, 'litter basket', '废物筐', 'nce1_l143')
w(6361, 'place', '放', 'nce1_l143')
w(6362, 'throw', '扔，抛', 'nce1_l143')
w(6363, 'rubbish', '垃圾', 'nce1_l143')
w(6364, 'count', '数，点', 'nce1_l143')
w(6365, 'cover', '覆盖', 'nce1_l143')
w(6366, 'piece', '碎片', 'nce1_l143')
w(6367, 'tyre', '轮胎', 'nce1_l143')
w(6368, 'rusty', '生锈的', 'nce1_l143')
w(6369, 'among', '在…之间', 'nce1_l143')
w(6370, 'prosecute', '依法处置', 'nce1_l143')

w(3568, 'private', '私人的')
w(3569, 'public', '公共的')
w(3570, 'pleasure', '愉快')
w(3571, 'woods', '树林')
w(3572, 'beautiful', '美丽的')
w(3573, 'clear', '清晰的')
w(3574, 'never', '从不')
w(3575, 'ever', '曾经')
w(3576, 'cut', '切;割')
w(3577, 'finger', '手指')
w(3578, 'fail', '失败')
w(3579, 'save', '救;节省')
w(3580, 'pass', '通过;传递')
w(3581, 'holiday', '假期')
w(3582, 'village', '村庄')
w(3583, 'mouth', '嘴')
w(3584, 'swallow', '吞下')
w(3585, 'later', '后来')
w(3586, 'toilet', '厕所')
w(3587, 'cold', '冷的;感冒')
w(3588, 'fever', '发烧')
w(3589, 'cough', '咳嗽')
w(3590, 'headache', '头疼')
w(3591, 'earache', '耳朵疼')
w(3592, 'toothache', '牙疼')
w(3593, 'stomach ache', '胃疼')
w(3594, 'temperature', '温度;发烧')
w(3595, 'flu', '流感')
w(3596, 'measles', '麻疹')
w(3597, 'mumps', '腮腺炎')
w(3598, 'group', '组;群')
w(3599, 'pop singer', '流行歌手')
w(3600, 'club', '俱乐部')
w(3601, 'performance', '表演')
w(3602, 'occasion', '场合')
w(3603, 'obvious', '明显的')
w(3604, 'difference', '不同')
w(3605, 'carry', '携带;搬运')
w(3606, 'appear', '出现')
w(3607, 'stage', '舞台')
w(3608, 'bright', '明亮的')
w(3609, 'stocking', '长筒袜')
w(3610, 'sock', '短袜')
w(3611, 'hole', '洞')
w(3612, 'repair', '修理')
w(3613, 'try', '尝试')
w(3614, 'believe', '相信')
w(3615, 'may', '可以;可能')
w(3616, 'dream', '梦;梦想')
w(3617, 'age', '年龄;时代')
w(3618, 'channel', '频道;海峡')
w(3619, 'throw', '扔;投掷')
w(3620, 'rush', '冲;匆忙')
w(3621, 'pole', '杆;极')
w(3622, 'race', '比赛')
w(3623, 'train', '火车;训练')
w(3624, 'platform', '月台')
w(3625, 'plenty', '大量')
w(3626, 'English', '英国的;英语')
w(3627, 'reporter', '记者')
w(3628, 'sensational', '轰动的')
w(3629, 'mink coat', '貂皮大衣')
w(3630, 'have been', '已经')
w(3631, 'have gone', '已经去')
w(3632, 'future', '未来')
w(3633, 'get married', '结婚')
w(3634, 'land', '着陆;土地')
w(3635, 'lonely', '孤独的')
w(3636, 'roof', '屋顶')
w(3637, 'block', '块;街区')
w(3638, 'flat', '公寓;平坦的')
w(3639, 'shelf', '架子')
w(3640, 'desk', '书桌')
w(3641, 'table', '桌子')
w(3642, 'plate', '盘子')
w(3643, 'cupboard', '碗柜')
w(3644, 'dark', '黑暗的')
w(3645, 'torch', '手电筒')
w(3646, 'shout', '喊叫')
w(3647, 'purse', '钱包')
w(3648, 'thief', '小偷')
w(3649, 'enter', '进入')
w(3650, 'happen', '发生')
w(3651, 'story', '故事')
w(3652, 'customer', '顾客')
w(3653, 'forget', '忘记')
w(3654, 'manager', '经理')
w(3655, 'serve', '服务')
w(3656, 'counter', '柜台')
w(3657, 'recognize', '认出')
w(3658, 'trip', '旅行')
w(3659, 'travel', '旅行')
w(3660, 'travel agent', '旅行代理人')
w(3661, 'exciting', '令人兴奋的')
w(3662, 'abroad', '国外')
w(3663, 'water', '水')
w(3664, 'sympathetic', '有同情心的')
w(3665, 'complain', '抱怨')
w(3666, 'wicked', '邪恶的')
w(3667, 'contain', '包含')
w(3668, 'honesty', '诚实')
w(3669, 'famous', '著名的')
w(3670, 'actress', '女演员')
w(3671, 'at least', '至少')
w(3672, 'actor', '男演员')
w(3673, 'forty', '四十')
w(3674, 'over', '超过')
w(3675, 'reach', '达到')
w(3676, 'mile', '英里')
w(3677, 'Egypt', '埃及')
w(3678, 'abroad', '国外')
w(3679, 'worry', '担心')
w(3680, 'temperature', '温度')
w(3681, 'football', '足球')
w(3682, 'pool', '池')
w(3683, 'win', '赢')
w(3684, 'world', '世界')
w(3685, 'match', '比赛')
w(3686, 'extra', '额外的')
w(3687, 'overseas', '海外的')
w(3688, 'engineering', '工程')
w(3689, 'company', '公司')
w(3690, 'line', '线路')
w(3691, 'excited', '兴奋的')
w(3692, 'get on', '上车')
w(3693, 'middle-aged', '中年的')
w(3694, 'opposite', '对面的')
w(3695, 'curiously', '好奇地')
w(3696, 'funny', '有趣的')
w(3697, 'surround', '包围')
w(3698, 'wood', '树林')
w(3699, 'beauty spot', '风景区')
w(3700, 'hundred', '百')
w(3701, 'city', '城市')
w(3702, 'through', '穿过')
w(3703, 'visitor', '游客')
w(3704, 'madam', '夫人;女士')
w(3705, 'smart', '聪明的;时髦的')
w(3706, 'suit', '适合;一套衣服')
w(3707, 'pretty', '漂亮的')
w(3708, 'foreign', '外国的')
w(3709, 'idea', '主意')
w(3710, 'little', '小的;少的')
w(3711, 'teaspoonful', '一茶匙的量')
w(3712, 'less', '更少的')
w(3713, 'a little', '一点')
w(3714, 'a few', '一些')
w(3715, 'model', '模型;模特')
w(3716, 'afford', '负担得起')
w(3717, 'deposit', '定金;存款')
w(3718, 'instalment', '分期付款')
w(3719, 'price', '价格')
w(3720, 'expensive', '贵的')
w(3721, 'conductor', '售票员')
w(3722, 'fare', '车费')
w(3723, 'change', '零钱;改变')
w(3724, 'note', '钞票')
w(3725, 'passenger', '乘客')
w(3726, 'anyone', '任何人')
w(3727, 'knock', '敲')
w(3728, 'everything', '每件事')
w(3729, 'quiet', '安静的')
w(3730, 'impossible', '不可能的')
w(3731, 'dining room', '餐厅')
w(3732, 'coin', '硬币')
w(3733, 'mouth', '嘴')
w(3734, 'swallow', '吞下')
w(3735, 'later', '后来')
w(3736, 'toilet', '厕所')
w(3737, 'story', '故事')
w(3738, 'happen', '发生')
w(3739, 'thief', '小偷')
w(3740, 'enter', '进入')
w(3741, 'dark', '黑暗的')
w(3742, 'torch', '手电筒')
w(3743, 'shout', '喊叫')
w(3744, 'purse', '钱包')
w(3745, 'customer', '顾客')
w(3746, 'forget', '忘记')
w(3747, 'manager', '经理')
w(3748, 'serve', '服务')
w(3749, 'counter', '柜台')
w(3750, 'recognize', '认出')
w(3751, 'trip', '旅行')
w(3752, 'travel', '旅行')
w(3753, 'travel agent', '旅行代理人')
w(3754, 'exciting', '令人兴奋的')
w(3755, 'abroad', '国外')
w(3756, 'water', '水')
w(3757, 'sympathetic', '有同情心的')
w(3758, 'complain', '抱怨')
w(3759, 'wicked', '邪恶的')
w(3760, 'contain', '包含')
w(3761, 'honesty', '诚实')
w(3762, 'famous', '著名的')
w(3763, 'actress', '女演员')
w(3764, 'at least', '至少')
w(3765, 'actor', '男演员')
w(3766, 'forty', '四十')
w(3767, 'over', '超过')
w(3768, 'reach', '达到')
w(3769, 'mile', '英里')
w(3770, 'Egypt', '埃及')
w(3771, 'abroad', '国外')
w(3772, 'worry', '担心')
w(3773, 'contain', '包含')
w(3774, 'temperature', '温度')
w(3775, 'sensational', '轰动的')
w(3776, 'reporter', '记者')
w(3777, 'mink coat', '貂皮大衣')
w(3778, 'have been', '已经')
w(3779, 'have gone', '已经去')
w(3780, 'future', '未来')
w(3781, 'get married', '结婚')
w(3782, 'football', '足球')
w(3783, 'pool', '池')
w(3784, 'win', '赢')
w(3785, 'world', '世界')
w(3786, 'match', '比赛')
w(3787, 'extra', '额外的')
w(3788, 'overseas', '海外的')
w(3789, 'engineering', '工程')
w(3790, 'company', '公司')
w(3791, 'line', '线路')
w(3792, 'excited', '兴奋的')
w(3793, 'get on', '上车')
w(3794, 'middle-aged', '中年的')
w(3795, 'opposite', '对面的')
w(3796, 'curiously', '好奇地')
w(3797, 'funny', '有趣的')
w(3798, 'surround', '包围')
w(3799, 'wood', '树林')
w(3800, 'beauty spot', '风景区')
w(3801, 'hundred', '百')
w(3802, 'city', '城市')
w(3803, 'through', '穿过')
w(3804, 'visitor', '游客')
w(3805, 'park', '公园')
w(3806, 'traffic', '交通')
w(3807, 'accident', '事故')
w(3808, 'get up', '起床')
w(3809, 'busy', '忙的')
w(3810, 'wait', '等待')
w(3811, 'serve', '服务')
w(3812, 'study', '学习;研究')
w(3813, 'open', '打开;开着的')
w(3814, 'close', '关闭;近的')
w(3815, 'walk', '走路;散步')
w(3816, 'drive', '开车')
w(3817, 'sit', '坐')
w(3818, 'stand', '站;站立')
w(3819, 'lie', '躺;说谎')
w(3820, 'sleep', '睡觉')
w(3821, 'wake', '醒来')
w(3822, 'eat', '吃')
w(3823, 'drink', '喝')
w(3824, 'cook', '做饭')
w(3825, 'wash', '洗')
w(3826, 'clean', '清洁的;打扫')
w(3827, 'read', '读')
w(3828, 'write', '写')
w(3829, 'speak', '说')
w(3830, 'listen', '听')
w(3831, 'look', '看')
w(3832, 'watch', '观看')
w(3833, 'hear', '听见')
w(3834, 'smell', '闻')
w(3835, 'taste', '尝')
w(3836, 'touch', '触摸')
w(3837, 'feel', '感觉')
w(3838, 'think', '想;认为')
w(3839, 'know', '知道')
w(3840, 'understand', '理解')
w(3841, 'remember', '记住')
w(3842, 'forget', '忘记')
w(3843, 'learn', '学习')
w(3844, 'teach', '教')
w(3845, 'help', '帮助')
w(3846, 'give', '给')
w(3847, 'take', '拿走;花费')
w(3848, 'bring', '带来')
w(3849, 'buy', '买')
w(3850, 'sell', '卖')
w(3851, 'pay', '支付')
w(3852, 'cost', '花费')
w(3853, 'spend', '花费;度过')
w(3854, 'save', '节省;救')
w(3855, 'waste', '浪费')
w(3856, 'find', '找到')
w(3857, 'lose', '丢失')
w(3858, 'break', '打破')
w(3859, 'fix', '修理')
w(3860, 'change', '改变;零钱')
w(3861, 'turn', '转动;变成')
w(3862, 'become', '变成')
w(3863, 'get', '得到;变得')
w(3864, 'go', '去')
w(3865, 'come', '来')
w(3866, 'leave', '离开')
w(3867, 'arrive', '到达')
w(3868, 'travel', '旅行')
w(3869, 'fly', '飞')
w(3870, 'swim', '游泳')
w(3871, 'run', '跑')
w(3872, 'walk', '走路')
w(3873, 'jump', '跳')
w(3874, 'climb', '爬')
w(3875, 'fall', '落下;跌倒')
w(3876, 'hurt', '伤害')
w(3877, 'cut', '切;割')
w(3878, 'burn', '燃烧;烫伤')
w(3879, 'hit', '打;撞击')
w(3880, 'kick', '踢')
w(3881, 'catch', '抓住')
w(3882, 'throw', '扔')
w(3883, 'pull', '拉')
w(3884, 'push', '推')
w(3885, 'open', '打开')
w(3886, 'close', '关闭')
w(3887, 'turn on', '打开(电器)')
w(3888, 'turn off', '关闭(电器)')
w(3889, 'put', '放')
w(3890, 'take off', '脱掉;起飞')
w(3891, 'put on', '穿上')
w(3892, 'hang', '悬挂')
w(3893, 'drop', '掉落')
w(3894, 'fill', '装满')
w(3895, 'empty', '倒空')
w(3896, 'clean', '清洁')
w(3897, 'dirty', '脏的')
w(3898, 'new', '新的')
w(3899, 'old', '旧的;老的')
w(3900, 'young', '年轻的')
w(3901, 'big', '大的')
w(3902, 'small', '小的')
w(3903, 'long', '长的')
w(3904, 'short', '短的;矮的')
w(3905, 'tall', '高的')
w(3906, 'high', '高的')
w(3907, 'low', '低的')
w(3908, 'wide', '宽的')
w(3909, 'narrow', '窄的')
w(3910, 'thick', '厚的')
w(3911, 'thin', '薄的;瘦的')
w(3912, 'heavy', '重的')
w(3913, 'light', '轻的;灯')
w(3914, 'fast', '快的')
w(3915, 'slow', '慢的')
w(3916, 'early', '早的')
w(3917, 'late', '晚的;迟的')
w(3918, 'hot', '热的')
w(3919, 'cold', '冷的')
w(3920, 'warm', '温暖的')
w(3921, 'cool', '凉爽的')
w(3922, 'dry', '干的')
w(3923, 'wet', '湿的')
w(3924, 'hard', '硬的;困难的')
w(3925, 'soft', '软的')
w(3926, 'strong', '强壮的')
w(3927, 'weak', '弱的')
w(3928, 'rich', '富的')
w(3929, 'poor', '穷的')
w(3930, 'busy', '忙的')
w(3931, 'free', '自由的;免费的')
w(3932, 'easy', '容易的')
w(3933, 'difficult', '困难的')
w(3934, 'interesting', '有趣的')
w(3935, 'boring', '无聊的')
w(3936, 'funny', '有趣的')
w(3937, 'serious', '严肃的')
w(3938, 'happy', '快乐的')
w(3939, 'sad', '悲伤的')
w(3940, 'angry', '生气的')
w(3941, 'tired', '累的')
w(3942, 'excited', '兴奋的')
w(3943, 'nervous', '紧张的')
w(3944, 'afraid', '害怕的')
w(3945, 'surprised', '惊讶的')
w(3946, 'good', '好的')
w(3947, 'bad', '坏的')
w(3948, 'beautiful', '美丽的')
w(3949, 'ugly', '丑的')
w(3950, 'clean', '清洁的')
w(3951, 'dirty', '脏的')
w(3952, 'right', '对的')
w(3953, 'wrong', '错的')
w(3954, 'true', '真的')
w(3955, 'false', '假的')
w(3956, 'same', '相同的')
w(3957, 'different', '不同的')
w(3958, 'many', '许多')
w(3959, 'much', '许多')
w(3960, 'some', '一些')
w(3961, 'any', '任何')
w(3962, 'no', '没有')
w(3963, 'all', '所有')
w(3964, 'both', '两者都')
w(3965, 'each', '每个')
w(3966, 'every', '每一个')
w(3967, 'other', '其他的')
w(3968, 'another', '另一个')
w(3969, 'such', '这样的')
w(3970, 'only', '只有')
w(3971, 'also', '也')
w(3972, 'too', '也')
w(3973, 'very', '非常')
w(3974, 'really', '真的')
w(3975, 'quite', '相当')
w(3976, 'still', '仍然')
w(3977, 'yet', '还')
w(3978, 'already', '已经')
w(3979, 'just', '刚刚')
w(3980, 'ever', '曾经')
w(3981, 'never', '从不')
w(3982, 'often', '经常')
w(3983, 'usually', '通常')
w(3984, 'sometimes', '有时')
w(3985, 'always', '总是')
w(3986, 'here', '这里')
w(3987, 'there', '那里')
w(3988, 'where', '哪里')
w(3989, 'when', '什么时候')
w(3990, 'why', '为什么')
w(3991, 'how', '怎样')
w(3992, 'who', '谁')
w(3993, 'what', '什么')
w(3994, 'which', '哪一个')
w(3995, 'that', '那个')
w(3996, 'this', '这个')
w(3997, 'these', '这些')
w(3998, 'those', '那些')
w(3999, 'my', '我的')
w(4000, 'your', '你的')
w(4001, 'his', '他的')
w(4002, 'her', '她的')
w(4003, 'its', '它的')
w(4004, 'our', '我们的')
w(4005, 'their', '他们的')
w(4006, 'me', '我(宾格)')
w(4007, 'you', '你;你们')
w(4008, 'him', '他(宾格)')
w(4009, 'her', '她(宾格)')
w(4010, 'it', '它')
w(4011, 'us', '我们(宾格)')
w(4012, 'them', '他们(宾格)')
w(4013, 'I', '我')
w(4014, 'you', '你;你们')
w(4015, 'he', '他')
w(4016, 'she', '她')
w(4017, 'it', '它')
w(4018, 'we', '我们')
w(4019, 'they', '他们')
w(4020, 'am', '是(be动词)')
w(4021, 'is', '是(be动词)')
w(4022, 'are', '是(be动词)')
w(4023, 'was', '是(be动词过去式)')
w(4024, 'were', '是(be动词过去式)')
w(4025, 'be', '是;成为')
w(4026, 'been', '已经(be动词过去分词)')
w(4027, 'being', '正在(be动词现在分词)')
w(4028, 'have', '有;已经')
w(4029, 'has', '有(第三人称单数)')
w(4030, 'had', '有(过去式)')
w(4031, 'do', '做')
w(4032, 'does', '做(第三人称单数)')
w(4033, 'did', '做(过去式)')
w(4034, 'done', '做(过去分词)')
w(4035, 'doing', '做(现在分词)')
w(4036, 'say', '说')
w(4037, 'said', '说(过去式)')
w(4038, 'go', '去')
w(4039, 'went', '去(过去式)')
w(4040, 'gone', '去(过去分词)')
w(4041, 'going', '去(现在分词)')
w(4042, 'come', '来')
w(4043, 'came', '来(过去式)')
w(4044, 'come', '来(过去分词)')
w(4045, 'coming', '来(现在分词)')
w(4046, 'see', '看见')
w(4047, 'saw', '看见(过去式)')
w(4048, 'seen', '看见(过去分词)')
w(4049, 'seeing', '看见(现在分词)')
w(4050, 'look', '看')
w(4051, 'looked', '看(过去式)')
w(4052, 'looked', '看(过去分词)')
w(4053, 'looking', '看(现在分词)')
w(4054, 'watch', '观看')
w(4055, 'watched', '观看(过去式)')
w(4056, 'watched', '观看(过去分词)')
w(4057, 'watching', '观看(现在分词)')
w(4058, 'listen', '听')
w(4059, 'listened', '听(过去式)')
w(4060, 'listened', '听(过去分词)')
w(4061, 'listening', '听(现在分词)')
w(4062, 'hear', '听见')
w(4063, 'heard', '听见(过去式)')
w(4064, 'heard', '听见(过去分词)')
w(4065, 'hearing', '听见(现在分词)')
w(4066, 'eat', '吃')
w(4067, 'ate', '吃(过去式)')
w(4068, 'eaten', '吃(过去分词)')
w(4069, 'eating', '吃(现在分词)')
w(4070, 'drink', '喝')
w(4071, 'drank', '喝(过去式)')
w(4072, 'drunk', '喝(过去分词)')
w(4073, 'drinking', '喝(现在分词)')
w(4074, 'sleep', '睡觉')
w(4075, 'slept', '睡觉(过去式)')
w(4076, 'slept', '睡觉(过去分词)')
w(4077, 'sleeping', '睡觉(现在分词)')
w(4078, 'wake', '醒来')
w(4079, 'woke', '醒来(过去式)')
w(4080, 'woken', '醒来(过去分词)')
w(4081, 'waking', '醒来(现在分词)')
w(4082, 'read', '读')
w(4083, 'read', '读(过去式)')
w(4084, 'read', '读(过去分词)')
w(4085, 'reading', '读(现在分词)')
w(4086, 'write', '写')
w(4087, 'wrote', '写(过去式)')
w(4088, 'written', '写(过去分词)')
w(4089, 'writing', '写(现在分词)')
w(4090, 'speak', '说')
w(4091, 'spoke', '说(过去式)')
w(4092, 'spoken', '说(过去分词)')
w(4093, 'speaking', '说(现在分词)')
w(4094, 'tell', '告诉')
w(4095, 'told', '告诉(过去式)')
w(4096, 'told', '告诉(过去分词)')
w(4097, 'telling', '告诉(现在分词)')
w(4098, 'ask', '问')
w(4099, 'asked', '问(过去式)')
w(4100, 'asked', '问(过去分词)')
w(4101, 'asking', '问(现在分词)')
w(4102, 'answer', '回答')
w(4103, 'answered', '回答(过去式)')
w(4104, 'answered', '回答(过去分词)')
w(4105, 'answering', '回答(现在分词)')
w(4106, 'know', '知道')
w(4107, 'knew', '知道(过去式)')
w(4108, 'known', '知道(过去分词)')
w(4109, 'knowing', '知道(现在分词)')
w(4110, 'think', '想;认为')
w(4111, 'thought', '想(过去式)')
w(4112, 'thought', '想(过去分词)')
w(4113, 'thinking', '想(现在分词)')
w(4114, 'understand', '理解')
w(4115, 'understood', '理解(过去式)')
w(4116, 'understood', '理解(过去分词)')
w(4117, 'understanding', '理解(现在分词)')
w(4118, 'learn', '学习')
w(4119, 'learned', '学习(过去式)')
w(4120, 'learned', '学习(过去分词)')
w(4121, 'learning', '学习(现在分词)')
w(4122, 'teach', '教')
w(4123, 'taught', '教(过去式)')
w(4124, 'taught', '教(过去分词)')
w(4125, 'teaching', '教(现在分词)')
w(4126, 'help', '帮助')
w(4127, 'helped', '帮助(过去式)')
w(4128, 'helped', '帮助(过去分词)')
w(4129, 'helping', '帮助(现在分词)')
w(4130, 'give', '给')
w(4131, 'gave', '给(过去式)')
w(4132, 'given', '给(过去分词)')
w(4133, 'giving', '给(现在分词)')
w(4134, 'take', '拿走;花费')
w(4135, 'took', '拿走(过去式)')
w(4136, 'taken', '拿走(过去分词)')
w(4137, 'taking', '拿走(现在分词)')
w(4138, 'bring', '带来')
w(4139, 'brought', '带来(过去式)')
w(4140, 'brought', '带来(过去分词)')
w(4141, 'bringing', '带来(现在分词)')
w(4142, 'buy', '买')
w(4143, 'bought', '买(过去式)')
w(4144, 'bought', '买(过去分词)')
w(4145, 'buying', '买(现在分词)')
w(4146, 'sell', '卖')
w(4147, 'sold', '卖(过去式)')
w(4148, 'sold', '卖(过去分词)')
w(4149, 'selling', '卖(现在分词)')
w(4150, 'pay', '支付')
w(4151, 'paid', '支付(过去式)')
w(4152, 'paid', '支付(过去分词)')
w(4153, 'paying', '支付(现在分词)')
w(4154, 'get', '得到;变得')
w(4155, 'got', '得到(过去式)')
w(4156, 'got', '得到(过去分词)')
w(4157, 'getting', '得到(现在分词)')
w(4158, 'go', '去')
w(4159, 'went', '去(过去式)')
w(4160, 'gone', '去(过去分词)')
w(4161, 'going', '去(现在分词)')
w(4162, 'come', '来')
w(4163, 'came', '来(过去式)')
w(4164, 'come', '来(过去分词)')
w(4165, 'coming', '来(现在分词)')
w(4166, 'leave', '离开')
w(4167, 'left', '离开(过去式)')
w(4168, 'left', '离开(过去分词)')
w(4169, 'leaving', '离开(现在分词)')
w(4170, 'arrive', '到达')
w(4171, 'arrived', '到达(过去式)')
w(4172, 'arrived', '到达(过去分词)')
w(4173, 'arriving', '到达(现在分词)')
w(4174, 'travel', '旅行')
w(4175, 'traveled', '旅行(过去式)')
w(4176, 'traveled', '旅行(过去分词)')
w(4177, 'traveling', '旅行(现在分词)')
w(4178, 'fly', '飞')
w(4179, 'flew', '飞(过去式)')
w(4180, 'flown', '飞(过去分词)')
w(4181, 'flying', '飞(现在分词)')
w(4182, 'swim', '游泳')
w(4183, 'swam', '游泳(过去式)')
w(4184, 'swum', '游泳(过去分词)')
w(4185, 'swimming', '游泳(现在分词)')
w(4186, 'run', '跑')
w(4187, 'ran', '跑(过去式)')
w(4188, 'run', '跑(过去分词)')
w(4189, 'running', '跑(现在分词)')
w(4190, 'walk', '走路')
w(4191, 'walked', '走路(过去式)')
w(4192, 'walked', '走路(过去分词)')
w(4193, 'walking', '走路(现在分词)')
w(4194, 'jump', '跳')
w(4195, 'jumped', '跳(过去式)')
w(4196, 'jumped', '跳(过去分词)')
w(4197, 'jumping', '跳(现在分词)')
w(4198, 'climb', '爬')
w(4199, 'climbed', '爬(过去式)')
w(4200, 'climbed', '爬(过去分词)')
w(4201, 'climbing', '爬(现在分词)')
w(4202, 'hello', '你好')
w(4203, 'hi', '嗨')
w(4204, 'goodbye', '再见')
w(4205, 'bye', '再见')
w(4206, 'morning', '早晨')
w(4207, 'afternoon', '下午')
w(4208, 'evening', '晚上')
w(4209, 'night', '夜晚')
w(4210, 'apple', '苹果')
w(4211, 'banana', '香蕉')
w(4212, 'pear', '梨')
w(4213, 'orange', '橙子')
w(4214, 'peach', '桃子')
w(4215, 'grape', '葡萄')
w(4216, 'watermelon', '西瓜')
w(4217, 'pineapple', '菠萝')
w(4218, 'mango', '芒果')
w(4219, 'lemon', '柠檬')
w(4220, 'coconut', '椰子')
w(4221, 'cat', '猫')
w(4222, 'dog', '狗')
w(4223, 'rabbit', '兔子')
w(4224, 'bird', '鸟')
w(4225, 'fish', '鱼')
w(4226, 'frog', '青蛙')
w(4227, 'monkey', '猴子')
w(4228, 'panda', '熊猫')
w(4229, 'bear', '熊')
w(4230, 'tiger', '老虎')
w(4231, 'lion', '狮子')
w(4232, 'elephant', '大象')
w(4233, 'pig', '猪')
w(4234, 'cow', '牛')
w(4235, 'sheep', '绵羊')
w(4236, 'horse', '马')
w(4237, 'duck', '鸭子')
w(4238, 'chicken', '鸡')
w(4239, 'book', '书')
w(4240, 'pen', '钢笔')
w(4241, 'pencil', '铅笔')
w(4242, 'ruler', '尺子')
w(4243, 'eraser', '橡皮')
w(4244, 'bag', '书包')
w(4245, 'desk', '书桌')
w(4246, 'chair', '椅子')
w(4247, 'window', '窗户')
w(4248, 'door', '门')
w(4249, 'floor', '地板')
w(4250, 'wall', '墙')
w(4251, 'room', '房间')
w(4252, 'house', '房子')
w(4253, 'garden', '花园')
w(4254, 'school', '学校')
w(4255, 'classroom', '教室')
w(4256, 'playground', '操场')
w(4257, 'library', '图书馆')
w(4258, 'toilet', '厕所')
w(4259, 'red', '红色的')
w(4260, 'blue', '蓝色的')
w(4261, 'yellow', '黄色的')
w(4262, 'green', '绿色的')
w(4263, 'black', '黑色的')
w(4264, 'white', '白色的')
w(4265, 'pink', '粉红色的')
w(4266, 'purple', '紫色的')
w(4267, 'orange', '橙色的')
w(4268, 'brown', '棕色的')
w(4269, 'grey', '灰色的')
w(4270, 'color', '颜色')
w(4271, 'draw', '画画')
w(4272, 'paint', '油漆;绘画')
w(4273, 'paper', '纸')
w(4274, 'scissors', '剪刀')
w(4275, 'glue', '胶水')
w(4276, 'one', '一')
w(4277, 'two', '二')
w(4278, 'three', '三')
w(4279, 'four', '四')
w(4280, 'five', '五')
w(4281, 'six', '六')
w(4282, 'seven', '七')
w(4283, 'eight', '八')
w(4284, 'nine', '九')
w(4285, 'ten', '十')
w(4286, 'eleven', '十一')
w(4287, 'twelve', '十二')
w(4288, 'thirteen', '十三')
w(4289, 'fourteen', '十四')
w(4290, 'fifteen', '十五')
w(4291, 'sixteen', '十六')
w(4292, 'seventeen', '十七')
w(4293, 'eighteen', '十八')
w(4294, 'nineteen', '十九')
w(4295, 'twenty', '二十')
w(4296, 'thirty', '三十')
w(4297, 'forty', '四十')
w(4298, 'fifty', '五十')
w(4299, 'sixty', '六十')
w(4300, 'seventy', '七十')
w(4301, 'eighty', '八十')
w(4302, 'ninety', '九十')
w(4303, 'hundred', '百')
w(4304, 'father', '父亲')
w(4305, 'mother', '母亲')
w(4306, 'brother', '兄弟')
w(4307, 'sister', '姐妹')
w(4308, 'son', '儿子')
w(4309, 'daughter', '女儿')
w(4310, 'grandfather', '祖父;外祖父')
w(4311, 'grandmother', '祖母;外祖母')
w(4312, 'uncle', '叔叔;舅舅')
w(4313, 'aunt', '阿姨;姑姑')
w(4314, 'cousin', '堂兄弟姐妹')
w(4315, 'family', '家庭')
w(4316, 'parent', '父母')
w(4317, 'child', '孩子')
w(4318, 'baby', '婴儿')
w(4319, 'boy', '男孩')
w(4320, 'girl', '女孩')
w(4321, 'man', '男人')
w(4322, 'woman', '女人')
w(4323, 'head', '头')
w(4324, 'face', '脸')
w(4325, 'eye', '眼睛')
w(4326, 'nose', '鼻子')
w(4327, 'mouth', '嘴')
w(4328, 'ear', '耳朵')
w(4329, 'hand', '手')
w(4330, 'arm', '手臂')
w(4331, 'leg', '腿')
w(4332, 'foot', '脚')
w(4333, 'body', '身体')
w(4334, 'hair', '头发')
w(4335, 'happy', '快乐的')
w(4336, 'sad', '悲伤的')
w(4337, 'angry', '生气的')
w(4338, 'tired', '累的')
w(4339, 'hungry', '饿的')
w(4340, 'thirsty', '口渴的')
w(4341, 'hot', '热的')
w(4342, 'cold', '冷的')
w(4343, 'Monday', '星期一')
w(4344, 'Tuesday', '星期二')
w(4345, 'Wednesday', '星期三')
w(4346, 'Thursday', '星期四')
w(4347, 'Friday', '星期五')
w(4348, 'Saturday', '星期六')
w(4349, 'Sunday', '星期日')
w(4350, 'week', '周')
w(4351, 'month', '月')
w(4352, 'year', '年')
w(4353, 'spring', '春天')
w(4354, 'summer', '夏天')
w(4355, 'autumn', '秋天')
w(4356, 'winter', '冬天')
w(4357, 'warm', '温暖的')
w(4358, 'hot', '热的')
w(4359, 'cool', '凉爽的')
w(4360, 'cold', '冷的')
w(4361, 'rain', '雨')
w(4362, 'snow', '雪')
w(4363, 'wind', '风')
w(4364, 'cloud', '云')
w(4365, 'chinese', '语文;中国人')
w(4366, 'maths', '数学')
w(4367, 'english', '英语')
w(4368, 'music', '音乐')
w(4369, 'art', '美术')
w(4370, 'PE', '体育')
w(4371, 'science', '科学')
w(4372, 'history', '历史')
w(4373, 'geography', '地理')
w(4374, 'biology', '生物')
w(4375, 'physics', '物理')
w(4376, 'chemistry', '化学')
w(4377, 'computer', '电脑')
w(4378, 'lesson', '课')
w(4379, 'class', '班级;课')
w(4380, 'homework', '家庭作业')
w(4381, 'exam', '考试')
w(4382, 'grade', '成绩;年级')
w(4383, 'teacher', '老师')
w(4384, 'student', '学生')
w(4385, 'classmate', '同学')
w(4386, 'food', '食物')
w(4387, 'rice', '米饭')
w(4388, 'noodle', '面条')
w(4389, 'bread', '面包')
w(4390, 'meat', '肉')
w(4391, 'fish', '鱼')
w(4392, 'chicken', '鸡肉')
w(4393, 'egg', '鸡蛋')
w(4394, 'milk', '牛奶')
w(4395, 'water', '水')
w(4396, 'juice', '果汁')
w(4397, 'tea', '茶')
w(4398, 'coffee', '咖啡')
w(4399, 'cake', '蛋糕')
w(4400, 'candy', '糖果')
w(4401, 'sweet', '甜的')
w(4402, 'delicious', '美味的')
w(4403, 'hungry', '饿的')
w(4404, 'China', '中国')
w(4405, 'Chinese', '中国人;汉语')
w(4406, 'America', '美国')
w(4407, 'American', '美国人;英语')
w(4408, 'England', '英国')
w(4409, 'English', '英国人;英语')
w(4410, 'Japan', '日本')
w(4411, 'Japanese', '日本人;日语')
w(4412, 'Korea', '韩国')
w(4413, 'Korean', '韩国人;韩语')
w(4414, 'France', '法国')
w(4415, 'French', '法国人;法语')
w(4416, 'Germany', '德国')
w(4417, 'German', '德国人;德语')
w(4418, 'Russia', '俄国')
w(4419, 'Russian', '俄国人;俄语')
w(4420, 'Australia', '澳大利亚')
w(4421, 'Australian', '澳大利亚人')
w(4422, 'Canada', '加拿大')
w(4423, 'Canadian', '加拿大人')
w(4424, 'doctor', '医生')
w(4425, 'nurse', '护士')
w(4426, 'teacher', '老师')
w(4427, 'student', '学生')
w(4428, 'driver', '司机')
w(4429, 'farmer', '农民')
w(4430, 'worker', '工人')
w(4431, 'cook', '厨师')
w(4432, 'police', '警察')
w(4433, 'fireman', '消防员')
w(4434, 'postman', '邮递员')
w(4435, 'seller', '售货员')
w(4436, 'cleaner', '清洁工')
w(4437, 'actor', '男演员')
w(4438, 'actress', '女演员')
w(4439, 'singer', '歌手')
w(4440, 'dancer', '舞蹈家')
w(4441, 'writer', '作家')
w(4442, 'artist', '艺术家')
w(4443, 'musician', '音乐家')
w(4444, 'scientist', '科学家')
w(4445, 'inventor', '发明家')
w(4446, 'schoolbag', '书包')
w(4447, 'pencil box', '铅笔盒')
w(4448, 'crayon', '蜡笔')
w(4449, 'marker', '记号笔')
w(4450, 'notebook', '笔记本')
w(4451, 'storybook', '故事书')
w(4452, 'dictionary', '字典')
w(4453, 'ruler', '尺子')
w(4454, 'sharpener', '卷笔刀')
w(4455, 'glue stick', '胶棒')
w(4456, 'scissors', '剪刀')
w(4457, 'tape', '胶带')
w(4458, 'Paper', '纸')
w(4459, 'card', '卡片')
w(4460, 'gift', '礼物')
w(4461, 'toy', '玩具')
w(4462, 'doll', '洋娃娃')
w(4463, 'ball', '球')
w(4464, 'kite', '风筝')
w(4465, 'bicycle', '自行车')
w(4466, 'bus', '公共汽车')
w(4467, 'car', '小汽车')
w(4468, 'train', '火车')
w(4469, 'plane', '飞机')
w(4470, 'ship', '轮船')
w(4471, 'boat', '小船')
w(4472, 'taxi', '出租车')
w(4473, 'subway', '地铁')
w(4474, 'motorcycle', '摩托车')
w(4475, 'truck', '卡车')
w(4476, 'hospital', '医院')
w(4477, 'clinic', '诊所')
w(4478, 'pharmacy', '药店')
w(4479, 'supermarket', '超市')
w(4480, 'shop', '商店')
w(4481, 'restaurant', '餐馆')
w(4482, 'hotel', '旅馆')
w(4483, 'park', '公园')
w(4484, 'zoo', '动物园')
w(4485, 'cinema', '电影院')
w(4486, 'museum', '博物馆')
w(4487, 'library', '图书馆')
w(4488, 'bookstore', '书店')
w(4489, 'post office', '邮局')
w(4490, 'bank', '银行')
w(4491, 'police station', '警察局')
w(4492, 'fire station', '消防站')
w(4493, 'bus stop', '公共汽车站')
w(4494, 'train station', '火车站')
w(4495, 'airport', '机场')
w(4496, 'port', '港口')
w(4497, 'go to school', '去上学')
w(4498, 'go home', '回家')
w(4499, 'go to bed', '去睡觉')
w(4500, 'get up', '起床')
w(4501, 'have breakfast', '吃早餐')
w(4502, 'have lunch', '吃午饭')
w(4503, 'have dinner', '吃晚饭')
w(4504, 'play games', '玩游戏')
w(4505, 'watch TV', '看电视')
w(4506, 'listen to music', '听音乐')
w(4507, 'read books', '读书')
w(4508, 'draw pictures', '画画')
w(4509, 'sing songs', '唱歌')
w(4510, 'dance', '跳舞')
w(4511, 'swim', '游泳')
w(4512, 'run', '跑步')
w(4513, 'jump', '跳')
w(4514, 'walk', '走路')
w(4515, 'ride a bike', '骑自行车')
w(4516, 'fly a kite', '放风筝')
w(4517, 'play football', '踢足球')
w(4518, 'play basketball', '打篮球')
w(4519, 'play piano', '弹钢琴')
w(4520, 'play guitar', '弹吉他')

// ========== 古诗词（112首）==========
// 小学生必背古诗词 75+80
p(5001, '采薇（节选）', '诗经·小雅', '昔我往矣，杨柳依依。\n今我来思，雨雪霏霏。\n行道迟迟，载渴载饥。\n我心伤悲，莫知我哀。')

p(5002, '迢迢牵牛星', '古诗十九首', '迢迢牵牛星，皎皎河汉女。\n纤纤擢素手，札札弄机杼。\n终日不成章，泣涕零如雨。\n河汉清且浅，相去复几许。\n盈盈一水间，脉脉不得语。')

p(5003, '江南', '汉乐府', '江南可采莲，莲叶何田田。\n鱼戏莲叶间。\n鱼戏莲叶东，鱼戏莲叶西，\n鱼戏莲叶南，鱼戏莲叶北。')

p(5004, '长歌行', '汉乐府', '青青园中葵，朝露待日晞。\n阳春布德泽，万物生光辉。\n常恐秋节至，焜黄华叶衰。\n百川东到海，何时复西归？\n少壮不努力，老大徒伤悲！')

p(5005, '敕勒歌', '北朝民歌', '敕勒川，阴山下，\n天似穹庐，笼盖四野。\n天苍苍，野茫茫，风吹草低见牛羊。')

p(5006, '咏鹅', '唐·骆宾王', '鹅，鹅，鹅，曲项向天歌。\n白毛浮绿水，红掌拨清波。')

p(5007, '风', '唐·李峤', '解落三秋叶，能开二月花。\n过江千尺浪，入竹万竿斜。')

p(5008, '咏柳', '唐·贺知章', '碧玉妆成一树高，万条垂下绿丝绦。\n不知细叶谁裁出，二月春风似剪刀。')

p(5009, '回乡偶书', '唐·贺知章', '少小离家老大回，乡音无改鬓毛衰。\n儿童相见不相识，笑问客从何处来。')

p(5010, '登鹳雀楼', '唐·王之涣', '白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。')

p(5011, '凉州词', '唐·王翰', '葡萄美酒夜光杯，欲饮琵琶马上催。\n醉卧沙场君莫笑，古来征战几人回？')

p(5012, '春晓', '唐·孟浩然', '春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。')

p(5013, '宿建德江', '唐·孟浩然', '移舟泊烟渚，日暮客愁新。\n野旷天低树，江清月近人。')

p(5014, '凉州词', '唐·王之涣', '黄河远上白云间，一片孤城万仞山。\n羌笛何须怨杨柳，春风不度玉门关。')

p(5015, '过故人庄', '唐·孟浩然', '故人具鸡黍，邀我至田家。\n绿树村边合，青山郭外斜。\n开轩面场圃，把酒话桑麻。\n待到重阳日，还来就菊花。')

p(5016, '出塞', '唐·王昌龄', '秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。')

p(5017, '从军行', '唐·王昌龄', '青海长云暗雪山，孤城遥望玉门关。\n黄沙百战穿金甲，不破楼兰终不还。')

p(5018, '芙蓉楼送辛渐', '唐·王昌龄', '寒雨连江夜入吴，平明送客楚山孤。\n洛阳亲友如相问，一片冰心在玉壶。')

p(5019, '鹿柴', '唐·王维', '空山不见人，但闻人语响。\n返景入深林，复照青苔上。')

p(5020, '竹里馆', '唐·王维', '独坐幽篁里，弹琴复长啸。\n深林人不知，明月来相照。')

p(5021, '送元二使安西', '唐·王维', '渭城朝雨浥轻尘，客舍青青柳色新。\n劝君更尽一杯酒，西出阳关无故人。')

p(5022, '九月九日忆山东兄弟', '唐·王维', '独在异乡为异客，每逢佳节倍思亲。\n遥知兄弟登高处，遍插茱萸少一人。')

p(5023, '鸟鸣涧', '唐·王维', '人闲桂花落，夜静春山空。\n月出惊山鸟，时鸣春涧中。')

p(5024, '送别', '唐·王维', '山中相送罢，日暮掩柴扉。\n春草明年绿，王孙归不归？')

p(5025, '静夜思', '唐·李白', '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。')

p(5026, '古朗月行（节选）', '唐·李白', '小时不识月，呼作白玉盘。\n又疑瑶台镜，飞在青云端。')

p(5027, '望庐山瀑布', '唐·李白', '日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。')

p(5028, '赠汪伦', '唐·李白', '李白乘舟将欲行，忽闻岸上踏歌声。\n桃花潭水深千尺，不及汪伦送我情。')

p(5029, '独坐敬亭山', '唐·李白', '众鸟高飞尽，孤云独去闲。\n相看两不厌，只有敬亭山。')

p(5030, '黄鹤楼送孟浩然之广陵', '唐·李白', '故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧空尽，唯见长江天际流。')

p(5031, '早发白帝城', '唐·李白', '朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。')

p(5032, '望天门山', '唐·李白', '天门中断楚江开，碧水东流至此回。\n两岸青山相对出，孤帆一片日边来。')

p(5033, '别董大', '唐·高适', '千里黄云白日曛，北风吹雁雪纷纷。\n莫愁前路无知己，天下谁人不识君。')

p(5034, '闻官军收河南河北', '唐·杜甫', '剑外忽传收蓟北，初闻涕泪满衣裳。\n却看妻子愁何在，漫卷诗书喜欲狂。\n白日放歌须纵酒，青春作伴好还乡。\n即从巴峡穿巫峡，便下襄阳向洛阳。')

p(5035, '绝句（两个黄鹂鸣翠柳）', '唐·杜甫', '两个黄鹂鸣翠柳，一行白鹭上青天。\n窗含西岭千秋雪，门泊东吴万里船。')

p(5036, '春夜喜雨', '唐·杜甫', '好雨知时节，当春乃发生。\n随风潜入夜，润物细无声。\n野径云俱黑，江船火独明。\n晓看红湿处，花重锦官城。')

p(5037, '绝句（迟日江山丽）', '唐·杜甫', '迟日江山丽，春风花草香。\n泥融飞燕子，沙暖睡鸳鸯。')

p(5038, '江畔独步寻花', '唐·杜甫', '黄四娘家花满蹊，千朵万朵压枝低。\n留连戏蝶时时舞，自在娇莺恰恰啼。')

p(5039, '枫桥夜泊', '唐·张继', '月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。')

p(5040, '寒食', '唐·韩翃', '春城无处不飞花，寒食东风御柳斜。\n日暮汉宫传蜡烛，轻烟散入五侯家。')

p(5041, '滁州西涧', '唐·韦应物', '独怜幽草涧边生，上有黄鹂深树鸣。\n春潮带雨晚来急，野渡无人舟自横。')

p(5042, '游子吟', '唐·孟郊', '慈母手中线，游子身上衣。\n临行密密缝，意恐迟迟归。\n谁言寸草心，报得三春晖。')

p(5043, '十五夜望月寄杜郎中', '唐·王建', '中庭地白树栖鸦，冷露无声湿桂花。\n今夜月明人尽望，不知秋思落谁家。')

p(5044, '早春呈水部张十八员外', '唐·韩愈', '天街小雨润如酥，草色遥看近却无。\n最是一年春好处，绝胜烟柳满皇都。')

p(5045, '渔父', '唐·张志和', '西塞山前白鹭飞，桃花流水鳜鱼肥。\n青箬笠，绿蓑衣，斜风细雨不须归。')

p(5046, '塞下曲', '唐·卢纶', '月黑雁飞高，单于夜遁逃。\n欲将轻骑逐，大雪满弓刀。')

p(5047, '望洞庭', '唐·刘禹锡', '湖光秋月两相和，潭面无风镜未磨。\n遥望洞庭山水翠，白银盘里一青螺。')

p(5048, '浪淘沙（其一）', '唐·刘禹锡', '九曲黄河万里沙，浪淘风簸自天涯。\n如今直上银河去，同到牵牛织女家。')

p(5049, '浪淘沙（其七）', '唐·刘禹锡', '八月涛声吼地来，头高数丈触山回。\n须臾却入海门去，卷起沙堆似雪堆。')

p(5050, '赋得古原草送别', '唐·白居易', '离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。\n远芳侵古道，晴翠接荒城。\n又送王孙去，萋萋满别情。')

p(5051, '池上', '唐·白居易', '小娃撑小艇，偷采白莲回。\n不解藏踪迹，浮萍一道开。')

p(5052, '忆江南', '唐·白居易', '江南好，风景旧曾谙。\n日出江花红胜火，春来江水绿如蓝。能不忆江南？')

p(5053, '悯农（其一）', '唐·李绅', '锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦。')

p(5054, '大林寺桃花', '唐·白居易', '人间四月芳菲尽，山寺桃花始盛开。\n长恨春归无觅处，不知转入此中来。')

p(5055, '小儿垂钓', '唐·胡令能', '蓬头稚子学垂纶，侧坐莓苔草映身。\n路人借问遥招手，怕得鱼惊不应人。')

p(5056, '寻隐者不遇', '唐·贾岛', '松下问童子，言师采药去。\n只在此山中，云深不知处。')

p(5057, '山居秋暝', '唐·王维', '空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。\n竹喧归浣女，莲动下渔舟。\n随意春芳歇，王孙自可留。')

p(5058, '相思', '唐·王维', '红豆生南国，春来发几枝。\n愿君多采撷，此物最相思。')

p(5059, '蝉', '唐·虞世南', '垂緌饮清露，流响出疏桐。\n居高声自远，非是藉秋风。')

p(5060, '江雪', '唐·柳宗元', '千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。')

p(5061, '寻隐者不遇', '唐·贾岛', '松下问童子，言师采药去。\n只在此山中，云深不知处。')

p(5062, '马诗', '唐·李贺', '大漠沙如雪，燕山月似钩。\n何当金络脑，快走踏清秋。')

p(5063, '山行', '唐·杜牧', '远上寒山石径斜，白云生处有人家。\n停车坐爱枫林晚，霜叶红于二月花。')

p(5064, '清明', '唐·杜牧', '清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有？牧童遥指杏花村。')

p(5065, '江南春', '唐·杜牧', '千里莺啼绿映红，水村山郭酒旗风。\n南朝四百八十寺，多少楼台烟雨中。')

p(5066, '蜂', '唐·罗隐', '不论平地与山尖，无限风光尽被占。\n采得百花成蜜后，为谁辛苦为谁甜？')

p(5067, '乞巧', '唐·林杰', '七夕今宵看碧霄，牵牛织女渡河桥。\n家家乞巧望秋月，穿尽红丝几万条。')

p(5068, '蝉', '唐·虞世南', '垂緌饮清露，流响出疏桐。\n居高声自远，非是藉秋风。')

p(5069, '江南逢李龟年', '唐·杜甫', '岐王宅里寻常见，崔九堂前几度闻。\n正是江南好风景，落花时节又逢君。')

p(5070, '元日', '宋·王安石', '爆竹声中一岁除，春风送暖入屠苏。\n千门万户曈曈日，总把新桃换旧符。')

p(5071, '泊船瓜洲', '宋·王安石', '京口瓜洲一水间，钟山只隔数重山。\n春风又绿江南岸，明月何时照我还。')

p(5072, '书湖阴先生壁', '宋·王安石', '茅檐长扫净无苔，花木成畦手自栽。\n一水护田将绿绕，两山排闼送青来。')

p(5073, '六月二十七日望湖楼醉书', '宋·苏轼', '黑云翻墨未遮山，白雨跳珠乱入船。\n卷地风来忽吹散，望湖楼下水如天。')

p(5074, '饮湖上初晴后雨', '宋·苏轼', '水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。')

p(5075, '题西林壁', '宋·苏轼', '横看成岭侧成峰，远近高低各不同。\n不识庐山真面目，只缘身在此山中。')

p(5076, '夏日绝句', '宋·李清照', '生当作人杰，死亦为鬼雄。\n至今思项羽，不肯过江东。')

p(5077, '三衢道中', '宋·曾几', '梅子黄时日日晴，小溪泛尽却山行。\n绿阴不减来时路，添得黄鹂四五声。')

p(5078, '示儿', '宋·陆游', '死去元知万事空，但悲不见九州同。\n王师北定中原日，家祭无忘告乃翁。')

p(5079, '秋夜将晓出篱门迎凉有感', '宋·陆游', '三万里河东入海，五千仞岳上摩天。\n遗民泪尽胡尘里，南望王师又一年。')

p(5080, '四时田园杂兴（昼出耘田）', '宋·范成大', '昼出耘田夜绩麻，村庄儿女各当家。\n童孙未解供耕织，也傍桑阴学种瓜。')

p(5081, '四时田园杂兴（梅子金黄）', '宋·范成大', '梅子金黄杏子肥，麦花雪白菜花稀。\n日长篱落无人过，惟有蜻蜓蛱蝶飞。')

p(5082, '晓出净慈寺送林子方', '宋·杨万里', '毕竟西湖六月中，风光不与四时同。\n接天莲叶无穷碧，映日荷花别样红。')

p(5083, '春日', '宋·朱熹', '胜日寻芳泗水滨，无边光景一时新。\n等闲识得东风面，万紫千红总是春。')

p(5084, '菩萨蛮·书江西造口壁', '宋·辛弃疾', '郁孤台下清江水，中间多少行人泪。\n西北望长安，可怜无数山。\n青山遮不住，毕竟东流去。\n江晚正愁余，山深闻鹧鸪。')

p(5085, '长相思', '清·纳兰性德', '山一程，水一程，身向榆关那畔行，夜深千帐灯。\n风一更，雪一更，聒碎乡心梦不成，故园无此声。')

p(5086, '石灰吟', '明·于谦', '千锤万凿出深山，烈火焚烧若等闲。\n粉骨碎身浑不怕，要留清白在人间。')

p(5087, '竹石', '清·郑燮', '咬定青山不放松，立根原在破岩中。\n千磨万击还坚劲，任尔东西南北风。')

p(5088, '所见', '清·袁枚', '牧童骑黄牛，歌声振林樾。\n意欲捕鸣蝉，忽然闭口立。')

p(5089, '村居', '清·高鼎', '草长莺飞二月天，拂堤杨柳醉春烟。\n儿童散学归来早，忙趁东风放纸鸢。')

p(5090, '己亥杂诗', '清·龚自珍', '九州生气恃风雷，万马齐喑究可哀。\n我劝天公重抖擞，不拘一格降人才。')

p(5091, '满江红', '宋·岳飞', '怒发冲冠，凭栏处、潇潇雨歇。\n抬望眼、仰天长啸，壮怀激烈。\n三十功名尘与土，八千里路云和月。\n莫等闲、白了少年头，空悲切！\n靖康耻，犹未雪；臣子恨，何时灭！\n驾长车，踏破贺兰山缺。\n壮志饥餐胡虏肉，笑谈渴饮匈奴血。\n待从头、收拾旧山河，朝天阙。')

p(5092, '小池', '宋·杨万里', '泉眼无声惜细流，树阴照水爱晴柔。\n小荷才露尖尖角，早有蜻蜓立上头。')

p(5093, '观书有感', '宋·朱熹', '半亩方塘一鉴开，天光云影共徘徊。\n问渠那得清如许？为有源头活水来。')

p(5094, '乡村四月', '宋·翁卷', '绿遍山原白满川，子规声里雨如烟。\n乡村四月闲人少，才了蚕桑又插田。')

p(5095, '墨梅', '元·王冕', '我家洗砚池头树，朵朵花开淡墨痕。\n不要人夸好颜色，只留清气满乾坤。')

p(5096, '游园不值', '宋·叶绍翁', '应怜屐齿印苍苔，小扣柴扉久不开。\n春色满园关不住，一枝红杏出墙来。')

p(5097, '画鸡', '明·唐寅', '头上红冠不用裁，满身雪白走将来。\n平生不敢轻言语，一叫千门万户开。')

p(5098, '暮江吟', '唐·白居易', '一道残阳铺水中，半江瑟瑟半江红。\n可怜九月初三夜，露似真珠月似弓。')

p(5099, '泊秦淮', '唐·杜牧', '烟笼寒水月笼沙，夜泊秦淮近酒家。\n商女不知亡国恨，隔江犹唱后庭花。')

p(5100, '清明', '唐·杜牧', '清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有？牧童遥指杏花村。')

p(5101, '舟夜书所见', '清·查慎行', '月黑见渔灯，孤光一点萤。\n微微风簇浪，散作满河星。')

p(5102, '秋思', '唐·张籍', '洛阳城里见秋风，欲作家书意万重。\n复恐匆匆说不尽，行人临发又开封。')

p(5103, '马诗', '唐·李贺', '此马非凡马，房星本是星。\n向前敲瘦骨，犹自带铜声。')

p(5104, '竹枝词', '唐·刘禹锡', '杨柳青青江水平，闻郎江上唱歌声。\n东边日出西边雨，道是无晴却有晴。')

p(5105, '画鸡', '明·唐寅', '头上红冠不用裁，满身雪白走将来。\n平生不敢轻言语，一叫千门万户开。')

p(5106, '舟夜书所见', '清·查慎行', '月黑见渔灯，孤光一点萤。\n微微风簇浪，散作满河星。')

p(5107, '竹枝词', '唐·刘禹锡', '杨柳青青江水平，闻郎江上唱歌声。\n东边日出西边雨，道是无晴却有晴。')

p(5108, '所见', '清·袁枚', '牧童骑黄牛，歌声振林樾。\n意欲捕鸣蝉，忽然闭口立。')

p(5109, '村居', '清·高鼎', '草长莺飞二月天，拂堤杨柳醉春烟。\n儿童散学归来早，忙趁东风放纸鸢。')

p(5110, '夜书所见', '宋·叶绍翁', '萧萧梧叶送寒声，江上秋风动客情。\n知有儿童挑促织，夜深篱落一灯明。')

p(5111, '长相思', '清·纳兰性德', '山一程，水一程，身向榆关那畔行，夜深千帐灯。\n风一更，雪一更，聒碎乡心梦不成，故园无此声。')

p(5112, '己亥杂诗', '清·龚自珍', '浩荡离愁白日斜，吟鞭东指即天涯。\n落红不是无情物，化作春泥更护花。')

// ------ 新增古诗词 ------

p(5113, '虞美人·春花秋月何时了', '五代·李煜', '春花秋月何时了？往事知多少。\n小楼昨夜又东风，故国不堪回首月明中。\n雕栏玉砌应犹在，只是朱颜改。\n问君能有几多愁？恰似一江春水向东流。')

p(5114, '闲适', '宋·陆游', '饮酒不至狂，对客不至疲。\n读书以自娱，不强所不知。\n一窗袖手坐，往往昼漏移。\n初非能养生，简事颇似之。\n四时俱可喜，最好新秋时。\n柴门傍野水，邻叟闲相期。')

p(5115, '江城子·乙卯正月二十日夜记梦', '宋·苏轼', '十年生死两茫茫，不思量，自难忘。\n千里孤坟，无处话凄凉。\n纵使相逢应不识，尘满面，鬓如霜。\n夜来幽梦忽还乡，小轩窗，正梳妆。\n相顾无言，惟有泪千行。\n料得年年肠断处，明月夜，短松冈。')

p(5116, '念奴娇·赤壁怀古', '宋·苏轼', '大江东去，浪淘尽，千古风流人物。\n故垒西边，人道是，三国周郎赤壁。\n乱石穿空，惊涛拍岸，卷起千堆雪。\n江山如画，一时多少豪杰。\n遥想公瑾当年，小乔初嫁了，雄姿英发。\n羽扇纶巾，谈笑间，樯橹灰飞烟灭。\n故国神游，多情应笑我，早生华发。\n人生如梦，一尊还酹江月。')

p(5117, '秋词·其一', '唐·刘禹锡', '自古逢秋悲寂寥，我言秋日胜春朝。\n晴空一鹤排云上，便引诗情到碧霄。')

p(5118, '天净沙·秋思', '元·马致远', '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。\n夕阳西下，断肠人在天涯。')

p(5119, '定风波', '宋·苏轼', '莫听穿林打叶声，何妨吟啸且徐行。\n竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n料峭春风吹酒醒，微冷，山头斜照却相迎。\n回首向来萧瑟处，归去，也无风雨也无晴。')

// ========== 动态更新词库配置 ==========
// 自动填充 poems 词库的 wordCount 和 wordIds
const poemIds = Object.values(W).filter(w => w.title).map(w => w.id)
DICTIONARIES.find(d => d.id === 'poems').wordCount = poemIds.length
DICTIONARIES.find(d => d.id === 'poems').wordIds = poemIds
DICTIONARIES.find(d => d.id === 'poems').subLabel = poemIds.length + '首'
