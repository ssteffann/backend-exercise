const config = require('../../config')();
const assert = require('assert');
const nodemailer = require('../nodemailer/nodemailer')();

/**
 * Handles Email sending
 */
class EmailSender {
  constructor() {

    // if email config is not set generate test SMTP service account from ethereal.email
    if (!EmailSender.isConfigured) {
      nodemailer.createTestAccount().then((testAccount) => {
        this.emailConfig = {
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        };
      });
    }
  }

  async send(email) {
    assert(email, 'email is required');
    assert(email.to, 'email.to is required');
    assert(email.subject, 'email.subject is required');
    assert(email.html, 'email.html is required');

    const transporter = nodemailer.createTransport(
      this.transportConfig,
    );

    const mailOptions = {
      from: this.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));

    return info;

  }

  static get isConfigured() {
    return !!config.email && !!config.email.host;
  }

  get transportConfig() {
    return EmailSender.isConfigured ? config.email : this.emailConfig;
  }

  get from() {
    return config.email.from;
  }
};

module.exports = EmailSender;
