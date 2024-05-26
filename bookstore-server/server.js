const express = require('express');
const app = express();
const mongoose  = require('mongoose')
const morgan = require('morgan')
const colors = require('colors')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const {dbConnect} = require("./Config/dbUtils")
require("dotenv").config()

const userRoute = require("./Routes/Users.routes")
const bookRoute  =require("./Routes/Book.routes")
const cartRoute = require("./Routes/Cart.routes")
//middlewares
app.use(express.json());
app.use(cors(
{
    origin:"*",
    methods:["GET","POST"],
    credentials:true,
    optionsSuccessStatus:200,
}
))
app.use(morgan('dev'))
//before route definition we need to put
app.use(cookieparser())
app.use(userRoute)
app.use(bookRoute)
app.use(cartRoute)


const PORT = process.env.PORT || 8000;
console.log("mongo url :",process.env.MONGO_URL)
dbConnect();

try {
    app.listen(PORT,()=>{
        console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgMagenta.black);
    });
} catch (error) {
    console.log(error);
    console.log("Failed to listen")
}
const requestDetect = (req,res,next)=>{
    console.log("User request received");
    next();
 }
 app.use(requestDetect)

app.get('/',(req,res)=>{
    res.status(200).send({'message':'node server'})
 })

 
