const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WheaterData = new Schema({
    time: {
        type: String,
    },
    temperature: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    winddirection: {
        type: String,
    },
    windspeed: {
        type: Number,
    },
    atmpressure: {
        type: Number,
    },
});


const wheaterData = mongoose.model('weatherdata', WheaterData);

module.exports = wheaterData;