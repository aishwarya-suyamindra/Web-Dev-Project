import dotenv from "dotenv";
import express from "express";
import db from "./database.js";
import cors from "cors";
import VideoRoutes from "./Video/routes.js";
import { UserRoutes } from "./api/User/userRoute.js"

const app = express()
app.use(cors())
app.use(express.json())

const config = dotenv.config({path: 'backend/.env'})

if (config.error) {
    console.log(config.error)
}

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'

await db.connect(`${MONGO_URI}`)

// Routes
UserRoutes(app)
VideoRoutes(app)
console.log(process.env.PORT)
app.listen(process.env.PORT);