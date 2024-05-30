const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/userModel')
const UserRouter = require('./routes/users')
const PORT = 8080

app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost:27017/semesteropgave')

mongoose.connection.on('connected', async () => {
    console.log('Mongoose has connected to the database!')
})

app.use('/users', UserRouter)


app.listen(PORT, () => {
    console.log(`Express is running on: localhost:${PORT}`)
})



