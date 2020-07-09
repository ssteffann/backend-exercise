const database = require('./database-instance');

const config = require('../../config')();

/**
 * Initializes the connection to MongoDB
 */
const init = async () => {
  /**
   * If the connection is already established,
   * returns the mongoose instance.
   */
  if (database.connection.readyState) {
    return database;
  }

  /**
   * Connects to MongoDB
   */
  return database
    .connect(config.database.connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected'))
    .then(() => database);
};

/**
 * Before each request it checks if the connection is established,
 * if not, connects.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const middleware = async (req, res, next) => {
  try {
    await init();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
  return next();
};

exports.init = init;
exports.middleware = middleware;
