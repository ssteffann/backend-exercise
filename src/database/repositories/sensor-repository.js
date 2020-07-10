const Sensor = require('../models/sensor');

/**
 * Handles database operations for the Sensor.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */

class SensorRepository {
  /**
   * Creates the Sensor.
   *
   * @param {Object} data
   */
  async create(data) {
    const [record] = await Sensor.create([
      {
        ...data,
      },
    ]);

    return this.findById(record.id);
  }

  /**
   * Deletes the Sensor data.
   *
   * @param {string} sensorId
   */
  async destroy(sensorId) {
    return await Sensor.deleteMany({ sensorId });
  }

  /**
   * Finds the Sensor entry.
   *
   * @param {string} id
   */
  async findById(id) {
    return Sensor.findById(id);
  }

  /**
   * Finds the Customers based on the query.
   * See https://mongoosejs.com/docs/queries.html to learn how
   * to customize the queries.
   *
   * @param {Object} query
   * @param {string} query.sensorId
   * @param  {number} query.since
   * @param  {number} query.until
   * @param  {number} query.at
   *
   * @returns {Promise<Object>} response - Object containing the rows.
   */
  async findAll(query = {}) {
    const { sensorId, since, until, at } = query;

    const criteria = {};

    if(sensorId) {
      criteria.sensorId = sensorId;
    }

    if (since) {
      criteria.time = {
        ...criteria.time,
        $gte: since
      }
    }

    if (until) {
      criteria.time = {
        ...criteria.time,
        $lte: until
      }
    }

    if (at) {
      criteria.time = at;
    }

    const rows = await Sensor.find(criteria);

    return rows;
  }
}

module.exports = new SensorRepository();
