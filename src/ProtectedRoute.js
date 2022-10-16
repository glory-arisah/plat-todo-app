import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  if (!currentUser) {
    return <Navigate to='/' />
  }
  return children
}

export default ProtectedRoute