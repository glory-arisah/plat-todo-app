import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { getFireStore, addDoc, collection, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFireStore()
const auth = getAuth()

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const resp = await signInWithPopup(auth, googleProvider)
    const user = resp.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    console.log(q)
    // check if user exists in cloud firestore
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        id: user.id,
        name: user.displayName,
        email: user.email,
        authProvider: 'google'
      })
    }
  } catch (error) {
    alert(error.message)
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    alert(error.message)
  }
}

const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password)
    const user = resp.user
    await addDoc(collection(db, 'users'), {
      id: user.id,
      email,
      displayName,
      authProvider: 'emailAndPassword'
    })
  } catch (error) {
    
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    alert(error.message)
  }
}

const logout = async () => {
  await signOut(auth)
}