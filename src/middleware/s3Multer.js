const multer = require("multer");
const Aws = require("aws-sdk");

const storage = multer.memoryStorage();

// below variable is define to check the type of file which is uploaded
const filefilter = (req, file, cb) => {
const filetypes = /jpeg|jpg|png|gif|svg|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
  
};

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY, // accessKeyId that is stored in .env file
  secretAccessKey: process.env.S3_SECRET_KEY,  // secretAccessKey is also store in .env file
  region: "ap-south-1"
});

module.exports = { s3, upload };
