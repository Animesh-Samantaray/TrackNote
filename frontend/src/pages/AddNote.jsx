import React from 'react'
import { useContext } from 'react'
import AuthContext from '../store/authStore'
import { createNote } from '../services/NoteService';
import toast from 'react-hot-toast';

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
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4">

    {isLoggedIn ? (
      <div className="w-full max-w-2xl">

        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Create Note
            </h1>

            <p className="text-slate-400 mt-3">
              Capture your thoughts, ideas and tasks.
            </p>
          </div>

          <div className="space-y-6">

            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="8"
                placeholder="Write your note here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition resize-none"
              />
            </div>

            <div className="flex gap-4">

              <button
                onClick={onSubmit}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-violet-900/40"
              >
                Create Note
              </button>

              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 rounded-2xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      </div>
    ) : (
      <div className="max-w-md w-full">

        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center">

          <div className="text-7xl mb-5">
            🔒
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Authentication Required
          </h1>

          <p className="text-slate-400 mb-8">
            Please sign in to create and manage notes.
          </p>

          <button
            onClick={() => navigate('/signin')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:scale-[1.02] transition-all duration-200"
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