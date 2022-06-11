const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
                },
                message: 'invalid email'
            }
        ]
    },
})

const User = mongoose.model('users', userSchema)

module.exports = User
