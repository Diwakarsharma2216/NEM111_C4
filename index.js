const express=require("express")
const { connection } = require("./db")
require("dotenv").config()
const cors = require('cors')
const { userRouter } = require("./routes/user.routes")
const { postRotuter } = require("./routes/post.routes")
const app=express()

app.use(cors())
app.use(express.json())

// #### USER ROUTER ######
app.use("/users",userRouter)

// #### POST ROUTER ######
app.use("/posts",postRotuter)


app.listen(process.env.PORT,async()=>{
    try {
    await connection
    console.log(`Server is Running at ${process.env.PORT}`)
    console.log(">>>>>>>>>>>>Connected To DB>>>>>>>>>>>>>>")
    } catch (error) {
        console.log(error.message)
    }
})

