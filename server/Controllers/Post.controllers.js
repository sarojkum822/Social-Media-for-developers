import PostModel from '../Models/Post.model.js';
import UserModel from '../Models/User.model.js';

export const AddPost = async (req, res) => {
    try {
        // Find the user by ID and update the user's document
        let user = await UserModel.findByIdAndUpdate(req.user._id, {}, { new: true });
       
        const { content } = req.body;
       
        // Create a new post
        const post = await PostModel.create({
            content,
            user: user._id,
        });

        // Push the post ID to the user's posts array
        user.posts.push(post._id);

        // Save the user document
        await user.save();

        
        console.log("req.user ---", req.user);

        res.status(200).json({
            success: true,
            message: "Post Added Successfully",
            user:req.user.name
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const ShowPost = async (req, res) => {
    try {
        // Find the user by ID and populate the 'posts' field
        let userPosts = await UserModel.findOne({ _id: req.user._id }).populate("posts");

        
        
        if (!userPosts) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let ShowPost = await PostModel.find();

    //    res.status(201).json(ShowPost);

        res.status(200).json({
            success: true,
            user:userPosts,
            post:ShowPost,
            userName:req.user.name

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Import necessary modules

// Edit a post
export const EditPost = async (req, res) => {
    try {
        const { postId, content } = req.body;

        // Find the post by ID and update the content
        const updatedPost = await PostModel.findByIdAndUpdate(postId, { content }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a post
export const DeletePost = async (req, res) => {
    try {
        const { postId } = req.body;

        // Find the post by ID and delete it
        const deletedPost = await PostModel.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Remove the post ID from the user's posts array
        await UserModel.findByIdAndUpdate(req.user._id, { $pull: { posts: postId } });

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


