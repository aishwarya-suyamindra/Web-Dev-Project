import dotenv from "dotenv";
import express from "express";
import db from "./database.js";
import cors from "cors";
import VideoRoutes from "./Video/routes.js";

const app = express()
app.use(cors())
app.use(express.json())

const config = dotenv.config({path: 'backend/.env'})

if (config.error) {
}

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'

await db.connect(`${MONGO_URI}`)

// Routes
VideoRoutes(app)

app.listen(process.env.PORT || 3000);