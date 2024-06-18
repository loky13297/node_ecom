const express = require("express");
const {
  createNewUser,
  userLogin,
  otpRequest,
  verifyOtp,
  resetPasswordLink,
  resetPassword,
  getAllUsers,
  deleteUser,
} = require("../controller/auth.controller");
const { authentication } = require("../middleware/authentication");
const authRouter = express.Router();

authRouter.post("/createUser", createNewUser);
authRouter.post("/login", userLogin);
authRouter.post("/otpRequest", otpRequest);
authRouter.post("/otpVerify", verifyOtp);
authRouter.post("/resetPasswordLink", resetPasswordLink);
authRouter.post("/resetPassword", authentication, resetPassword);
authRouter.get("/listAllUsers", getAllUsers);
authRouter.delete("/deleteUser/:id", deleteUser);


module.exports = authRouter;
