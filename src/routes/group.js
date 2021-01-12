
module.exports = (app) => {
    const group = require('../controllers/group.js');
    // Create a new group
    app.post('/group', group.getAll);

    // Retrieve all group
   app.post('/group/create', group.create);

    // Retrieve a single group with groupId
    app.post('/group/delete', group.delete);

    // // Update a group with groupId
    // app.put('/group/:groupId', group.update);

    // // Delete a group with groupId
    // app.delete('/group/:groupId', group.delete);
}