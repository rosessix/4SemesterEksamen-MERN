const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const router = express.Router()

const SALT_ROUNDS = 10

router.post('/create', async (req, res) => {
    const {name, password} = req.body
    
    if (!name || !password) {
        return res.status(400).json({error: 'Name and password are required to create a user.'})
    }

    const dbUser = await UserModel.findOne({'name': name})
    
    if (dbUser?.id != undefined) {
        return res.status(400).json({error: 'This username is taken.'})
    }

    let hPass = bcrypt.hashSync(password, SALT_ROUNDS)
    let user = {name: name, password: hPass}

    const newUser = new UserModel(user)
    await newUser.save()

    res.status(200).send("Created!")
})

router.post('/login', async (req, res) => {
    const {name, password} = req.body
    if (!name || !password) {
        return res.status(400).json({error: 'Name and password are required to login.'})
    }

    const dbUser = await UserModel.findOne({'name': name})
    if (!dbUser?.id) {
        return res.status(400).json({error: 'Could not find a user with this username'})
    }

    const passMatch = bcrypt.compareSync(password, dbUser.password)
    
    if (passMatch == true) {
        return res.status(200).json({userId: dbUser.id})
    }
})



module.exports = router