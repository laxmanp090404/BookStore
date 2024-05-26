const express = require("express");
const router = express.Router();
const Usercontroller = require("../Controllers/User.controller")

router.get("/api/getuser",Usercontroller.getUser)
router.post("/api/createuser",Usercontroller.createUser);
router.post("/api/loginuser",Usercontroller.loginUser);
router.post("/api/logout", Usercontroller.logoutUser); // New route for logout
module.exports = router;
