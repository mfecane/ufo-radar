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
  where,
  limit,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { EditorData, TPoint, TStorePoint, TUser } from '@/model/types'
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage'
import { Point } from '@/model/point'
import { createNewPoint, createStorePoint } from '@/model/pointFactory'

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
export const auth = getAuth(app)
const storage = getStorage()

if (local) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectStorageEmulator(storage, 'localhost', 9199)
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
    const q = query(
      collection(db, 'points'),
      where('published', '==', true),
      where('moderated', '==', true),
      limit(10)
    )
    const points: Point[] = []
    const qs = await getDocs(q)
    qs.forEach((d) => {
      const p = createStorePoint({ ...(d.data() as TStorePoint), id: d.id })
      points.push(p)
    })
    return points
  } catch (e) {
    console.error(e)
  }
}

export const getNewPointId = async () => {
  const ref = doc(collection(db, 'points'))
  return ref.id
}

export const createPoint = async (user: TUser) => {
  const point = await createNewPoint(user.uid)
  return point
}

export const savePoint = async (point: Point) => {
  const [id, data] = point.toStore()
  await setDoc(doc(db, 'points', id), data, { merge: true })
}

export const uploadFile = async (file: File, id: string) => {
  const storageRef = ref(storage, `tmp/${id}_${Date.now()}-${file.name}`)
  const res = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(res.ref)
  return url
}

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signup = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const checkAuth = async () => {
  return new Promise<User | null>((resolve, reject) =>
    onAuthStateChanged(
      auth,
      (user: User | null) => {
        return resolve(user)
      },
      (e) => {
        reject(e)
      }
    )
  )
}

export const logOut = async () => {
  return await signOut(auth)
}
