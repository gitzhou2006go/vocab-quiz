/**
 * 启动本地服务器 + localtunnel 暴露到公网
 * 用户手机浏览器打开输出的 URL 即可使用
 */
import http from 'http'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0]
  // SPA fallback
  let filePath = url === '/' ? '/index.html' : url
  filePath = path.join(distDir, filePath)

  // Security: prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback: serve index.html for all other routes
      fs.readFile(path.join(distDir, 'index.html'), (e2, d2) => {
        if (e2) {
          res.writeHead(404)
          res.end('Not Found')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(d2)
      })
      return
    }
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
})

const PORT = 3000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 本地服务器: http://localhost:${PORT}`)
  console.log(`📱 局域网: http://${getLocalIP()}:${PORT}`)
  console.log(`\n🔄 正在启动公网隧道...`)

  // 使用 localtunnel 获取公网 URL
  startTunnel(PORT)
})

function getLocalIP() {
  const nets = os.networkInterfaces()
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address
    }
  }
  return 'localhost'
}

async function startTunnel(port) {
  try {
    // Dynamically import localtunnel
    const localtunnel = (await import('localtunnel')).default
    const tunnel = await localtunnel({ port, subdomain: 'vocab-quiz-app' })
    console.log(`\n🎉 公网访问地址（手机打开这个）：`)
    console.log(`   ${tunnel.url}`)
    console.log(`\n⚠️  注意：这个链接在电脑关闭后失效。`)
    console.log(`📌 如果要永久部署，需要 GitHub Pages 等静态托管。`)

    tunnel.on('close', () => {
      console.log('Tunnel closed')
    })
  } catch (e) {
    console.error(`\n❌ 隧道创建失败: ${e.message}`)
    console.log(`\n📱 可以用局域网地址访问: http://${getLocalIP()}:${PORT}`)
  }
}
