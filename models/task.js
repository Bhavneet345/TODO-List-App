const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    
    deadline: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;