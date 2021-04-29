const express = require('express');
const taskController = require('../controllers/taskController');
const columnController = require('../controllers/columnController');
const userController = require('../controllers/userController');

const Router = express.Router();

// User Routes

Router.post('/adduser', userController.addUser);
Router.post('/user', userController.login);

// Column Routes

Router.post('/addcolumn', columnController.addColumn);
Router.get('/getallusercolumns/:id', columnController.getallUserColumn);
Router.put('/updatecolumn/:id', columnController.updateColum);
Router.delete('/deletecolumn/:id', columnController.deleteColumn);

// Task Routes
Router.post('/addtask', taskController.addTask);
Router.get('/getall', taskController.getAll);
Router.put('/updatetask/:id', taskController.updateTask);
Router.delete('/deletetask/:id', taskController.deleteTask);

module.exports = Router;
