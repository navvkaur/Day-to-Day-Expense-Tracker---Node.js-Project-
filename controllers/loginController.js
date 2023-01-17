require('dotenv').config();
const path = require('path');

const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id,name:name,ispremiumuser:ispremiumuser},process.env.SECRET_KEY);
}

exports.signin = async (req,res,next)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const password = req.body.password;
try{
    const saltrounds= 10;
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
const user = await User.create({
        fname:fname,
        lname:lname,
        username : username,
        password:hash
    })
    res.status(201).json({ newUserLogin: user})
    console.log(user);
    })
}catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
}
}

exports.login = async(req,res,next)=>{
    console.log(process.env);
    const username = req.body.username;
    const password = req.body.password;

    const user = User.findAll({where:{username}})
    .then(user=>{
        if(user.length >0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result===true){
                   return res.status(200).json({ success:true, message: "Login Successfully",token:generateAccessToken(user[0].id,user[0].name,user[0].ispremiumuser)});
                }
                if(err)
                {
                    throw new Error("Something went wrong");
                }
                else
                {
                    return res.status(400).json({success:false, message: "Incorrect Password"});
                }
            })          
        }
        else{
           return  res.status(404).json({ success:false,message: "User does not exist! Signup first"});
    }
    
    })
.catch((err)=> {
    console.log(err);
    res.status(500).json({ error: err ,success:false});
});
}
