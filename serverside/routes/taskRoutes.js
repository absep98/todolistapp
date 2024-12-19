const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel');



router.post('/add-task', async (req, res) => {
    try {
      const newTask = new Task(req.body);
      const savedTask = await newTask.save(); // This includes the `_id`
      res.send({
        success: true,
        message: "Task added successfully",
        data: savedTask, // Send the saved task back to the client
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  });
  

router.get('/get-tasks', async(req, res) => {
    try {
        const tasks = await Task.find({});
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

router.put('/update-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        res.send({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

router.delete('/delete-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).send({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;