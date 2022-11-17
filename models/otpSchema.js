const mongoose = require("mongoose") ; 

const OTPSchema = mongoose.Schema({
    OTP : {
        type: String 
    } , 
    email : {
        type : String , 
        required: true , 
        unique : true
    } , 
    password : {
        type: String , 
        required : true 
    } , 
    name : {
        type: String , 
        required : true 
    } 
}, {
    timestamps : true 
}) ; 


OTPSchema.index({createdAt: 1},{expireAfterSeconds: 120});

const OTP = mongoose.model("OTP" , OTPSchema) ; 

module.exports = OTP ; 

