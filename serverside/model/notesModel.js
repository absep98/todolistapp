const mongoose = require('mongoose');
const notesModel = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trime: true
    }
},{
    collection: 'notes',
    timestamps: true
}
);


module.exports = mongoose.model('Notes', notesModel)