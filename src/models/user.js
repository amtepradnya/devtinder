const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator"); // Import validator

const userSchema=  mongoose.Schema({
    "firstName":{
        type:String,
        required:true,
        minLength:2,
        maxLength:5,
    },
    "lastName":{
        type:String
    },
    "emailId":{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email address " +value);
            
        }
    }
    },
    "password":{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("invalid password  " +value);
                
            }
        }
    },
    "age":{
        type:Number,
        required:true,
        min:4,
        max:20
    },
    "gender":{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid");
                
            }
        },
    },
    "photoUrl":{
        type:String,
        default:"https://www.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_258647889.htm#query=default%20avatar&position=7&from_view=keyword&track=ais_hybrid&uuid=5e02d85e-1efb-4ae2-b04e-0f37857e5170",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url  " +value);
                
            }
        }
    },
    "about":{
        type:String,
        default:"abcd"
    },
    "skills":{
        type:[String],
    },
   
},
{
"timestamps":true,
}
);



userSchema.methods.getJWT= async function() {
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEVTinder$123",{expiresIn:"7d"});
    return token;

}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
    
}
const User=mongoose.model("User",userSchema);


module.exports=User;
