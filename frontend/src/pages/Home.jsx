import React, { useContext, useEffect, useState } from 'react'
import { deleteAllNotes, getNotes } from '../services/NoteService'
import NoteCard from '../components/NoteCard'
import AuthContext from '../store/authStore'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Home = () => {
  const [notes, setNotes] = useState([])
  const { user, isLoggedIn,loading  } = useContext(AuthContext)

 useEffect(() => {
  const fetchNotes = async () => {
    if (loading) return;

    try {
      if (!isLoggedIn) {
        toast('Please sign in to view your notes');
        return;
      }

      const res = await getNotes();
      setNotes(res.data.notes);
    } catch (err) {
      toast.error('Failed to fetch notes');
    }
  };

  fetchNotes();
}, [isLoggedIn, loading]);

  const handleDeleteAll = async () => {
    const flag = window.confirm(
      `${user?.username || user?.name || 'User'}, are you sure you want to delete all notes?\n\nThis action cannot be undone.`
    )

    if (!flag) return

    try {
      await deleteAllNotes()
      setNotes([])
      toast.success('All notes deleted successfully')
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-600/20 blur-3xl rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-600/20 blur-3xl rounded-full opacity-40"></div>
        
        <div className="relative text-center bg-gradient-to-br from-slate-900/80 to-purple-900/30 backdrop-blur-xl border border-violet-500/30 rounded-3xl p-12 shadow-2xl shadow-violet-500/10">
          <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Welcome to TrackNote
          </h1>

          <p className="text-slate-300 mb-8 text-lg">
            Capture ideas. Organize thoughts. Build consistency.
          </p>

          <Link
            to="/signin"
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-violet-600/20 blur-3xl rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-600/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-12 pt-4">

          <div className="space-y-3">
            <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 hover:from-cyan-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all duration-500">
              TrackNote
            </h1>

            <p className="text-slate-300 mt-3 text-lg font-medium">
              ✨ Capture ideas. Organize thoughts. Build consistency.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-start lg:justify-end">

            <Link
              to="/add"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="group-hover:rotate-180 transition-transform duration-300">+</span> Add Note
            </Link>

            {notes.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="px-7 py-3 rounded-xl border-2 border-red-500/50 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold hover:scale-105"
              >
                Delete All
              </button>
            )}

          </div>
        </div>

        {/* Stats Card */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-6 px-8 py-5 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-xl hover:border-violet-500/60 transition-all duration-300">

            <div className="text-3xl">📊</div>
            <div>
              <p className="text-slate-400 text-sm font-medium tracking-wide">
                TOTAL NOTES
              </p>

              <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {notes.length}
              </h2>
            </div>

          </div>
        </div>

        {/* Notes Section */}
        {notes.length === 0 ? (
          <div className="flex justify-center items-center min-h-[500px]">

            <div className="text-center p-16 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-slate-900/80 to-purple-900/30 backdrop-blur-xl hover:border-violet-500/60 transition-all duration-300 shadow-2xl shadow-violet-500/10">

              <div className="text-8xl mb-6 animate-bounce">
                📝
              </div>

              <h2 className="text-4xl font-bold text-white mb-4">
                No Notes Yet
              </h2>

              <p className="text-slate-300 mb-10 text-lg">
                Create your first note and start organizing your thoughts.
              </p>

              <Link
                to="/add"
                className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
              >
                Create First Note
              </Link>

            </div>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                id={note._id}
                title={note.title}
                description={note.description}
                onNoteDeleted={(noteId) => setNotes(notes.filter(n => n._id !== noteId))}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Home