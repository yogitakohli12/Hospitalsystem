
const mongoose = require("mongoose")
const schemamedicine = new mongoose.Schema({
    name:{
        type:String
    },
    quantity:{
        type:Number
    }

})
const medicine = mongoose.model('medicine',schemamedicine)
module.exports=medicine;