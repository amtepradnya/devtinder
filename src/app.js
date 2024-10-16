const express=require("express");
const app=express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user",userAuth,(req,res)=>
{
    res.send("user data")
    console.log("user data")
});

app.get("/admin/getdata",(req,res)=>
    {
        res.send("admin data")
        console.log("admin data")
    });


app.listen(3000,()=>{

    console.log("successfully started server")
})
