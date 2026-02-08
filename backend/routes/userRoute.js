const express = require('express');

const userRoute = express.Router();
const {signup,login,getAllUsers,deleteUser} = require('../controllers/userController.js')
const authmiddleware = require('../middlewares/authmiddleware.js')


userRoute.post('/signup',signup);

userRoute.post('/login',login);

userRoute.get('/getallusers',getAllUsers)

userRoute.delete('/deleteuser',deleteUser);

userRoute.get('/visitordashboard',authmiddleware,(req,res)=>{
    res.json({"message":"allowed"})
})
userRoute.get('/admindashboard',authmiddleware,(req,res)=>{
    res.json({"message":"allowed"})
})
userRoute.get('/securitydashboard',authmiddleware,(req,res)=>{
    res.json({"message":"allowed"})
})
userRoute.get('/employeedashboard',authmiddleware,(req,res)=>{
    res.json({"message":"allowed"})
})


module.exports = userRoute;