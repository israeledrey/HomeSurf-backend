import express from "express";
import usersRoute from './usersRoute.js'  
import boardsRoute from './boardsRoute.js' 
import { login } from "../controller/usersController.js";

const router = express.Router();

router.use('/api/users', usersRoute);
router.use('/api/boards', boardsRoute);
router.post("/api", login);

export default router;