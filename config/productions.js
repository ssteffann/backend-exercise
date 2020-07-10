require('dotenv').config();

module.exports = {
  env: 'production',

  database: {
    /**
     * Connection URL for Mongoose
     * See https://mongoosejs.com/docs/index.html
     */
    connection: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rpe3c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  },

  /**
   * Configuration to allow email sending used on:
   * /src/services/email-sender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '"Example warning 👻" <foo@example.com>', // sender address,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },

  /**
   * When this email is set, all requests will automatically authenticate using this email.
   * Useful for testing purposes.
   */
  userAutoAuthenticatedEmailForTests: null,
};
