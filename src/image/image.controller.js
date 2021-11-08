const Joi = require("joi");

const Image = require("./image.model");

var ImageKit = require("imagekit");
var fs = require("fs");

var imagekit = new ImageKit({
  publicKey: "public_SCAvKngeeIpLeQB0HPaXTh5eCBY=",
  privateKey: "private_XgMGyxRYYH0+TiOS6iRp4AAcA58=",
  urlEndpoint: "https://ik.imagekit.io/epslw4fv7zzt",
});

module.exports = {
  //upload new image
  uploadImage: async (req, res) => {
    setTimeout(() => {
      fs.readFile(
        `src/image/helpers/upload/images/${req.file.filename}`,
        function (err, data) {
          if (err) throw err; // Fail if the file can't be read.
          imagekit.upload(
            {
              file: data, //required
              fileName: "my_file_name.jpg", //required
              tags: ["tag1", "tag2"],
            },
            async (error, result) => {
              if (error) console.log(error);
              else {
                fs.unlink(
                  `src/image/helpers/upload/images/${req.file.filename}`,
                  function (err) {
                    if (err) {
                      throw err;
                    } else {
                      console.log("Successfully deleted the file.");
                    }
                  }
                );
                //creating image obj
                const img = {
                  design_id: req.params.design_id,
                  img_url: result.url,
                  thumbnail_url: result.thumbnailUrl,
                };
                const newImage = new Image(img);
                await newImage.save();
                return res.json({
                  error: false,
                  status: 200,
                  message: result,
                });
              }
            }
          );
        }
      );
    }, 500);
  },

  //get image by design id
  getImageByDesignId: async (req, res) => {
    Image.find({ design_id: req.params.design_id }).then((data) => {
      if (data == []) {
        return res.json({
          error: true,
          status: 404,
          message: "Hint Not found on this scene",
        });
      }

      return res.json({
        error: false,
        status: 200,
        message: data,
      });
    });
  },

  //delete Image by design id
  deleteImage: async (req, res) => {
    Image.findByIdAndDelete(req.params.id).then((data) => {
      return res.json({
        error: false,
        status: 200,
        message: "Design Deleted Successfully",
      });
    });
  },

  //update Image by design id
  updateImage: async (req, res) => {
    Image.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then((data) => {
      return res.json({
        error: false,
        status: 200,
        message: "Design Updated Successfully",
      });
    });
  },
};
