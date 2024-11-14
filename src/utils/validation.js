const validator= require("validator")
const validateSignUpData = (req) => {
    const { firstName, lastName , emailId, password } = req.body;
    if(!firstName || !lastName){
        
        throw new Error("name is not valid");
        
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password should be strong");
        
    }else if(!validator.isEmail(emailId)){
        throw new Error("email should be valid");
        
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFeilds= [ "firstName", "lastName" , "emailId", "phptoUrl","gender","age","about","skills" ];
    
    const isEditAllowed=Object.keys(req.body).every((field)=>
        allowedEditFeilds.includes(field)
    );
    return isEditAllowed;
};
module.exports={
    validateSignUpData,
    validateEditProfileData
}
