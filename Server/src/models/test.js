const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    arr: [{ type: String, required: true }]
})

const Test = model('testModel', TestSchema)

module.exports = Test