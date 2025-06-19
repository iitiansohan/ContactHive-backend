const asyncHandler=require("express-async-handler");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require("../models/userModel");

/*@description Register a user
  route POST /api/users/register
  access public */

//the request body in register operation contains username,email and password
const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password)
    {
        res.status(400);//validation error
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});//search whether the email exists or not as email should be unique
    if(userAvailable){
        res.status(400);//validation error
        throw new Error("User already exists");
    }
    //Hash password
    const hashedPassword=await bcrypt.hash(password,10);//salt is not given explicitly and salt rounds is set to 10
    console.log("Hashed Password: ",hashedPassword);
    //hashed password is stored into the database as even if the database is exposed raw passwords are not exposed
    const user= await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user)
    {
        res.status(201).json({id: user.id, email: user.email});//user id and unique email is sent as response in json format
    }
    else
    {
        res.status(400);
        throw new Error("User data not valid");
    }
});

/*@description login user
  route POST /api/users/login
  access public */

//the request body in the login operation contains email and password
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
        res.status(400);//validation error
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});//search user by the unique email
    //compare password with hashed password
    if(user&&(await bcrypt.compare(password,user.password)))
    {
        //jwt.sign this version is sync as it returns a value not a promise
        const accessToken=jwt.sign({
            user:
            {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
        res.status(200).json({accessToken});//the access token is sent as a response 
    }
    else
    {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

/*@description current user info
  route GET /api/users/current
  access private */

const currentUser=asyncHandler(async (req,res)=>{
    res.json(req.user);
});


module.exports={ registerUser,loginUser,currentUser };