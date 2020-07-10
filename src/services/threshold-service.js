const ThresholdRepository = require('../database/repositories/threshold-repository');
const ValidationError = require('../errors/validation-error');
const EmailSender = require('./email-sender');
/**
 * Handles Sensor operations
 */
class ThresholdService {
  constructor() {
    this.emailSender = new EmailSender();
  }
  /**
   * Creates a Threshold.
   *
   * @param {Object} data
   */
  async create(data = {}) {
    if (
      !data.sensorId ||
      !data.minValue ||
      !data.maxValue ||
      !data.email
    ) {
      throw new ValidationError(
        '"sensorId", "minValue", "maxValue", "email" - are required fields',
      );
    }

    const threshold = await this.findBySensorId(
      data.sensorId,
    );

    if (threshold) {
      throw new ValidationError(
        'You already set a threshold for this sensor, please update it',
        409,
      );
    }

    const record = await ThresholdRepository.create(data);

    return record;
  }

  /**
   * Finds Threshold for a Sensor.
   *
   * @param {string} sensorId
   */
  async findBySensorId(sensorId) {
    return ThresholdRepository.findBySensorId(sensorId);
  }

  /**
   * Check values from sensor.
   *
   * @param {string} sensorId
   * @param {number} sensorValue
   */
  async checkSensorValue(sensorId, sensorValue) {
    const threshold = await ThresholdRepository.findBySensorId(
      sensorId,
    );

    if (!threshold) {
      return;
    }

    const email = {
      to: threshold.email,
      subject: 'Sensor Warning !!',
      html: `<h1>Sensor Warning !!</h1> <h3>Sensor Id: ${sensorId} has value ${sensorValue}</h3>`,
    };

    if (sensorValue < threshold.minValue) {
      email.html = `${email.html} <p>Sensor value is below your threshold : ${threshold.minValue}</p>`;

      return this.emailSender.send(email);
    }

    if (sensorValue > threshold.maxValue) {
      email.html = `${email.html} <p>Sensor value is above your threshold : ${threshold.maxValue}</p>`;

      return this.emailSender.send(email);
    }
  }

  /**
   * Deletes the Threshold.
   *
   * @param {string} id
   */
  async deleteThreshold(id) {
    return ThresholdRepository.destroy(id);
  }

  /**
   * Update the Threshold.
   *
   * @param {string} id
   * @param {Object} data
   */
  async updateThreshold(id, data) {
    return ThresholdRepository.update(id, data);
  }

  /**
   * Get all thresholds.
   */
  async getAll() {
    return ThresholdRepository.find();
  }
}

module.exports = new ThresholdService();
