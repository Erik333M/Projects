const mongoose = require("mongoose");

const { Schema, model, ObjectId } = mongoose

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    discribtion: {
        type: String,
        required: true,
        trim: true,
    },
    publicData: {
        type: Date,
        default: new Date()
    },
    comments: [{ type: ObjectId, ref: "comment" }]
    
})

const Blog = model("blog", BlogSchema)

module.exports = Blog