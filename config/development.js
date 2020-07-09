require('dotenv').config();

module.exports = {
  env: 'localhost',

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
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: '<insert client url here>',

  /**
   * When this email is set, all requests will automatically authenticate using this email.
   * Useful for testing purposes.
   */
  userAutoAuthenticatedEmailForTests: null,
};
