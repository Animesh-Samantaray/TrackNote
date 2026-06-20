import React from 'react'
import { deleteNote } from '../services/NoteService'

const NoteCard = ({ title, description,id }) => {
  const handleDelete=async()=>{
    await deleteNote(id);
  }
  const handleUpdate=()=>{
    
  }

  return (
    <div className="group rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md p-5 hover:border-violet-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">

      <h2 className="text-xl font-bold text-white mb-3">
        {title}
      </h2>

      <p className="text-slate-400 line-clamp-4">
        {description}
      </p>

    </div>
  )
}

export default NoteCard