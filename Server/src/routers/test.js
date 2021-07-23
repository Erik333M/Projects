const express = require("express");
const Test = require('../models/test')
const Router = express.Router()

Router.post('/test', async (req,res)=>{
    const documents=[] 
    for(let e=0;e<100;e++){
        documents.push({name:`name-${e}`,age:e})
    }
    const newDocs = await Test.create(documents)
    res.send(newDocs)
})

Router.get('/test',async (req,res)=>{
    try {
        const newTest = await Test.find().skip(10).limit(20).sort({age:-1})
        const doc = await Test.findOneAndUpdate({name:'name-1'},{$addToSet:{
            arr:'value-1'
        }})
        res.send(newTest)
    } catch (error) {
        console.log(error)
    }
})

module.exports = Router