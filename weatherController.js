const weatherData = require('./weatherData');

module.exports = {

    save(req, res, next) {
        var request = req.body;
        var WeatherData = new weatherData({
            time: request.Timestamp.Seconds,
            temperature: request.Temperature,
            humidity: request.Humidity,
            winddirection: request.WindDirection,
            windspeed: request.WindSpeed,
            atmpressure: request.AtmosphericPressure
        });

        console.log(WeatherData);

        WeatherData.save().then(() => {
            res.status(200).send({ message: 'ACK' });
        });
    }
}