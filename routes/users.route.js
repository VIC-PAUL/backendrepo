const express=require('express');
const {userModel}=require("../model/users.model")

const usersRoute=express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

usersRoute.use(express.json());

usersRoute.post('/register', async (req,res) => {
    const {name,email,gender,password}=req.body;

    try{
        const getUser=await userModel.find({email});
        if(getUser.length>0){
            res.send("Already registered");
        }else{
            bcrypt.hash(password, 8, async(err, hashed)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const user = new userModel({name,email,gender,password:hashed});
                    await user.save();
                    res.send("Successfully registered")
                }
            })
        }
    }
    catch(err){
        console.log(err);
        console.log("Error occurred")
    }
})


usersRoute.post('/login', async (req,res) => {
    const {email,password}=req.body;

    try{
        const user=await userModel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{
                if(err){
                    console.log(err)
                }
                else if(result){
                    const token=jwt.sign({userID:user[0]._id},"victor");
                    res.send([{"msg":"Logged in successfully", "token":token , "name":user[0].name}])
                }
            })
        }
    else{
        res.send([])
    }
    }
    catch(err){
        console.log(err);
        console.log("Error occurred")
    }
})



module.exports ={
    usersRoute
}