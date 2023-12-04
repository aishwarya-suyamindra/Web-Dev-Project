require('dotenv').config()

const express = require('express')
const app = express()
// const mongoose = require('mongoose')
// const DATABASE_URL = ''
// mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const youtubeAPIsRoute = require('./routes/youtubeAPIs')
app.use('/youtubeAPIs', youtubeAPIsRoute)

app.listen(3000, () => console.log('Server Started'))