const express = require("express");
const router = express.Router();

const cleanBody = require("../middleware/cleanbody");

const imageController = require("../src/image/image.controller");

//handling image upload
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// storage engine
const storage = multer.diskStorage({
  destination: "./src/image/helpers/upload/images",
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

//API calls
router.post(
  "/upload/:design_id",
  upload.single("image"),
  imageController.uploadImage
);

router.get("/view/:design_id", imageController.getImageByDesignId);
router.delete("/delete/:id", imageController.deleteImage);
router.put("/update/:id", imageController.updateImage);
module.exports = router;
