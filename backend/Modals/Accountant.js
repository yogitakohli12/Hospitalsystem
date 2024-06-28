const mongoose= require("mongoose");
const SchemaAccountants = new mongoose.Schema({
    name:{
        type:String
    },

    email:{
        type:String
    },
    age:{
        type:Number
    },
    phone:{
        type:Number
    },
    salary:{
        type:String 
    },

    department:{
        type:String
    },
})
const Accountants = mongoose.model('Accountant' ,SchemaAccountants )
module.exports = Accountants;
