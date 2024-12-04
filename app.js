import express  from "express";
import cors from "cors";
import route from './src/routes/route.js'
import { connectToMongo } from './src/UpdateMongo.js'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(route);



connectToMongo().then(() => {
    console.log('MongoDB connected successfully');
  
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch(error => {  
    console.error('Failed to connect to MongoDB:', error);
  });





  
