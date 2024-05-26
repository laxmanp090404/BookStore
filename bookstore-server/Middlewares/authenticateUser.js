const jwt = require("jsonwebtoken");
const User = require('../Models/User.model');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("Token not found in cookies");
      return res.status(401).json({
        message: "Login first to handle this resource",
        success: false,
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("User not found with ID:", decoded.userId);
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    console.log("Authenticated user:", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Authorization error:", error);
    return res.status(401).json({
      message: "Authorization failed",
      success: false,
    });
  }
};
