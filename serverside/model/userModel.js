const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, { 
    timestamps: true,
    collection: 'users'
});

module.exports = mongoose.model('ToDoUser', userSchema);