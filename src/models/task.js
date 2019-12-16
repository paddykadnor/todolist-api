const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: String,
    bId:Object,
    taskCheck:Boolean,
    createdDate:Date,
    changeDate:Date
});

module.exports = mongoose.model('task', taskSchema);