import UserModel from '../Models/User.model.js'
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
    
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login first"
            });
        }else{

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decoded",decoded);
            req.user = await UserModel.findById(decoded._id);
            // console.log(req.user);
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token"
        });
    }
}

// export const AllowUser=async()=>{
//     try {
        
//     } catch (error) {
        
//     }
// }