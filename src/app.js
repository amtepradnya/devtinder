const express=require("express");
const app=express();



// app.use("/user",(req,res)=>{
//     res.send("hii hello")
// })
// app.use("/test",(req,res)=>{
//     res.send("hii test")
// })

app.get("/user",(req,res)=>{
    res.send({"firstname":"prad","lastname":"amte"})

    // console.log({"firstname":"prad","lastname":"amte"})
})
app.post("/user",(req,res)=>{
    res.send({"firstname":"akshay","lastname":"amte"})

    // console.log({"firstname":"prad","lastname":"amte"})
})
app.delete("/user",(req,res)=>{
    res.send("delete call")

    // console.log({"firstname":"prad","lastname":"amte"})
})

app.use("/",(req,res)=>{
    res.send("hii pradnya")
})

app.listen(3000,()=>{

    console.log("successfully started server")
})