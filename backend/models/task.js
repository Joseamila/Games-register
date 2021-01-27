const {Schema, model} =require('mongoose');

const NewTask = new Schema({
    title: {type: String, require: true},
    author: {type: String, require: true},
    isbn: {type: String, require: true},
    imagePath: {type:String, required: true},
    Created_at: {type: Date, default: Date.now},
})


module.exports = model('Task', NewTask)