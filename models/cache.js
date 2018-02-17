const mongoose = require('mongoose');
const CacheSchema = mongoose.Schema({
    'key': {type: String, unique: true, required: true},
    'value': String,
    'expiryDate': Date
},{timestamps: true});

module.exports = mongoose.model('Cache', CacheSchema);