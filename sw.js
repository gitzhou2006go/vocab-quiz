const CACHE_NAME = 'vocab-quiz-v2'
const urlsToCache = [
  '/vocab-quiz/',
  '/vocab-quiz/index.html',
  '/vocab-quiz/assets/index.css',
  '/vocab-quiz/assets/index.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
        }
        return networkResponse
      })
    })
  )
})

// 收到「跳过等待」消息后立即接管 —— 用于「点击更新到最新」按钮
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
