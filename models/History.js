const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    gameId: String, // To track history for specific games
    location: Number,
    value: String,
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
