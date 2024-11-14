const express = require('express');
const mongoose = require('mongoose');
const app = express();
const todoRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

mongoose.connect('mongodb+srv://absep98:0YbxQo6Zp71L3eQv@cluster0.nn6miwl.mongodb.net/todolistapp?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed');
})

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use('/api/users', todoRoutes);
app.use('/api/task', taskRoutes);

app.listen(8001, () => {
    console.log('Server is running on port 8001');
});
