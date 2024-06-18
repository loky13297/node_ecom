const authSchema = require("../model/auth.schema");
const { updateCartService, getUserCartService } = require("../service/cart.service");
const { successHandler } = require("../utils/responseHandler");
const mongoose = require("mongoose");

//card update controller
const updateCart = async (req, res) => {
  let data = await updateCartService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//get user cart controller
const getUserCart = async (req, res) => {
  let data = await getUserCartService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

module.exports = { updateCart, getUserCart };
