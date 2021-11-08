const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//Image Schema
const imageSchema = new Schema({
  design_id: {
    type: ObjectId,
    ref: "design",
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
});

const image = mongoose.model("image", imageSchema);
module.exports = image;
