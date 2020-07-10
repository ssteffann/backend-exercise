const Threshold = require('../models/threshold');

/**
 * Handles database operations for the Threshold.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */

class ThresholdRepository {
  /**
   * Creates the Sensor.
   *
   * @param {Object} data
   */
  async create(data) {
    const [record] = await Threshold.create([
      {
        ...data,
      },
    ]);

    return this.findById(record.id);
  }

  /**
   * Deletes the Threshold.
   *
   * @param {string} id
   */
  async destroy(id) {
    return await Threshold.deleteOne({ _id: id });
  }

  /**
   * Finds the Threshold entry.
   *
   * @param {string} id
   */
  async findById(id) {
    return Threshold.findById(id);
  }

  /**
   * Get all thresholds.
   */
  async find() {
    return Threshold.find();
  }


  /**
   * Finds the Threshold by sensorId.
   *
   * @param {string} sensorId
   */
  async findBySensorId(sensorId) {
   const [ record ] = await Threshold.find({ sensorId });

   return record;
  }


  /**
   * Updates the Threshold.
   *
   * @param {Object} data
   */
  async update(id, data) {
    const info = await Threshold.updateOne(
      { _id: id },
      data,
    );

    const record = await this.findById(id);

    return record;
  }
}
module.exports = new ThresholdRepository();
