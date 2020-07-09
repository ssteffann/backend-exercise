const database = require('../database-instance');

const Schema = database.Schema;

/**
 * Sensor database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const SensorSchema = new Schema(
  {
    sensorId: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

SensorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

SensorSchema.set('toJSON', {
  getters: true,
});

SensorSchema.set('toObject', {
  getters: true,
});

const Sensor = database.model('sensor', SensorSchema);

module.exports = Sensor;
