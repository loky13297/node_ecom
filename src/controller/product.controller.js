const productCreate = require("../model/product.schema");
const { createProductService, getAllProductService, deleteProductService, updateProductService, getProductByIdService } = require("../service/product.service");
const pagination = require("../utils/pagination");
const { successHandler, errorHandler } = require("../utils/responseHandler");

//create product controller
const createProduct = async (req, res) => {
  let data = await createProductService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//get all product controller
const getAllProduct = async (req, res) => {
  let data = await getAllProductService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//delete product controller
const deleteProduct = async (req, res) => {
  let data = await deleteProductService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//update product controller
const updateProduct = async (req, res) => {
  let data = await updateProductService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
};

//get product by id controller
const getProductById = async (req, res) => {
  let data = await getProductByIdService(req, res)
  if (!data.error) {
    return successHandler(req, res, data.status, data.message, data.data)
  } else {
    return errorHandler(req, res, data.status, data.message, data.data)
  }
}
module.exports = { createProduct, getAllProduct, deleteProduct, updateProduct, getProductById };
