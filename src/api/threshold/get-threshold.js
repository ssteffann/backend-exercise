const ThresholdService = require('../../services/threshold-service');
const buildRequestHandler = require('../helpers');

module.exports = buildRequestHandler(() =>
  ThresholdService.getAll(),
);
