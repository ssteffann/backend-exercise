const SensorRepository = require('../database/repositories/sensor-repository');
const ThresholdService = require('./threshold-service')
const ValidationError = require('../errors/validation-error');

/**
 * Handles Sensor operations
 */
class SensorService {
  /**
   * Creates a Sensor data.
   *
   * @param {*} data
   */
  async create(data = {}) {
    if (!data.sensorId || !data.time) {
      throw new ValidationError();
    }

    const rows = await this.findAllSensorData({
      sensorId: data.sensorId,
      at: data.time,
    });

    if (rows.length) {
      throw new ValidationError(
        '`(sensorId, time)` pairings should be unique',
        409,
      );
    }

    const record = await SensorRepository.create(data);

    ThresholdService.checkSensorValue(record.sensorId, record.value)

    return record;
  }

  /**
   * Finds Sensor data based on the query.
   *
   * @param {*} args
   */
  async findAllSensorData(args) {
    return SensorRepository.findAll(args);
  }

  /**
   * Deletes the Sensor data.
   *
   * @param {string} sensorId
   */
  async deleteAllSensorData(sensorId) {
    if (!sensorId) {
      throw new ValidationError();
    }
    return SensorRepository.destroy(sensorId);
  }
}

module.exports = new SensorService();
