const SensorService = require('../../services/sensor-service');
const buildRequestHandler = require('../helpers');

module.exports = buildRequestHandler((req) => {
  return SensorService.create(req.body);
});
