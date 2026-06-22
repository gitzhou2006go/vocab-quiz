const CACHE = 'vocab-quiz-v5'

// 立即激活，不等待
self.addEventListener('install', () => self.skipWaiting())

// 激活时清除旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// 网络优先，缓存作为离线回退
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  if (url.origin !== location.origin) return

  // version.json 永远不走缓存
  if (url.pathname.includes('version.json')) {
    e.respondWith(fetch(e.request))
    return
  }

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then(cache => cache.put(e.request, clone))
        }
        return res
      })
      .catch(() => caches.match(e.request))
  )
})
