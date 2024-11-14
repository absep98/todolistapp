const express = require('express');
const router = express.Router();
const Todo = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const userExists = await Todo.findOne({ email : req.body.email });        
        if(userExists) {
            res.send({
                success: false,
                message: 'User already exists'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = await Todo(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "User created successfully!"
        });
    } catch (error) {
        console.log(error);
    }
});


router.post('/login', async(req, res) => {
    try {
        const user = await Todo.findOne({
            email: req.body.email
        });
        if(!user){
            res.send({
                success: false,
                message: 'User not found, Please register first..!!'
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            res.send({
                success: false,
                message: 'Invalid password..!!'
            })
        }
        
        const token = jwt.sign({ userId : user._id } , `${process.env.SECRET_KEY}`, { expiresIn: '2d' } );
        
        res.send({
            success: true,
            user: user,
            message: 'User logged in successfully..!!',
            token: token
        });
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;