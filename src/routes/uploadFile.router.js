let express = require("express");
const { upload } = require("../middleware/s3Multer");
const { uploadFilesS3 } = require("../controller/fileUpload.controller");
let uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("productImg"), uploadFilesS3);

module.exports = { uploadRouter };
