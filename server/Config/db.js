import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';


const MONGO_URL= process.env.MONGODB_URI;

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log(`connected to MongoDb Database ${conn.connection.host}`.bgGreen)
        
    } catch (error) {
        console.log("Error in mongodb",error);
        console.log("check mongodb_link please")
    }
}

export default connectDB;