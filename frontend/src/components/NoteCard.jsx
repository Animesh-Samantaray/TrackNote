import React, { useEffect, useState } from 'react';
import { deleteNote, updateNote } from '../services/NoteService';
import toast from 'react-hot-toast';

const NoteCard = ({ title, description, id, onNoteDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
  }, [title, description]);

  const handleSave = async () => {
    try {
      if (!newTitle.trim() || !newDescription.trim()) {
        toast.error('Title and description cannot be empty');
        return;
      }

      setIsSaving(true);
      const data = {
        title: newTitle,
        description: newDescription,
      };

      const response = await updateNote(id, data);

      if (response) {
        toast.success('✨ Note updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update note');
    } finally {
      setIsSaving(false);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
    setNewDescription(description);
  };

  const onDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      const deleted = await deleteNote(id);

      if (deleted) {
        toast.success('🗑️ Note deleted successfully');
        // Filter and remove note from the list instantly
        if (onNoteDeleted) {
          onNoteDeleted(id);
        }
      }
    } catch (error) {
      toast.error('Failed to delete note');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-slate-900/60 to-purple-900/40 backdrop-blur-xl p-6 transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:-translate-y-3">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />

      <div className="relative space-y-4">
        
        {/* Header with Icons */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          </div>
          <span className="text-xs text-slate-500 font-semibold tracking-widest uppercase">
            📝 Note
          </span>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={newTitle}
          disabled={!isEditing}
          onChange={(e) => setNewTitle(e.target.value)}
          className={`w-full text-2xl font-bold bg-transparent outline-none transition-all duration-300 ${
            isEditing
              ? 'text-white border-b-2 border-violet-500 pb-2 focus:border-violet-400 placeholder-slate-400'
              : 'text-white cursor-default'
          }`}
          placeholder="Note title..."
        />

        {/* Description Textarea */}
        <textarea
          rows={4}
          value={newDescription}
          disabled={!isEditing}
          onChange={(e) => setNewDescription(e.target.value)}
          className={`w-full resize-none bg-transparent outline-none transition-all duration-300 text-sm leading-relaxed ${
            isEditing
              ? 'text-slate-100 border-2 border-violet-500/50 rounded-lg p-3 focus:border-violet-400 focus:ring-1 focus:ring-violet-500/30 placeholder-slate-400'
              : 'text-slate-400 cursor-default'
          }`}
          placeholder="Note description..."
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t border-violet-500/10">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-green-500/40 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin">⏳</span> Saving...
                  </>
                ) : (
                  <>
                    ✓ Save
                  </>
                )}
              </button>

              <button
                onClick={onCancel}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-600/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-slate-600/20 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
              >
                ✕ Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
              >
                ✏️ Edit
              </button>

              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="px-6 py-2.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
              >
                {isDeleting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                  </>
                ) : (
                  <>
                    🗑️ Delete
                  </>
                )}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default NoteCard;
