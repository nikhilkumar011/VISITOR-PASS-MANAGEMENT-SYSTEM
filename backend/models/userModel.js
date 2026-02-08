const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
       type:String,
       required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("user",userSchema)