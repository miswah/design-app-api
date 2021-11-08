const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//declaring design schema
const designSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const design = mongoose.model("design", designSchema);
module.exports = design;
