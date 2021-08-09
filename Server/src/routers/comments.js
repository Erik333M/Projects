const express = require("express");
const Comment = express.Router();
const {CommentModel,BlogsModel} = require('../models')

Comment.post('/blog/comment/:id', async (req,res)=>{
    const {id} = req.params
    try {
    const newComment = new CommentModel(req.body)
    await newComment.save()
    await BlogsModel.findByIdAndUpdate(id,{$addToSet:{comments:newComment._id}})
    res.send(newComment)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


module.exports = Comment