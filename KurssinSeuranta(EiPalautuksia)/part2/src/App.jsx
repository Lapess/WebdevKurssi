import "./index.css"

import Note from "./components/Note"
import { useState, useEffect } from "react"
import noteService from "./services/notes"

const Footer = () =>{
  const footerStyle={
    color: "green",
    fonstyle: "italic",
    fontsize: 16
  }
  return(
    <div style={footerStyle}>
    <br/>
    <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
  
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const toggleImportanceOf=(id)=>{

    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(returnedNote =>{
      setNotes(notes.map(note => note.id === returnedNote.id ? returnedNote : note))
    })
    .catch(error =>{
      setErrorMessage(
        `Note ${note.content} has already removed from the server`
      )
      setTimeout(() =>{
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  const addNote = (event) =>{
    event.preventDefault()
    const noteObject={
      content: newNote,
      important: Math.random() > 0.5,
    }
    noteService
    .create(noteObject)
    .then(returnedNote=>{
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }

  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? 
  notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>
        Notes
      </h1>
      <Notification message={errorMessage}/>
      <div>
        <button
          onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
          key ={note.id}
          note={note}
          toggleImportance={()=>toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        <button type ="Submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

const Notification=({message})=>{
if (message === null){
  return null
}

  return(
    <div className="error">
      {message}
    </div>
  )
}
export default App