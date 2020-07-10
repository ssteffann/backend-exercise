const ThresholdService = require('../../services/threshold-service');
const buildRequestHandler = require('../helpers');

module.exports = buildRequestHandler((req) => {
  return ThresholdService.create(req.body);
});
