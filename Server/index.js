import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/user.Route.js";
import dns from "dns";
import cors from "cors"

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(express.json());
dotenv.config()
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mern-crud-application-h3nk.vercel.app"
    ],
    credentials: true,
}))

// routes
app.use("/api", userRoute)


const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB CONNECTED!")

    }).catch ((error) =>{
        console.log(error.meaage)
    })
    app.listen(PORT, ()=>{
          console.log(`Server is running on port http://localhost:${PORT}`)
        })
    
    app.get("/",(req , res)=>{
        res.send("App is running")
    })

    export default app;