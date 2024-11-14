const express=require("express");
const app=express();
const requestRouter=express.Router();
const User=require("../models/user");
const { userAuth }=require("../middlewares/auth.js");


//connection req api
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;

    console.log("connection request sent");
    res.send(user.firstName +" sent connection request");

});

module.exports=requestRouter;