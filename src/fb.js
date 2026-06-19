/**
 * Firebase Firestore 自动同步层
 *
 * 结构：Firestore doc data/main 存全部数据
 *   { rounds: [...], errors: [...], version: number, updatedAt: number }
 *
 * 自动同步策略：
 *   - 每次本地修改 → debounce 后上传到 Firebase
 *   - 监听远程变化 → 版本号比本地新就覆盖本地
 *   - version 防止回环（自己上传的不会触发自己下载）
 */
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore'

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase timeout')), ms))
}

const firebaseConfig = {
  apiKey: "AIzaSyDBs6TJLcttUkyM6s9wFsAV_wH-iuGPmmo",
  authDomain: "dict-6899b.firebaseapp.com",
  projectId: "dict-6899b",
  storageBucket: "dict-6899b.firebasestorage.app",
  messagingSenderId: "562340508921",
  appId: "1:562340508921:web:baddd8b35e81e2b78c5e28",
  measurementId: "G-4G945EX7GZ"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const syncRef = doc(db, 'data', 'main')
// 独立探测文档，用于连接测试，绝不碰主数据 data/main
const pingRef = doc(db, 'data', '_ping')

export let cloudVersion = 0

/**
 * 上传全部数据到 Firebase
 */
export async function uploadAll(rounds, errors) {
  try {
    cloudVersion++
    await Promise.race([
      setDoc(syncRef, {
        rounds: rounds.map(r => ({
          ...r,
          pendingWordIds: r.pendingWordIds ? [...r.pendingWordIds] : []
        })),
        errors: errors.map(e => ({ ...e })),
        version: cloudVersion,
        updatedAt: Date.now()
      }),
      timeout(8000)
    ])
    return true
  } catch (e) {
    console.error('Firebase upload failed:', e)
    return false
  }
}

/**
 * 从 Firebase 下载全部数据
 */
export async function downloadAll() {
  try {
    const snap = await Promise.race([
      getDoc(syncRef),
      timeout(8000)
    ])
    if (!snap.exists()) return null
    const data = snap.data()
    cloudVersion = data.version || 0
    return data
  } catch (e) {
    console.error('Firebase download failed:', e)
    return false
  }
}

/**
 * 连接探测：写一个独立的 _ping 文档，不影响主数据 data/main
 * 用于「测试连接」按钮，避免历史 bug（uploadAll([],[]) 清空云端）
 */
export async function testPing() {
  try {
    await Promise.race([
      setDoc(pingRef, { time: Date.now() }),
      timeout(8000)
    ])
    return true
  } catch (e) {
    console.error('Firebase ping failed:', e)
    return false
  }
}

/**
 * 监听远程数据变化
 * callback 在收到远程更新时触发
 * 返回 unsubscribe 函数
 */
export function listenRemote(callback) {
  return onSnapshot(syncRef, (snap) => {
    if (!snap.exists()) return
    const data = snap.data()
    const remoteVer = data.version || 0
    // 忽略自己的上传（版本号相等或更低）
    if (remoteVer <= cloudVersion) return
    // 🛡️ 保护：远程数据为空时不覆盖本地，防止误清空
    //    （应用没有「上传空数据」的合法场景，空数据视为异常）
    const isEmpty = (!data.rounds || data.rounds.length === 0) && (!data.errors || data.errors.length === 0)
    if (isEmpty) {
      cloudVersion = remoteVer // 更新版本号，避免重复触发
      console.warn('收到空数据，已跳过本地覆盖')
      return
    }
    cloudVersion = remoteVer
    callback(data)
  }, (err) => {
    console.error('Firebase listener error:', err)
  })
}
