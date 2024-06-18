const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./src/routes/product.router");
const authRouter = require("./src/routes/auth.router");
const { uploadRouter } = require("./src/routes/uploadFile.router");
const cartRouter = require("./src/routes/cart.router");
const app = express();


let url = "mongodb://localhost:27017/e_com_new";

mongoose
.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("db connect"))
.catch((err) => console.log("db error===>", err));

app
.use(express.json())
.use("/v1/product", productRoute)
.use("/v1/auth", authRouter)
.use("/v1/file", uploadRouter)
.use("/v1/cart", cartRouter);

require("dotenv").config()

app.listen(4040, () => console.log("listering to server"));
