let express = require("express");
const { authentication } = require("../middleware/authentication");
const { updateCart, getUserCart } = require("../controller/cart.controller");
let cartRouter = express.Router();

cartRouter.post("/updateCart", authentication, updateCart);
cartRouter.get("/getUserCart", authentication, getUserCart);

module.exports = cartRouter;
