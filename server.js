import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";


// condigure env
dotenv.config();

//Detabase config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes

app.use('/api/v1/auth', authRoutes)

// rest API  
app.get('/', (req, res)=>{
res.send({
    message:'Welcome to Aiojone'
});
});
//port
const PORT = process.env.PORT || 8080;

//run
app.listen(PORT,()=>{
    console.log(`Server Running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
});