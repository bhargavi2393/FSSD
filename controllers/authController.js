const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const registerUser = async(req, res) =>{

    try{
        const {name, email, password} =  req.body;
        const userExist = await User.findOne({email});
        
        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword});
        res.status(201).json({message:"User registered successfully", user});

    }catch(error){
        res.status(500).json({message:error, message});

}

}

const loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.json({message:"login successful", token})
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
    
};

const updateUser = async(req, res) =>{
    try{
        const {name} = req.body;
        const updateUser = await User.findByIdAndUpdate(req.user.id, {name}, {new:true});
        res.json({message:"User updated successfully", updateUser});
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};

const deleteUser = async(req, res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.user.id);

        if(!deletedUser){
            return res.status(404).json({message:"User is not available"})
        }
        res.json({message:"User is deleted successfully"})
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
}

module.exports = {registerUser, loginUser, updateUser, deleteUser};
 