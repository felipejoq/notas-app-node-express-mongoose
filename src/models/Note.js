const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, require: true },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    date: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Note', noteSchema);
