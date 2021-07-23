const express = require("express");
const sendLetter = require("../sendM");

const sendLetterRouter = express.Router();

sendLetterRouter.post("/sendLetter",async (req,res)=>{
    try{
        console.log(req.body)
        await sendLetter(req.body);
        res.send();
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
});

module.exports = sendLetterRouter;