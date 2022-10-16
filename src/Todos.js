import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import Todo from './Todo'
import { useAuth } from './context'
import { logout } from './authFunctions'
import { useNavigate } from 'react-router-dom'

const Todos = () => {
  const { currentUser } = useAuth()
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users', currentUser.uid, 'todos'), (snapshot) => {
      setTodos(
        snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
      )
    })
    return () => unsubscribe()
  }, [currentUser.uid])

  const handleSignout = async () => {
    await logout()
    navigate('/')
  }

  const addTodo = async (event) => {
    event.preventDefault()
    const uuid = await currentUser.uid
    const colRef = collection(db, 'users', uuid, 'todos')
    await addDoc(colRef, {
      title
    })
    setTitle('')
  }

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="submit"
          value="Add"
        />
      </form>
      <div className="all-tasks">
        {todos.map((todo) => (
          <Todos key={todo.id} {...todo} currentUser={currentUser} />
        ))}
      </div>
      <button onClick={handleSignout}>Log out</button>
    </div>
  )
}

export default Todos