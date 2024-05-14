import BlogModel from '../Models/Blog.model.js'
import UserModel from '../Models/User.model.js'


export const AddBlog=async(req,res)=>{
        try {

            const user = await UserModel.findByIdAndUpdate(req.user._id,{},{new:true});

            const {title,description,content,image} = req.body
    
            const Blog = await BlogModel.create({
                user:user._id,
                title,
                description,
                content,
                image
            });

            user.blogs.push(Blog._id);
            await user.save();
            console.log("req.user ---", req.user);

            res.status(201).json({
                sucess:true,
                message:"Blog added sucessfully",
                blog:Blog
            })
            
        } catch (error) {
            console.error(error);
            res.status(400).json({
                sucess:false,
                message:"Internal Server Error"
            })
        }
}


export const ShowBlog = async (req, res) => {
    try {
        // Find all users and populate their blogs
        const usersWithBlogs = await UserModel.find().populate("blogs");

        if (!usersWithBlogs || usersWithBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found"
            });
        }

        // const allBlogs= usersWithBlogs.map((user)=>user.blogs);

        res.status(200).json({
            success: true,
            blogs: usersWithBlogs,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
