const express = require("express")
const fs = require("fs")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (__, ___, cb) => {
        cb(null, "public/image");
    },
    filename: (__, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage }).single("file");

const blogCrudRouter = express.Router();

blogCrudRouter.post("/blogsImageUpload", (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            console.log(error)
            return res.status(500).json(error)
        } else if (req.file) {
            return res.status(200).send({ filename: req.file.filename });
        }
    })
})


blogCrudRouter.post("/deleteImage/:imgName", (req, res) => {
    const { imgName } = req.params

    fs.unlink(`public/image/${imgName}`, (error) => {
        if (error) {
            console.log(error)
        }

    })
    res.send()
})

blogCrudRouter.put("/blogsImageUpdate/:imgName", (req, res) => {
    const { imgName } = req.params
    upload(req, res, (error) => {
        if (error) {
            return res.status(500).json(error)
        } else if (req.file) {
            fs.unlink(`public/image/${imgName}`, (error) => {
                if (error) {
                    console.log(error)
                }
            })
            return res.status(200).send({ filename: req.file.filename });
        }
    })
})

module.exports = blogCrudRouter;