const HTTP_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNEL_SERVER_ERROR: 500,
}

const CONSTANTS_TEXT = {
    SUCCESS: "Success",
    ERROR: "Error",
    LOGIN_SUCCESS: "Login success",
    USER_NOTFOUND: "User not found",
    INVALID_PASSWORD: "Password not valid",
    USER_EXIST:"User already exist",
    CREATE_USER: "Account created successfully",
    OTP_SENT: "OTP sent to the number",
    INVALID_OTP: "Invalid OTP",
    SENT_MAIL: "Sent mail",
    PASSWORD_UPDATED_SUCCESS: "Password updated successfully",
    PRODUCT_CREATE: "Product created successfully",
    PRODUCT_UPDATE: "Product updated successfully",
    PRODUCT_DELETE: "Product deleted successfully",
    PRODUCT_NOT_FOUND: "Product not found",
    OTP_TIMEOUT: "Otp timeout"
}

module.exports = { HTTP_CODE, CONSTANTS_TEXT }