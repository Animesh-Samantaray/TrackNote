import User from "../models/User.model.js";
import Note from "../models/Note.model.js";

const addNote = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'title and description are required' });
        }
        const note = new Note({
            title, description, user: userId
        });

        await note.save();
        await User.findByIdAndUpdate(userId, {
            $push: {
                notes: note._id
            }
        })
        console.log(note + " new note added");
        res.status(201).json({ message: 'New note added', note })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const userId = req.user?._id;
        const notes = await Note.find({ user: userId });
        if (notes.length === 0) return res.status(200).json({notes: []});
        res.status(200).json({ message: 'All notes', notes })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNote = async (req, res) => {
    try {
        const userId = req.user?._id;
        const noteId = req.params?.id;
        if (!noteId) {
            return res.status(400).json({ message: 'note id is required' });
        }
        const note = await Note.findOne({
            _id: noteId,
            user: userId
        });
        if (!note) {
            return res.status(404).json({ message: 'note not found' });
        }
        res.status(200).json({ message: 'note found', note });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const updateNote = async (req, res) => {
    try {
        const id = req.params?.id;
        const userId = req.user?._id;
        const note_now = await Note.findOne({ _id: id, user: userId });
        if (!note_now) {
            return res.status(404).json({ message: 'note not found' });
        }
        const { title, description } = req.body;
        const note = await Note.findOneAndUpdate({ _id: id, user: userId }, {
            title, description
        }, { new: true });
        res.status(200).json({ message: 'note updated', note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteNote = async (req, res) => {
    try {
        const id = req.params?.id;
        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const note = await Note.findOne({
            _id: id,
            user: req.user._id
        });
        if (!note) {
            return res.status(404).json({ message: 'note not found' });
        }
        await Note.findByIdAndDelete(note._id);
        await User.findByIdAndUpdate(user._id, {
            $pull: {
                notes: note._id
            }
        })
        res.status(200).json({ message: 'note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAllNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        await Note.deleteMany({ user: user._id });
        await User.findByIdAndUpdate(user._id, {
            $set: {
                notes: []
            }
        })
        res.status(200).json({ message: 'all notes deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
