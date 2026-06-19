/**
 * 生成简单的纯色 PNG 图标（使用内置 zlib）
 * 生成 192x192 和 512x512 的图标
 */
import { writeFileSync } from 'fs'
import { deflateSync } from 'zlib'

function createPNG(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // color type: RGB
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace
  const ihdrChunk = createChunk('IHDR', ihdr)

  // Image data (raw pixels with filter byte)
  const rawData = Buffer.alloc(height * (1 + width * 3))
  for (let y = 0; y < height; y++) {
    const offset = y * (1 + width * 3)
    rawData[offset] = 0 // filter: None
    for (let x = 0; x < width; x++) {
      const px = offset + 1 + x * 3
      rawData[px] = r
      rawData[px + 1] = g
      rawData[px + 2] = b
    }
  }
  const compressed = deflateSync(rawData)
  const idatChunk = createChunk('IDAT', compressed)

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

function createChunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const typeBuffer = Buffer.from(type, 'ascii')
  const crcData = Buffer.concat([typeBuffer, data])
  const crc = crc32(crcData)
  const crcBuffer = Buffer.alloc(4)
  crcBuffer.writeUInt32BE(crc, 0)
  return Buffer.concat([length, typeBuffer, data, crcBuffer])
}

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0)
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

// Primary color gradient approximation - purple-blue like the app theme
const icons = [
  { size: 192, r: 102, g: 126, b: 234 },
  { size: 512, r: 102, g: 126, b: 234 }
]

for (const { size, r, g, b } of icons) {
  const png = createPNG(size, size, r, g, b)
  writeFileSync(`public/icon-${size}.png`, png)
  console.log(`Created icon-${size}.png (${png.length} bytes)`)
}
