const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    "name":{
        type:String
    },
    "type":{
        type:String
    },
    "quanity":{
        type:Number
    },

});
const Post=mongoose.model("Post",postSchema);

module.exports=Post;