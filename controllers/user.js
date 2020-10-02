const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt= require('jsonwebtoken');
const expressjwt = require('express-jwt');
//const {errorHandler}=require("../helpers/dbErrorHandler")


exports.signup = (req,res)=>{

    //res.json({message:"Hello Debas"})
    //console.log(req.body)
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password=undefined;
        res.json({
            user
        })
    })
};


exports.signin=(req,res)=>{
    //find user based on email
    const{email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err || !user)
        return res.status(400).json({
            err:'User with that email does not exit'
        })

        //If user is found
        // Create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Email ans Password does not match'
            });
        }

        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        //presist the token as 't' in cookie with expire date
        
        res.cookie('t',token,{expire:new Date()+9999});

        const{_id, name, email, role}=user;
        return res.json({token, user:{_id, email, name, role}});
    })
};


exports.signout=(req,res)=>{
    res.clearCookie('t')
    res.json({message:"Signout Success"})
}