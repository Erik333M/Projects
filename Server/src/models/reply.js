const mongoose = require("mongoose");

const { Schema, model } = mongoose

const ReplySchema = new Schema({
    title:{type:String,required:true},
    body:{
        type:String,
        required:true
    }
})

const ReplyModel = model('Reply',ReplySchema)

module.exports = ReplyModel