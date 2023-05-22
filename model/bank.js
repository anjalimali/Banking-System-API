
const mongoose = require('mongoose')

const bankschema = new mongoose.Schema({
    name:{
        type:String,
        requird:true
    },
    email:{
        type:String,
        requird:true
    },
    password:{
        type:String,
        requird:true
    },
    creatAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('bank',bankschema)