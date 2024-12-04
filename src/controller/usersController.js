import { connectToMongo } from '../UpdateMongo.js'
import mongoose from 'mongoose';


export const createUser = async(req, res) => {
    try {
        await connectToMongo();
        const userCollection = mongoose.connection.db.collection("users");

        const { name: userName, password, email, phone } = req.body;
        const user = await userCollection.insertOne({ userName, password, email, phone });
        console.log(user);
        res.status(200).json({ user });
    } 
    catch (err) {
        console.error("big pro lol", err);
        res.status(500).json({ error: err });
    }
};

// Login function is similar
export const login = async (req, res) => {
    try {
        await connectToMongo();
        const userCollection =  mongoose.connection.db.collection("users");

        const { name: userName, password } = req.body;
        const user = await userCollection.findOne({ userName, password });
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } 
    catch (err) {
        console.error("big pro lol", err);
        res.status(500).json({ error: err });
    }
};
