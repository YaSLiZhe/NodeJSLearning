const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

class Email {
  constructor(user, url) {
    //set email properties based on the user and URL provided
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `ZHE LI<${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(templates, subject) {
    // Render HTML from Pug template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${templates}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    const options = {
      wordwrap: 130,
      // ... other options
    };

    // Convert HTML to text
    const text = htmlToText(html, options);

    // Create mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
      html,
    };

    // Create a transporter using newTransport function
    const transporter = this.newTransport();

    // Send the email
    await transporter.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to NaTours');
  }

  async sendPasswordReset() {
    await this.send(
      'forgetPassword',
      'Your password reser token valid for 10 mins'
    );
  }
}
module.exports = Email;
