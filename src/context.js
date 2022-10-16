import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect, useContext, createContext } from 'react'
import { auth } from './firebase'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      }
      else setCurrentUser(null)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}