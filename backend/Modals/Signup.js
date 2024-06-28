const mongoose= require("mongoose");
const Schemasignup = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique: true
    },

    password:{
        type:String,
        required:true
    },
    images:[{
        type:String
      }],

    phone:{
        type:Number,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
   
    date:{
        type:Date,
        dafault:Date.now
    }

});

const Signup = mongoose.model('Signup' ,Schemasignup )
module.exports = Signup;

