import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { db } from './firebase'

const Todo = ({ title, checked, currentUser, id }) => {
  const [isChecked, setIsChecked] = useState(checked)
  const [editTodo, setEditTodo] = useState(title)
  const [open, setOpen] = useState(false)
  const docRef = doc(db, 'users', currentUser.uid, 'todos', id)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const updateCheckBox = async (event) => {
    setIsChecked(event.target.checked)
    await updateDoc(docRef, {
      checked: event.target.checked
    })
  }

  const updateTodo = async () => {
    await updateDoc(docRef, {
      title: editTodo
    })
    handleClose()
  }

  const deleteTodo = async () => {
    await deleteDoc(docRef)
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={updateCheckBox}
      />
      <span>{title}</span>
      
      <span><FaTrashAlt onClick={deleteTodo} /></span>
      {/* modal */}
      <span>
        <Button onClick={handleClickOpen}>
          <FaPen />
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Edit todo
          </DialogContentText> */}
          <TextField
            // label={editTodo}
            // variant="standard"
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateTodo}>Update</Button>
        </DialogActions>
      </Dialog>
    </span>
    </div>
  )
}

export default Todo