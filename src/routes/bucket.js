
module.exports = (app) => {
    const bucket = require('../controllers/bucket.js');


    // Create a new bucket
    app.post('/bucket', bucket.create);

    // Retrieve all bucket
    app.get('/bucket', bucket.findAll);

    // Retrieve a single bucket with bucketId
    app.get('/bucket/:bucketId', bucket.findOne);

    // Update a bucket with bucketId
    app.put('/bucket/:bucketId', bucket.update);

    // Delete a bucket with bucketId
    app.delete('/bucket/:bucketId', bucket.delete);
}