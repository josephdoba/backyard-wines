"use strict";
const nodemailer = require("nodemailer");

const mailSender = async (from,to,message) => {
  // setup test account
  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);

  // create email/transporter object:
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    }
  });

  let info = await transporter.sendMail({
    from: from, // sender address, will be a SQL query of the users email.
    to: to, // the businesses email address
    subject: 'New message from Backyard Wines App',
    text: message, // the text that the user inputs
    html: `<p>${message}</p>`
  });

  console.log("Message sent %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  mailSender().catch(console.error);

};

module.exports = { mailSender };
