const mongoose= require("mongoose");
const SchemaRecaptionist = new mongoose.Schema({
    name:{
        type:String
    },

    email:{
        type:String
    },
    passward:{
        type:Number
    },
    age:{
        type:Number
    },
    phone:{
        type:Number
    },
    salary:{
        type:Number
    },
    department:{
        type:String
    },

    Gender:{
        type:String
    },
})
const Recaptionist = mongoose.model('Recaptionist' ,SchemaRecaptionist )
module.exports = Recaptionist;
