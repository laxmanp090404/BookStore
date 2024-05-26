const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username required"]
    }
    ,
    email:{
        type:String,
        required:[true,"Email required"],
        unique:[true,"user already exists"]
    },
    password:{
        type:String,
        required:[true,"Passsword required"],
    },
    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user'],
      }
},{
    timestamps:true
})



const User = mongoose.model("Users",UserSchema);
module.exports = User;