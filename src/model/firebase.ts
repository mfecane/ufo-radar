import {
  serverTimestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { Point } from '@/model/types'

const local = location.hostname === 'localhost'

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(config)
const db = getFirestore()

if (local) {
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export const auth = getAuth(app)

if (local) {
  connectAuthEmulator(auth, 'http://localhost:9099')
}

export const readUser = async (currentUser) => {
  if (!currentUser) return null

  const docSnap = await getDoc(doc(db, 'users', currentUser.uid))
  if (!docSnap.exists()) {
    throw new Error('User error')
  }

  const data = docSnap.data()
  const user = { ...currentUser, name: data.name }
  return user
}

export const readPoints = async () => {
  try {
    const q = query(collection(db, 'points'))
    const points: Point[] = []
    const qs = await getDocs(q)
    qs.forEach((d) => {
      points.push({ ...d.data(), id: d.id } as Point)
    })
    return points
  } catch (e) {
    console.log(e)
  }
}
