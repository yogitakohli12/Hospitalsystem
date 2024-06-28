const mongoose= require("mongoose");
const SchemaEmployee = new mongoose.Schema({
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
    
    position:{
    type:String
    },

    Address:{
        type:String
    },
    Gender:{
        type:String
    }
})
const Employee = mongoose.model('Employee' ,SchemaEmployee )
module.exports = Employee;
