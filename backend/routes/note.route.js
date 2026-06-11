import express from "express";
import protect from "../middlewares/user.middleware.js";


const router = express.Router();

router.get('/',protect);//get all notes
router.get('/:id',protect);//get particular note
router.post('/:id',protect);// create new note
router.put('/:id',protect);//update existing note
router.delete('/:id',protect);//delete particular note
router.delete('/',protect);// delete all notes

export default router;