const mongoose = require('mongoose')


const User = mongoose.Schema({
    name : String , 
    email : {type : String,
    required : true , 
    unique : true},

    password : {
        type : String , 
        required : true 
    },
    Role : {
        type : String,
        dr : ["user","admin"], 
        default : "user"
    }
})

module.exports = mongoose.model('User',User)