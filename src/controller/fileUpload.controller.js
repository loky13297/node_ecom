const { s3 } = require("../middleware/s3Multer");
const { successHandler } = require("../utils/responseHandler");

const uploadFilesS3 = (req, res) => {
  const params = {
    Bucket: "newprodimg", // bucket that we made earlier
    Key: req.file.originalname, // Name of the image
    Body: req.file.buffer, // Body which will contain the image in buffer format
    ACL: "public-read", // defining the permissions to get the public link
    ContentType: req.file.mimetype, // Necessary to define the image content-type to view the photo in the browser with the link
  };

  // uplaoding the photo using s3 instance and saving the link in the database.
  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send({ err: error }); // if we get any error while uploading error message will be returned.
    }

    // If not then below code will be executed
    return successHandler(req, res, 200, "Upload successfully", {
      fileName: req.file.originalname,
      url: data.Location,
    });
  });
};

module.exports = { uploadFilesS3 };
