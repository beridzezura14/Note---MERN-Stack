import express from "express";
import cors from "cors"
import dotenv from "dotenv"

import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config()


const app = express();
const PORT = process.env.PORT || 5001;


// middleware
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(rateLimiter)


// app.use((req,res,next) => {
//   console.log("we just got a new req")

//   next()
// })


app.use("/api/notes", notesRouter);


connectDB().then(() => {

  app.listen(PORT, () => {
    console.log("Server started on Port:", PORT);
  });
})

