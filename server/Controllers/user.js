import UserModel from '../Models/User.model.js'
import bcrypt from 'bcrypt';
import { sendCookie } from '../utils/sendCookie.js';

//register controllers........

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if password is provided
    if (!password || !email || !name) {
      return res.status(400).json({ success: false, message: "All field is required" });
    }

    let userData = await UserModel.findOne({ email });

    if (userData) {
      return res.status(400).json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userData = await UserModel.create({ name, email, password: hashedPassword });

    // Once user is successfully created, send the JWT token as a cookie
    sendCookie(userData, res, "User registered successfully", 201);

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}



//user login controller........

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userData = await UserModel.findOne({ email }).select("+password");


    if (!userData) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    console.log(isPasswordValid, userData)


    sendCookie(userData, res, `Logged in successfully, ${userData.name}`, 200);

  
  } catch (error) {
return res.status(500).json({
      sucess: false,
      message: "Internal server error"
    })
  }
}

//get user details .............

export const getUserDetails = async (req, res) => {
  try {

    let user = await UserModel.findById(req.user._id);

    res.status(200).json({
      sucess: true,
      user: user
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "internal server error"
    })
  }
}

//logout and clear cookie.............

export const logout = async (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty string and setting its expiration to a past date
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
