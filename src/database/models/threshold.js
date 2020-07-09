const database = require('../database-instance');

const Schema = database.Schema;

/**
 * Sensor database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const ThresholdSchema = new Schema(
  {
    sensorId: {
      type: String,
      ref: 'sensor',
    },
    min_value: {
      type: Number,
      required: true,
    },
    max_value: {
      type: Number,
      required: true,
    },
  },
);

ThresholdSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ThresholdSchema.set('toJSON', {
  getters: true,
});

ThresholdSchema.set('toObject', {
  getters: true,
});

const Threshold = database.model('threshold', ThresholdSchema);

module.exports = Threshold;
