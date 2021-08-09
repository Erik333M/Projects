const express = require("express");
const fs = require('fs');
const Blogs = express.Router();
const BlogModel = require('../models/blog');


Blogs.post('/blogs', async (req, res) => {
    try {
        const blog = new BlogModel(req.body);
        await blog.save();
        res.status(200).send(blog)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

Blogs.get('/blogs', async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate({ path: "comments", populate:"Reply"  })

        res.send(blogs);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

Blogs.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteBlog = await BlogModel.findByIdAndDelete(id)
        fs.unlink(`public/image/${deleteBlog.pictureName}`, (error) => {
            if (error) {
                console.log(error)
            }
        })
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

Blogs.put('/blogs/:id', async (req, res) => {
    const { id } = req.params
    try {
        const Blog = await BlogModel.findByIdAndUpdate(id, req.body, { stract: true, new: true })
        if (req.body.pictureName) {
            fs.unlink(`public/image/${req.body.prevPictur}`, (error) => {
                if (error) {
                    console.log(error)
                }
            })
        }

        res.send(Blog)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = Blogs;