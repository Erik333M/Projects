const mongoose = require("mongoose");

const { Schema, model,ObjectId } = mongoose

const CommentSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    poblicdata: {
        type: Date,
        default: new Date()
    },
    reply:[ {type: ObjectId, ref: "Reply" }]
})

const Comment = model('comment', CommentSchema)
module.exports = Comment