const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    speaker: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    
    description: {
        type: String,
        required: false,
    },
    video_url: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Sermon', sermonSchema);