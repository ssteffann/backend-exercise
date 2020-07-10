const SensorService = require('../../services/sensor-service');
const buildRequestHandler = require('../helpers');

module.exports = buildRequestHandler((req) =>
  SensorService.deleteAllSensorData(req.query.sensorId),
);
