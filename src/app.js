const express=require("express");
const app=express();

app.use("/hello",(req,res)=>{
    res.send("hii pradnya")
})
app.listen(3000,()=>{

    console.log("successfully started server")
})