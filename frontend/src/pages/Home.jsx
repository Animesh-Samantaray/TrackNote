import React, { useContext, useEffect, useState } from 'react'
import { getNotes } from '../services/NoteService'
import NoteCard from '../components/NoteCard'
import AuthContext from '../store/authStore'
import toast from 'react-hot-toast'

const Home = () => {
  const [notes, setNotes] = useState([])
  const {user , isLoggedIn}=useContext(AuthContext);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if(!isLoggedIn){
          toast('Please be authenticated to view notes')
          return;
        }
        const res = await getNotes()
        setNotes(res.data.notes)
      } catch (err) {
        console.log(err)
      }
    }

    fetchNotes()
  }, [])

  return (
    <>
    {isLoggedIn ? (

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            TrackNote
          </h1>

          <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">
            Add Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-3">
                No Notes Found
              </h2>

              <p className="text-slate-400">
                Create your first note and start tracking ideas.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                description={note.description}
                id={note._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    ) : (<div>Not logged in</div>)}
    </>
  )
}

export default Home