const mongoose= require("mongoose");
const SchemaLab = new mongoose.Schema({
    name:{
        type:String
    },

    email:{
        type:String
    },
    Honour:{
        type:String
    },
    phone:{
        type:Number
    },

    department:{
        type:String
    },
})
const Lab = mongoose.model('Lab' ,SchemaLab )
module.exports = Lab;
