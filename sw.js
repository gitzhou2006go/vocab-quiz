const CACHE = 'vocab-quiz-v4'

// 安装时不跳过等待 —— 让页面有机会提示用户更新
self.addEventListener('install', () => {
  // 不调用 skipWaiting，等待用户确认后再激活
})

// 激活时清除旧缓存，立即接管所有页面
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  const { request } = e
  const url = new URL(request.url)

  // 只处理同源请求
  if (url.origin !== location.origin) return

  // 页面导航（HTML）→ 网络优先，离线时走缓存
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone()
          caches.open(CACHE).then(cache => cache.put(request, clone))
          return res
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // 静态资源（JS/CSS/图片等）→ 缓存优先，后台更新缓存
  e.respondWith(
    caches.match(request).then(cached => {
      const fetchAndCache = fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then(cache => cache.put(request, clone))
        }
        return res
      })
      return cached || fetchAndCache
    })
  )
})

// 收到「跳过等待」消息后才激活（由用户点击"更新"触发）
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
