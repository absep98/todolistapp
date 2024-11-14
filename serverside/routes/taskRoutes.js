const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel');



router.post('/add-task', async(req, res) => {
    try {
        const taskExists = await Task.findOne({title : req.body.title});
        if(taskExists){
            res.send({
                success: false,
                message: 'Task already exists..!!'
            });
        }
        const newTask = await Task(req.body);
        await newTask.save();
        res.send({
            success: true,
            message: 'Task added successfully..!!'
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-tasks', async(req, res) => {
    try {
        const tasks = await Task.findOne({});
        console.log(tasks);
        res.send({
            success: true,
            message: 'Listed all tasks..!',
            data: tasks
        })
    } catch (error) {
        console.log(error);
    }
});

router.put('/update-task', async(req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.delete('/delete-task', async(req, res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;