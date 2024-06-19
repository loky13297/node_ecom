const authSchema = require("../model/auth.schema");
const { HTTP_CODE, CONSTANTS_TEXT } = require("../utils/constant");
const { loginToken } = require("../middleware/authentication");
const sendEmail = require("../middleware/mailer");
const { textEncrypt, textDecrypt } = require("../middleware/textEncrypt");
const { sendSms, otpGenerate } = require("../utils/otpGenerator");
const pagination = require("../utils/pagination");
const { checkOtpTimeOut } = require("../utils/helper");

//userlogin service
const userLoginService = async (req, res) => {
    try {
        const checkUserLogin = await authSchema.findOne({
            $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }]
        });
        if (checkUserLogin && !checkUserLogin.isDelete) {
            let originalPass = textDecrypt(checkUserLogin?.password);
            if (req.body.password === originalPass) {
                let data = {
                    emailId: checkUserLogin.emailId,
                    mobileNumber: checkUserLogin.mobileNumber,
                    token: loginToken(checkUserLogin),
                };
                return {
                    error: false,
                    status: HTTP_CODE.SUCCESS,
                    message: CONSTANTS_TEXT.LOGIN_SUCCESS,
                    data: data
                }
            } else {
                return {
                    error: true,
                    status: HTTP_CODE.BAD_REQUEST,
                    message: CONSTANTS_TEXT.INVALID_PASSWORD,
                    data: {}
                }
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_NOTFOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}


//create new user service
const createNewUserService = async (req, res) => {
    try {
        let checkUser = await authSchema.findOne({ $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }] })
        if (!checkUser) {
            req.body.password = textEncrypt(req.body.password);
            req.body.confirmPassword = textEncrypt(req.body.confirmPassword);
            await authSchema.create(req.body);
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.CREATE_USER,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_EXIST,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: {}
        }
        //   return errorHandler(req, res, 400, "error", err);
    }
};

//otp request service
const otpRequestService = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const userDatas = await authSchema.findOne({ mobileNumber: mobileNumber });
        if (!!userDatas) {
            let otp = otpGenerate();

            await authSchema.findOneAndUpdate(
                { _id: userDatas._id.toString() },
                { $set: { otp: otp } }
            );
            sendSms(mobileNumber, otp);
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.OTP_SENT,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_NOTFOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: {}
        }
    }
};

//verify OTP service
const verifyOtpService = async (req, res) => {
    try {
        let { mobileNumber, otp } = req.body;
        let verifyOtp = await authSchema.findOne({ mobileNumber: mobileNumber });
        let isOtpTimeout = await checkOtpTimeOut(verifyOtp.updatedAt)
        if(!isOtpTimeout){
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.OTP_TIMEOUT,
                data: {}
            }
        }
        if (verifyOtp.mobileNumber == mobileNumber && verifyOtp.otp == otp) {
            await authSchema.findOneAndUpdate(
                { _id: verifyOtp._id.toString() },
                { $unset: { otp } }
            );
            let obj = {
                emailId: verifyOtp.emailId,
                mobileNumber: mobileNumber,
                token: loginToken(verifyOtp),
            };
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.LOGIN_SUCCESS,
                data: obj
            }
        }
        if (verifyOtp.otp !== otp) {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.INVALID_OTP,
                data: {}
            };
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        };
    }
};

//reset pass link service
const resetPasswordLinkService = async (req, res) => {
    try {
        let checkEmail = await authSchema.findOne({ emailId: req.body.emailId });
        if (!!checkEmail && checkEmail.emailId == req.body.emailId) {
            let token = loginToken(checkEmail);
            sendEmail(
                checkEmail.emailId,
                "Reset password link",
                `http://localhost:4040?token=${token}`
            );
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.SENT_MAIL,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_NOTFOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

//reset password service
const resetPasswordService = async (req, res) => {
    try {
        let user = await authSchema.findById({ _id: req.user.id });
        user.password = textEncrypt(req.body.password);
        user.confirmPassword = textEncrypt(req.body.confirmPassword);
        await authSchema.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { ...user } }
        );
        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.PASSWORD_UPDATED_SUCCESS,
            data: wr
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

//get all user service
const getAllUsersService = async (req, res) => {
    const searchQuery = req.query.search
    let findQuery = {
        $and: [
            { name: { $regex: searchQuery || "", $options: "i" } },
            { isDelete: false },
            { isActive: true }
        ]
    }
    try {
        let pageMeta = await pagination(req, authSchema);
        let users = await authSchema.find(findQuery)
            .limit(pageMeta?.limit)
            .skip(pageMeta?.skip);
        delete pageMeta.skip;

        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.SUCCESS,
            data: { users, pageMeta }
        }
    } catch (err) {
        return {
            error: false,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}

//delete user service
const deleteUserService = async (req, res) => {
    try {
        let userData = await authSchema.findByIdAndUpdate({ _id: req.params.id }, { $set: { isDelete: true } })
        if (userData) {

            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.SUCCESS,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_NOTFOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: false,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}
module.exports = {
    userLoginService,
    createNewUserService,
    otpRequestService,
    verifyOtpService,
    resetPasswordLinkService,
    resetPasswordService,
    getAllUsersService,
    deleteUserService
}