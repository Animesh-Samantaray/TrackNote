import express from "express";
import protect from "../middlewares/user.middleware.js";
import { addNote, getAllNotes } from "../controllers/note.controller.js";

const router = express.Router();

router.get('/',protect,getAllNotes);//get all notes
router.get('/:id',protect,getNote);//get particular note
router.post('/',protect,addNote);// create new note
router.put('/:id',protect,updateNote);//update existing note
router.delete('/:id',protect,deleteNote);//delete particular note
router.delete('/',protect,deleteAllNotes);// delete all notes

export default router;