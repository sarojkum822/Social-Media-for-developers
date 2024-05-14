import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  title:{
    type:String,
    required:true,
  } ,
  description:{
    type:String,
    required:true
  },
  content:{
    type:String,
    // required:true
  },
  image:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  likes:[
    {type:mongoose.Schema.Types.ObjectId,ref:"user"}
  ]
},{timestamps:true});

export const Blog = mongoose.model("Blog", blogSchema);
export default Blog;