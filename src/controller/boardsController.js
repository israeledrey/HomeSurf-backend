import { connectToMongo } from '../UpdateMongo.js'
import mongoose from 'mongoose';


export const fetchBoards = async (req, res) => {
    try {
        await connectToMongo();
        const boardCollection = mongoose.connection.db.collection("boards");
        const boards = await boardCollection.find({}).toArray();
        res.json({ dataBase: boards });
    }
    catch (err) {
        console.error("big pro lol", err);
        res.status(500).json({ error: "There is error" });
    }
};

export const getBoardById = async (req, res) => {


    try {
        await connectToMongo();
        console.log("work connect");
        const boardCollection = mongoose.connection.db.collection("boards");

        const boardId = req.params.id;
        const board = await boardCollection.findOne({ id: boardId });
        if (board) {
            res.json({ board });
        } else {
            res.status(404).json({ error: "Board not found" });
        }
    }
    catch (err) {
        console.error("Error fetching board", err);
        res.status(500).json({ error: "Server error" });
    }
};

export const searchBoard = async (req, res) => {
    const  { inputValue } = req.body;

    try {
        await connectToMongo();
        const boardCollection = mongoose.connection.db.collection("boards");

        if (!inputValue) {
            return res.status(400).json({ error: "Search term is required" });
        }

        let board;
        if (inputValue.trim() === "") {
            board = await boardCollection.find().toArray();
        }
        else {
            board = await boardCollection.find({
                $or: [
                    { brand: { $regex: inputValue, $options: "i" } },
                    // { model: { $regex: inputValue, $options: "i" } },
                    // { type: { $regex: inputValue, $options: "i" } },
                    { price: { $regex: inputValue, $options: "i" } },
                ],
            }).toArray();
        }
        res.json({ dataBase: board });
    }
    catch (err) {
        console.error("board not found", err);
        res.status(500).json({ error: "Server error" })
    }
}