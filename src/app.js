const express=require("express");

const connectDB=require("./config/database")
const app=express();
// const User=require("./models/user");
const Post=require("./models/post");
const cookie=require("cookie-parser");
const cookieParser = require("cookie-parser");
const jwt= require("jsonwebtoken");


app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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





