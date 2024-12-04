import express from "express";
import { fetchBoards, getBoardById, searchBoard } from '../controller/boardsController.js'



const router = express.Router();


router.get("/boards", fetchBoards);
router.get("/boards/:id", getBoardById);
router.post("/searchBoard", searchBoard);




export default router;