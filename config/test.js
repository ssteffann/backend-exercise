require('dotenv').config();

module.exports = {
  env: 'test',

  database: {
    /**
     * Connection URL for Mongoose
     * See https://mongoosejs.com/docs/index.html
     */
    connection: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rpe3c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    transactions: false,
  },

  /**
   * Configuration to allow email sending used on:
   * /src/services/email-sender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    auth: {
      user: 'mock',
    },
  },

  /**
   * When this email is set, all requests will automatically authenticate using this email.
   * Leave null for test environment.
   */
  userAutoAuthenticatedEmailForTests: null,
};
