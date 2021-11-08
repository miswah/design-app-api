const multer = require("multer");
const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

// storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

//middleware function
module.exports = {
  upload,
};
