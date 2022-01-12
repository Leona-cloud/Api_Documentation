const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


const Books = mongoose.model('Books', bookSchema);


module.exports.Books = Books;