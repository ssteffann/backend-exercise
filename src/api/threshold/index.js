module.exports = (router) => {
  router.post(`/threshold`, require('./create-threshold'));
  router.put(`/threshold/:id`, require('./update-threshold'));
  router.delete(`/threshold/:id`, require('./delete-threshold'));
  router.get(`/threshold`, require('./get-threshold'));
};
