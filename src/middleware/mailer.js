const nodemailer = require("nodemailer");
const { errorHandler, successHandler } = require("../utils/responseHandler");

const sendEmail = (email, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: "465",
    auth: {
      user: "",
      pass: "",
    },
  });

  var mailOptions = {
    from: "",
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return errorHandler({}, {}, 400, "error", error);
    } else {
      return ;
    }
  });
};

module.exports = sendEmail;
