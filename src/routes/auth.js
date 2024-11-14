const express=require("express");
const app=express();
const authRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");



const { validateSignUpData }=require("../utils/validation");

// app.use()=router.use() botrh aew same make notes

authRouter.post("/signup", async (req,res)=>{

    try{
         //validate data
    validateSignUpData(req);

    const { firstName, lastName , emailId, password, gender,age , skills, photoUrl} = req.body;
    //encrypt password
    const passwordHash =await bcrypt.hash(password, 10);

    const user= new User({
        firstName,
        lastName,
        emailId,
        gender,
        age,
        skills,
        photoUrl,
        password: passwordHash, // Corrected the variable name

    });

        await user.save();
        res.send("data inserted successfully")

    }catch (err){
        res.status(400).send("failed to insert data error is : "+err.message)

    }
 
});

//login user
authRouter.post("/login",async (req, res)=>
    {
        try{
            const { emailId, password } =req.body;
            const user= await User.findOne({ emailId : emailId});
            if(!user){
                throw new Error("Invalid Crendintials");
                
            }
            
    
    
            const isPasswordValid = await user.validatePassword(password);
            
    
            if(isPasswordValid){
                //create jwt token
                // const token=await jwt.sign({_id:user._id},"DEVTinder$123",{expiresIn:"7d"});
                // const token=await user.getJwt();
                const token = await user.getJWT();
    
                console.log(token);
    
                //add token to cookie and send response back to user
                res.cookie('token', token, { expires:new Date(Date.now()+ 8 * 3600000),
                    
                } );
    
    
                res.send("login succefull");
            }else{
                res.send("Invalid Crendintials")
            }
    
        }catch(err){
            res.status(400).send("failed to login error is : "+err.message)
    
    
        }
    });
authRouter.post("/logout",async(req,res)=>{

    res.cookie("token",null,{ expires:new Date(Date.now()),
    })
    res.send("logout successfully")
});

module.exports=authRouter;