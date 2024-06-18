const authSchema = require("../model/auth.schema");
const { userLoginService, createNewUserService, otpRequestService, verifyOtpService, resetPasswordLinkService, resetPasswordService, getAllUsersService, deleteUserService } = require("../service/auth.service");
const pagination = require("../utils/pagination");
const { successHandler, errorHandler } = require("../utils/responseHandler");

//create user or sign up controller
const createNewUser = async (req, res) => {
  let data = await createNewUserService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//login controller
const userLogin = async (req, res) => {
  let data = await userLoginService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//otp request controller
const otpRequest = async (req, res) => {
  let data = await otpRequestService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//otp verify controller
const verifyOtp = async (req, res) => {
  let data = await verifyOtpService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//reset password link controller
const resetPasswordLink = async (req, res) => {
  let data = await resetPasswordLinkService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

const resetPassword = async (req, res) => {
  let data = await resetPasswordService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//get user controller
const getAllUsers = async (req, res) => {
  let data = await getAllUsersService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
}

//soft delete user controller
const deleteUser = async (req, res) => {
  let data = await deleteUserService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
}

module.exports = {
  createNewUser,
  userLogin,
  otpRequest,
  verifyOtp,
  resetPasswordLink,
  resetPassword,
  getAllUsers,
  deleteUser
};