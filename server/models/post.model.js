var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    subject: {
        type: String
    },
    content: {
        type: String
    },
    whenPosted: {
        type: Date
    },
    data: {
        type: Object
    }
});

module.exports = mongoose.model('Posts', PostSchema);
