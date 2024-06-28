const mongoose= require("mongoose");
const SchemaDoctor = new mongoose.Schema({
    name:{
        type:String
    },

    email:{
        type:String,
       
    },
    passward:{
        type:String
    },
    special:{
        type:String
    },
    phone:{
        type:Number
    },
    age:{
        type:Number
    },
    Address:{
        type:String
    },
    Gender:{
        type:String
    },
    experienced:{
        type:String
    }
})
const Doctor = mongoose.model('Doctor' ,SchemaDoctor )
module.exports = Doctor;
