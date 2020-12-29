const mongoose = require('mongoose');

const QrSchema = mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true},
    date: { type: Date, default: Date.now },
    nanoid: { type: String, required: true },
    uriFinalQr: { type: String, required: true },
})

module.exports = mongoose.model('Qr', QrSchema);