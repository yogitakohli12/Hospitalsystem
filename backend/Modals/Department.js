
const mongoose =require("mongoose")
const departmentSchema = new mongoose.Schema({
    sno:{
        type:Number
    },
    department:{
        type:String
    }
})

const department = mongoose.model("department",departmentSchema)
module.exports = department;