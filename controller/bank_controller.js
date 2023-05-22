const Bank = require('../model/bank')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getbank = async (req,res)=>{
    try {
        const data = await Bank.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}

exports.postbank = async (req,res)=>{
    try {
        const Userexist = await Bank.findOne({email:req.body.email})
        if (Userexist) return res.status(400).json({errors:true,message:"user is alredy taken"})

        // encryption password
        const Salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password,Salt)

        const data = await Bank.create(req.body)
        return res.json({errors:false ,data:data})
        
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}

exports.putbank = async (req,res)=>{
    try {
        const data = await Bank.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}

exports.deletebank = async (req,res)=>{
    try {
        const data = await Bank.findByIdAndDelete(req.params.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}

exports.login = async (req,res)=>{
    try {
        const banckExist = await Bank.findOne({email:req.body.email})
        if (!banckExist) return res.json({errors:true, message:"email and password Invalid"})

        const validpassword = await bcrypt.compare(req.body.password,banckExist.password)
        if(!validpassword) return res.json({errors:true,message:"email and password Invalid"})
 
        const token = await jwt.sign({id:banckExist._id},process.env.SEC)
        return  res.json({errors:false, data:{token:token,user:banckExist}})

    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}