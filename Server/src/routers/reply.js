const express = require("express");
const Reply = express.Router();
const {CommentModel,BlogsModel,ReplyModel} = require('../models')

Reply.post('/blog/comment/reply/:id', async (req,res)=>{
    const {id} = req.params
    try {
        console.log(id)
        const newReply= new ReplyModel(req.body)
        console.log(newReply)
        await newReply.save()
        const newComment = await CommentModel.findByIdAndUpdate(id,{$addToSet:{reply:newReply._id}})
        await newComment.save()
        res.send(newReply)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
})

module.exports = Reply