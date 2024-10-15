const express=require("express");
const app=express();



app.get("/user",
    (req,res , next)=>{
    console.log("loop 1")
    next()
    },
    (req,res, next)=>{
        console.log("loop 2")
        // res.send("loop 2");
        next()
    },
    (req,res)=>{
        console.log("loop 3")
        res.send("loop 3");
    },   (req,res)=>{
        console.log("loop 4")
        res.send("loop 4");
    },

);



app.listen(3000,()=>{

    console.log("successfully started server")
})
