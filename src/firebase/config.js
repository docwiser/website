import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCWmtoaRx-_UD6DdvPU6OhSfiGYISyTzSI",
  authDomain: "susant-swain.firebaseapp.com",
  projectId: "susant-swain",
  storageBucket: "susant-swain.firebasestorage.app",
  messagingSenderId: "1029642583050",
  appId: "1:1029642583050:web:181556d2597148289e73f3",
  measurementId: "G-2L9SFK6TBZ",
  databaseURL: "https://susant-swain-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
export default app