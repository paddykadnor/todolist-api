
const Bucket = require('../models/bucket.js');


// Create and Save a new bukcet
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "bucket name content can not be empty"
        });
    }

    // Create a bucket name
    const bukcet = new Bucket({
        name: req.body.name || "new bucket", 
        createdDate: new Date(),
        changeDate:new Date()
    });

    // Save Bucket in the database
    bukcet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the bucket list."
        });
    });
};

// Retrieve and return all Buckets from the database.
exports.findAll = (req, res) => {
    Bucket.find()
    .then(bucket => {
        res.send(bucket);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving bucket list."
        });
    });
};


// Find a single Bucket with a bucketId
exports.findOne = (req, res) => {
    Bucket.findById(req.params.bucketId)
    .then(Bucket => {
        if(!Bucket) {
            return res.status(404).send({
                message: "Bucket not found with id " + req.params.bucketId
            });            
        }
        res.send(Bucket);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bucket not found with id " + req.params.bucketId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Bucket with id " + req.params.bucketId
        });
    });
};

// Update a Bucket identified by the bucketId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Bucket content can not be empty"
        });
    }

    // Find Bucket and update it with the request body
    Bucket.findByIdAndUpdate(req.params.bucketId, {
        name: req.body.name || "Untitled Bucket",
    }, {new: true})
    .then(Bucket => {
        if(!Bucket) {
            return res.status(404).send({
                message: "Bucket not found with id " + req.params.bucketId
            });
        }
        res.send(Bucket);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bucket not found with id " + req.params.bucketId
            });                
        }
        return res.status(500).send({
            message: "Error updating Bucket with id " + req.params.bucketId
        });
    });
};

// Delete a Bucket with the specified bucketId in the request
exports.delete = (req, res) => {
    Bucket.findByIdAndRemove(req.params.bucketId)
    .then(Bucket => {
        if(!Bucket) {
            return res.status(404).send({
                message: "Bucket not found with id " + req.params.bucketId
            });
        }
        res.send({message: "Bucket deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Bucket not found with id " + req.params.bucketId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Bucket with id " + req.params.bucketId
        });
    });
};