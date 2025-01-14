const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const generateToken = (id)=>{
    return jwt.sign({id},
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
}

//Register new user
const registerUser = asyncHandler (async (req, res)=>{
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});
    if(!userExist){
        res.status(400);
        throw new Error('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._Id),
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }
});

//Authenticate user and get token
const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req. body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

//Get user profile
const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found')
    }
});
module.exports = {registerUser, authUser, getUserProfile}