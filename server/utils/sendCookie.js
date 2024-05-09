import jwt from 'jsonwebtoken';

export const sendCookie = (User, res, message, status = 200) => {
    try {

        const payload = {
            _id:User._id,
            timeStamp:Date.now()
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(status).cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            secure: true, // if you're using HTTPS
            sameSite: 'strict'
        }).json({
            success: true,
            message: message || "Cookie sent successfully" // Use the provided message or a default one
        });
    } catch (error) {
        console.error("Error generating JWT:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
