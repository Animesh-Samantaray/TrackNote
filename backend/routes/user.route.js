import express from "express";
import protect from "../middlewares/user.middleware.js";
import { giveMyDetails, logout, signin, signup } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/logout',protect,logout);
router.get('/me',protect,giveMyDetails);
router.delete('/',protect,deleteAccount);

export default router;