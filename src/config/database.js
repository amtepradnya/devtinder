const mongoose= require("mongoose")

const connectDB= async ()=> {
    await mongoose.connect("mongodb://localhost:27017/devTinder");
    
};

module.exports=connectDB;
// connectDB().then(()=>{
//    console.log("connection established");
// }).catch(err=>{
//     console.log("can not be connected")
// })
