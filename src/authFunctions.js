import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';

// Sign-up with Email and Password
export const userRegistration = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await addDoc(collection(db, 'users'), {
      uid: res.user.uid,
      name,
      email,
      authProvider: 'local'
    })
  } catch (error) {
    return {error: error.message} 
  }
}

// Sign-in with Email and Password
export const userSignin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    return { error: error.message }
  }
}

// Sign-in with Google
const googleProvider = new GoogleAuthProvider()
export const googleSignin = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const { displayName, email, uid } = res.user
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    const docs = await getDocs(q)
    // check if user already exists in firestore
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid,
        displayName,
        email,
        authProvider: 'google'
      })
    }
  } catch (error) {
    return { error: error.message }
  }
}

// Reset forgotten password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    return { error: error.message }
  }
}

// Log out authenticated user
export const logout = async () => {
  await signOut(auth)
}