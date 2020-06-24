const grpc = require('grpc');
const mongoose = require('mongoose');
const data = require('./weatherData');


const PROTO_PATH = __dirname + '/service.proto';

const protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var proto = grpc.loadPackageDefinition(packageDefinition).weatherstation;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/weatherstation', { useNewUrlParser: true });

function main() {
    var server = new grpc.Server();
    server.addService(proto.WeatherDataSender.service, { sendData: sendData });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

function sendData(call, callback) {
    var request = call.request;
    var weatherData = new data({
        time: request.time.seconds,
        temperature: request.temperature,
        humidity: request.humidity,
        winddirection: request.windDirection,
        windspeed: request.windspeed,
        atmpressure: request.atmPressure
    });

    console.log(weatherData);

    weatherData.save().then(() => {
        callback(null, { message: 'ACK ' + Date.now() });
    });
}