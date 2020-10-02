const express = require('express');
const router = express.Router()

const {
    userById
} =require('../controllers/user')

const {requireSignin, isAuth, isAdmin} =require('../controllers/auth')

//Login with correct user with authentication
router.get("/secret/:userId",requireSignin,isAuth,isAdmin, (req,res)=>{
    res.json({
        user:req.profile
    });
});
router.param('userId', userById)

module.exports=router;