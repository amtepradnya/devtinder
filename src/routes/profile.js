const express=require("express");
const app=express();
const profileRouter=express.Router();
const User=require("../models/user");
const { userAuth }=require("../middlewares/auth.js");
const { validateSignUpData, validateEditProfileData } = require("../utils/validation.js");


// get profile
profileRouter.get("/profile/view", userAuth,async (req, res)=>{
    try{

        const user= req.user;
        res.send(user)
   }catch(err){
    res.status(400).send("error is : "+err.message)


   }
});
// user info
profileRouter.get("/user",async(req,res)=>{
    
    const  email=req.body.emailId;
    try{
    const user= await User.findOne({
        emailId:email
    });
    
    if(!user){
        res.status(404).send("user not found")
    }else{
        res.send(user);
    }
    }
    catch(err){
        res.status(500).send("something wrong", +err.message)
        
    }

})
//all users feed
profileRouter.get("/feed", async (req,res)=>{
    try {
    const feed= await User.find({});
    console.log(feed)
    res.send(feed)
    }
    catch(err){
        res.status(400).send("failed to get data error is: ", +err.message)

    }


})

// delete user
profileRouter.delete("/user",async (req, res)=>{
    const userId=req.body.userId;

    console.log(userId)
    try{
  //   const user= await User.findByIdAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).send("User not found");
  } else {
      res.status(200).send("User deleted successfully");
  }
    }catch(err){
      res.status(400).send("something wrong");
    }

})

// update user
profileRouter.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;



    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
      
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );

    
        if(!isUpdateAllowed){
            throw new Error ("update not allowed");
           
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{
            new:true,
            runValidators:true,

        }
        );

        if (!user) {
          res.status(404).send("User not found");
      } else {
          res.status(200).send("User updated successfully");
      }

    }catch(err){
        res.status(400).send("update failed"+err.message);

    }
});

//edit user
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try {
        if(!(validateEditProfileData)){
            throw new Error("Invalid Edit Request");
                    }
    const loginUser =req.user;

    Object.keys(req.body).forEach((key)=>(loginUser[key]=req.body[key]));
    await loginUser.save();
    console.log(loginUser);
    res.send("profile updated successfully")
    } catch (err) {
        res.status(400).send("error : "+err)
    }

});
module.exports=profileRouter;
