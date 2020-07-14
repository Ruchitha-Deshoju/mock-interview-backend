const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    interview_type: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    mentor_name: {
        type:String,
        required: true,
        trim:true,
        lowercase: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Task