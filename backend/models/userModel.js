const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        required: false,
    }
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel