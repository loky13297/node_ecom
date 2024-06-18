
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio");

const sendSms = (mobileNumber, otp) => {
    client(accountSid, authToken).messages.create({
        body: `Hi your OTP is ${otp}`,
        to: `+91${mobileNumber}`, // Text your number
        from: process.env.TWILIO_NUMBER, // From a valid Twilio number
    })
        .then(() => {
            return;
        });
};


const otpGenerate = (otp_length = 4) => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

module.exports = { otpGenerate, sendSms };
