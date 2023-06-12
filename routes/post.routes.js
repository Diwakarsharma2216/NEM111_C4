const express=require("express");
const { auth } = require("../middleware/Auth");
const { PostModel } = require("../model/post.model");
const postRotuter=express.Router()

postRotuter.use(auth)


// ##### /posts/add ######
postRotuter.post("/add",async(req,res)=>{
 
    try {
        const newpost=new PostModel(req.body)
      await  newpost.save()
      res.status(200).json({msg:"Post Succesfully",data:req.body})
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
})


// ##### /posts  #####

postRotuter.get("/",async(req,res)=>{
    try {
        const { device,minComments, maxComments,page=1}=req.query;
        const limit =3;
        const skip=(page-1)*limit;
        const query={user:req.user._id};
        if (device) {
          query.device=device;
        }
        if (minComments||maxComments) {
          query.no_of_comments={};
          if (minComments) {
            query.no_of_comments.$gte = minComments;
          }
          if (maxComments) {
            query.no_of_comments.$lte = maxComments;
          }
        }
        const posts = await PostModel.find(query).limit(limit).skip(skip).sort('-createdAt').populate('user', 'name email');
        res.status(200).json({posts})
      } catch (error) {
        res.status(400).json({ error:error.message});
      }
})





// #### /posts/top  ####

postRotuter.get("/top",async(req,res)=>{
    try {
        const {page=1} = req.query;
        const limit = 3;
        const skip = (page-1)*limit;
        const posts = await PostModel.find({user:req.user._id}).limit(limit).skip(skip).sort('-no_of_comments').populate('user','name email');
        res.status(200).json({posts})
      } catch (error) {
        res.status(400).json({ error:error.message});
      }
})



// ##### /posts/update  #####
postRotuter.patch("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const post=await PostModel.findById({_id:id})
        const userID=post.userID

        if(userID===req.body.userID){
            const payload=req.body
             const data=await PostModel.find({_id:id})
             await PostModel.findByIdAndUpdate({_id:id},payload)
             res.status(200).json({msg:"Updated Succesfully",data})
        }
        
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
})


// ##### /posts/delete #####

postRotuter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const post=await PostModel.findById({_id:id})
        const userID=post.userID

        if(userID===req.body.userID){
            
             const data=await PostModel.find({_id:id})
             await PostModel.findByIdAndDelete({_id:id})
             res.status(200).json({msg:"Delete Succesfully",data})
            
        }else{
            console.log("hello")
        }
        
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
})


module.exports={postRotuter}