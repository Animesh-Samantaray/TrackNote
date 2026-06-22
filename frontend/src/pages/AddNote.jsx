import React from 'react'
import { useContext } from 'react'
import AuthContext from '../store/authStore'
import { createNote } from '../services/NoteService';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AddNote = () => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const {isLoggedIn,navigate} = useContext(AuthContext);
  const onSubmit =async ()=>{
   try {
     const body = {
      title,
      description
    };
    await createNote(body);
    navigate('/');
    toast.success('Note added successfully');
    
   } catch (error) {
    toast.error(error.message);
   }
  }
 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden py-10">

    {/* Background Glow */}
    <div className="fixed top-20 left-10 w-80 h-80 bg-violet-600/20 blur-3xl rounded-full opacity-40"></div>
    <div className="fixed bottom-20 right-10 w-80 h-80 bg-cyan-600/20 blur-3xl rounded-full opacity-40"></div>

    {isLoggedIn ? (
      <div className="relative w-full max-w-2xl">

        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-purple-900/30 border border-violet-500/30 rounded-3xl p-8 shadow-2xl shadow-violet-500/10">

          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Create Note
            </h1>

            <p className="text-slate-300 mt-3 text-lg">
              ✨ Capture your thoughts, ideas and tasks.
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
                ✨ Create Note
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
    ) : (
      <div className="relative max-w-md w-full">

        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-purple-900/30 border border-violet-500/30 rounded-3xl p-12 text-center shadow-2xl shadow-violet-500/10">

          <div className="text-7xl mb-6">
            🔒
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Authentication Required
          </h1>

          <p className="text-slate-300 mb-8">
            Please sign in to create and manage notes.
          </p>

          <button
            onClick={() => navigate('/signin')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
          >
            Sign In
          </button>

        </div>

      </div>
    )}

  </div>
)
}

export default AddNote