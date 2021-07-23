const mongoose = require("mongoose");

const { Schema, model } = mongoose

const BlogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
        trim: true,
    },
    pictureName:{
        type:String,
        require:true,
    }
})

const Blog = model("blog",BlogSchema)

module.exports = Blog