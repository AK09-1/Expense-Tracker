const nodemailer = require("nodemailer");
const { getMaxListeners } = require("nodemailer/lib/xoauth2");

const emailManager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "smtp.rediffmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
     tls: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  }
  });

  await transport.sendMail({
    to,
    from: "ambar_dixit@rediffmail.com",
    subject,
    text,
    html,
    
  });
};

module.exports = emailManager;
