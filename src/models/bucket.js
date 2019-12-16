const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    name: String,
    createdDate:Date,
    changeDate:Date
});

module.exports = mongoose.model('bucket', bucketSchema);