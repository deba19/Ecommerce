const express = require('express');
const mongoose=require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
require("dotenv").config();
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');

const expressValidator = require('express-validator')

//app
const app= express();

//DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true
}).then(()=> console.log("Database connected"))

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Routes Middleware
app.use("/api",authRoutes)
app.use("/api",userRoutes)

const port=process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});