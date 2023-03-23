const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')


mongoose.set('strictQuery', false)
const app = express()
dotenv.config()

app.get('/getUser' , async(req,res)=>{
    try {
        const users = User.find()
        res.status.json(users)
    } catch (error) {
        res.status(500).json({message : error});
    }
} )
app.post('/postUser',async(req,res)=>{
    try {
        const user = req.body ; 
        const newUser = await User.create({
            name : user.name , email : user.email  , password : user.password , Role
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message : error});
    }
})
app.put('/putUser',async(req,res)=>{
    try {
        const userID = req.params ; 
        const infos = req.body ; 
        const updateduser = await User.findById({id : userID}).updateOne({name : infos.name , password : infos.password , email : infos.email });
        res.status(200).json(updateduser);
        
    } catch (error) {
        res.status(500).json({message : error});
    }
})
app.delete('/delUser',async(req,res)=>{
    try {
        const ID = req.params ; 
        await User.findById({id : ID}).deleteOne()
        res.status(200)
        
    } catch (error) {
        res.status(500).json({message : error});
    }
})


mongoose.connect(process.env.DBURL,()=>{
    console.log("DB connected")
})

app.listen(process.env.URL,()=>{
    console.log(`Server is running on ${process.env.URL}`)
})