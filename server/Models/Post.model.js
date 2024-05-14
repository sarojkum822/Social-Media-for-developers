import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  }, 
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content:String,
  likes:[
    {type:mongoose.Schema.Types.ObjectId,ref:"user"}
  ]
},{timestamps:true});

export const Post = mongoose.model("Post", postSchema);
export default Post;