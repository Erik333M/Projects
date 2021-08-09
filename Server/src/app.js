const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const path = require("path")
const sendLetterRouter = require("./routers/letter")
const blog = require('./routers/blog')
const test = require('./routers/test')
const comment = require('./routers/comments')
const Reply = require('./routers/reply')
const port = process.env.PORT

const userRouter = require('./routers/user')
const blogCrudRouter = require('./routers/aploadFile')
require('./db/db')

const app = express()

app.use(express.static(path.join(__dirname,"../public/image")))

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(userRouter);
app.use(sendLetterRouter);
app.use(blogCrudRouter);
app.use(blog);
app.use(test);
app.use(comment); 
app.use(Reply);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})