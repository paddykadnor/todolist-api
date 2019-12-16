const Task = require('../models/task.js');


// Create and Save a new task
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "task name content can not be empty"
        });
    }

    // Create a task name
    const task = new Task({
        name: req.body.name || "new task", 
        bId:req.body.bId,
        taskCheck:req.body.taskCheck, 
        createdDate: new Date(),
        changeDate:new Date()
    });

    // Save Task in the database
    task.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the task list."
        });
    });
};

// Retrieve and return all Buckets from the database.
exports.findAll = (req, res) => {
    Task.find()
    .then(task => {
        res.send(task);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving task list."
        });
    });
};


// Find a single Task with a taskId
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
    .then(Task => {
        if(!Task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });            
        }
        res.send(Task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Task with id " + req.params.taskId
        });
    });
};

// Update a Task identified by the taskId in the request
exports.update = (req, res) => {
    

    // Find Task and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        name: req.body.name || "Untitled Task",
        taskCheck:req.body.taskCheck || false
    }, {new: true})
    .then(Task => {
        if(!Task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send(Task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error updating Task with id " + req.params.taskId
        });
    });
};

// Delete a Task with the specified taskId in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
    .then(Task => {
        if(!Task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send({message: "Task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Task with id " + req.params.taskId
        });
    });
};