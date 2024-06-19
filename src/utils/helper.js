const checkOtpTimeOut = (otpTime) => {
    let currentTime = new Date()
    const differenceMs = currentTime - otpTime;

    // Convert milliseconds to seconds
    const differenceSeconds = Math.ceil(differenceMs / 1000);

    const minutes = 5;
    const expireTime = minutes * 60;

    return differenceSeconds < expireTime ? true : false

}

module.exports = { checkOtpTimeOut }