import mongoose from "mongoose";

const uri = "mongodb+srv://israel:Israel211@cluster0.qvg0l.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";


export const connectToMongo = async () => {
    if (mongoose.connection.readyState === 0) {  
        try {
          await mongoose.connect(uri);
        } catch (error) {
          console.error('MongoDB connection error:', error);
          throw error;
        }
    }
}

export const close = async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  };