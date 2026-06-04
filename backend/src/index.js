import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { requireAuth } from "./middleware/requireAuth.js"

dotenv.config()
const app = express()
app.use(express.json())

//routes
app.use("/api/movies", requireAuth, movieRoutes)
app.use("/api/auth", authRoutes)

app.listen(3000, async (req, res) => {
    await connectDB()
    console.log("server running")
})