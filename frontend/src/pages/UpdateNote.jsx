import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../store/authStore'
import { getNote, updateNote } from '../services/NoteService'
import toast from 'react-hot-toast'

const UpdateNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await getNote(id)
        setTitle(res.data.note.title)
        setDescription(res.data.note.description)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch note')
        navigate('/')
      }
    }

    if (isLoggedIn) {
      fetchNote()
    } else {
      navigate('/')
    }
  }, [id, isLoggedIn, navigate])

  const onSubmit = async () => {
    try {
      const data = {
        title,
        description,
      }
      await updateNote(id, data)
      toast.success('Note updated successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to update note')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-slate-400">Please sign in to update notes.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="inline-block animate-spin">⏳</div>
          <h1 className="text-4xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden py-10">

      {/* Background Glow */}
      <div className="fixed top-20 left-10 w-80 h-80 bg-violet-600/20 blur-3xl rounded-full opacity-40"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-cyan-600/20 blur-3xl rounded-full opacity-40"></div>

      <div className="relative w-full max-w-2xl">

        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-purple-900/30 border border-violet-500/30 rounded-3xl p-8 shadow-2xl shadow-violet-500/10">

          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Update Note
            </h1>

            <p className="text-slate-300 mt-3 text-lg">
              ✨ Edit your thoughts and ideas.
            </p>
          </div>

          <div className="space-y-6">

            <div>
              <label className="block text-slate-300 mb-3 font-semibold tracking-wide">
                📌 Title
              </label>

              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-800/50 border border-violet-500/30 text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-3 font-semibold tracking-wide">
                📝 Description
              </label>

              <textarea
                rows="8"
                placeholder="Write your note here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-800/50 border border-violet-500/30 text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all duration-300 resize-none"
              />
            </div>

            <div className="flex gap-4 pt-2">

              <button
                onClick={onSubmit}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                ✨ Update Note
              </button>

              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 rounded-xl border-2 border-slate-700/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default UpdateNote