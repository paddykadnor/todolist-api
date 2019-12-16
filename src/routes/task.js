
module.exports = (app) => {
    const task = require('../controllers/task.js');

    // Create a new task
    app.post('/task', task.create);

    // Retrieve all task
    app.get('/task', task.findAll);

    // Retrieve a single task with taskId
    app.get('/task/:taskId', task.findOne);

    // Update a task with taskId
    app.put('/task/:taskId', task.update);

    // Delete a task with taskId
    app.delete('/task/:taskId', task.delete);
}