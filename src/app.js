const express=require("express");
const connectDB=require("./config/database")
const app=express();
const User=require("./models/user");
const Post=require("./models/post");

app.use(express.json());

app.get("/user",async(req,res)=>{
    
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

// delete user
app.delete("/user",async (req, res)=>{
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

app.get("/feed", async (req,res)=>{
    try {
    const feed= await User.find({});
    console.log(feed)
    res.send(feed)
    }
    catch(err){
        res.status(400).send("failed to get data error is: ", +err.message)

    }


})

app.post("/signup", async (req,res)=>{
    const user= new User(req.body)

    try{
        await user.save();
        res.send("data inserted successfully")

    }catch(err){
        res.status(400).send("failed to insert data error is: ", +err.message)

    }
 
});

app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        const user = await User.findByIdAndUpdate({_id:userId},data);

        if (!user) {
          res.status(404).send("User not found");
      } else {
          res.status(200).send("User updated successfully");
      }

    }catch(err){
        res.status(400).send("something wrong");

    }
})

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





