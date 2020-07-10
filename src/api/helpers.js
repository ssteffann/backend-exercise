const buildRequestHandler = (callback) => {
  if (!callback) {
    throw new Error('Callback is missing');
  }

  return async (req, res) => {
    try {
      const payload = await callback(req);

      res.status(200).send(payload);
    } catch (error) {
      if ([400, 403, 404, 409].includes(error.code)) {
        return res.status(error.code).send(error.message);
      }

      return res.status(500).send(error.message);
    }
  }
}

module.exports = buildRequestHandler;
