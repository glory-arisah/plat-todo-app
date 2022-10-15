import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect, createContent, useContext, createContext } from 'react'
import { auth } from './firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user)
      else setCurrentUser(null)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}