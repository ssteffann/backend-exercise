module.exports = (router) => {
  router.put(`/sensor-data`, require('./create-data'));
  router.delete(`/sensor-data`, require('./delete-data'));
  router.get(`/sensor-data`, require('./get-data'));
};
