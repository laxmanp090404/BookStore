// Middlewares/verifyUser.js
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token); 

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid JWT token' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = verifyUser;
