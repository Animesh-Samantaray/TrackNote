
// ### Note Endpoints

// | Method | Endpoint | Description | Auth Required |
// |--------|----------|-------------|---------------|
// | GET | `/api/notes` | Get all user notes | ✅ Yes |
// | GET | `/api/notes/:id` | Get specific note | ✅ Yes |
// | POST | `/api/notes/:id` | Create new note | ✅ Yes |
// | PUT | `/api/notes/:id` | Update note | ✅ Yes |
// | DELETE | `/api/notes/:id` | Delete specific note | ✅ Yes |
// | DELETE | `/api/notes` | Delete all notes | ✅ Yes |

import API from "./api";

export const getNotes = async () => {
  return await API.get('/notes');
}
export const getNote = async (id) => {
  return await API.get(`/notes/${id}`);
}
export const createNote=async(data)=>{
  return await API.post('/notes', data);
}

export const updateNote=async(id, data)=>{
  return await API.put(`/notes/${id}`, data);
}

export const deleteNote=async(id)=>{
  return await API.delete(`/notes/${id}`);
}

export const deleteAllNotes=async()=>{
  return await API.delete('/notes');
}

