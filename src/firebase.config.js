import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCoRu9PplcwKzyZYBy7vQfnpwp4Eit8l2Y',
  authDomain: 'market-41848.firebaseapp.com',
  projectId: 'market-41848',
  storageBucket: 'market-41848.appspot.com',
  messagingSenderId: '6750370466',
  appId: '1:6750370466:web:ce92a204376006b065f5fb',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
