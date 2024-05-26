const UserModel = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getUser = async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log("cookie", cookies);

    if (!cookies.token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify the token to get the user ID
    const decodedToken = jwt.verify(cookies.token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Fetch user details from the database using the user ID
    const user = await UserModel.findById(userId).select('-password'); // Exclude the password field

    res.json({ cookies, user });
  } catch (error) {
    console.log("error getting user", error);
    res.status(500).json({ message: "Error getting user" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(302).json({ existing: true, message: "User already exists" });
    }

    const user = await UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      roles
    });

    res.status(201).json({ user, created: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server not available at UserController");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not registered", nonexist: true });
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Oops!!! Invalid Credentials", wrong: true });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME });

    const cookieExpiresTime = parseInt(process.env.COOKIE_EXPIRES_TIME, 10);
    if (isNaN(cookieExpiresTime)) {
      throw new Error("Invalid COOKIE_EXPIRES_TIME environment variable");
    }

    res.cookie("token", token, {
      expires: new Date(Date.now() + cookieExpiresTime * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ message: "Login Successful. Welcome Back", login: true, user });
  } catch (error) {
    console.error('Error at loginUser controller:', error);
    res.status(500).json({ message: "Error at loginUser controller" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error('Error at logoutUser controller:', error);
    res.status(500).json({ message: "Error at logoutUser controller" });
  }
};
