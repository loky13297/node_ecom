const express = require("express");
const {
  createProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getProductById
} = require("../controller/product.controller");
const { authentication } = require("../middleware/authentication");

let productRouter = express.Router();

productRouter.get("/getAllProducts", getAllProduct);
productRouter.post("/productCreate",createProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.put("/updateProduct/:id", updateProduct);
productRouter.get("/getProductById/:id", getProductById);


module.exports = productRouter;
