
const mongoose= require("mongoose");

const SchemaPatient = new mongoose.Schema({
    patientname:{
        type:String,
    },
    doctor:{
        type:String,
    },
    patientemail:{
        type:String,
       unique:true
    },
    patientpassward:{
        type:String
    },
    medicine:{
        type:String
    },
    age:{
        type:Number
    },
    phone:{
        type:Number
    },
    disease:{
        type:String
    },
    Address:{
        type:String
    },
    Gender:{
        type:String
    }
   
})

const Patient = mongoose.model('Patient' ,SchemaPatient )
module.exports = Patient;
