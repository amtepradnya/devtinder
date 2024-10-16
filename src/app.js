const express=require("express");
const connectDB=require("./config/database")
const app=express();
const User=require("./models/user");


app.post("/signup", async (req,res)=>{
    const user = new User({
        "userName":"akshay",
        "lastName":"amte",
        "emailId":"aksh@gmail.com",
        "password":"aksh123",
        "age":133,
        "gender":"female",

    });
    try{
        await user.save();
        res.send("data inserted successfully")

    }catch(err){
        res.status(400).send("failed to insert data error is: ", +err.message)

    }
 
});


connectDB()
.then(()=>{
    console.log("db connected successfully")
    app.listen(3000,()=>{

        console.log("successfully started server")
    })
})
.catch((err)=>{
    console.log("db failed to connect")

});





