const { Schema, model } = require("mongoose");

const postschema=Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    userID:String,
    username:String
})


const  PostModel=model("post",postschema)

module.exports={PostModel}