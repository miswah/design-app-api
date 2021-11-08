const Joi = require("joi");

const Design = require("./design.model");

//design validation
const designSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  rating: Joi.number().required().max(5),
});

module.exports = {
  //create New Designs
  createDesign: async (req, res) => {
    try {
      const result = designSchema.validate(req.body);
      if (result.error) {
        console.log(result.error.message);
        return res.json({
          error: true,
          status: 400,
          message: result.error.message,
        });
      }
      const newDesign = new Design(result.value);
      await newDesign.save();

      return res.json({
        error: false,
        status: 200,
        message: "Design Created Successfully!!",
      });
    } catch (error) {
      console.error("signup-error", error);
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  },

  //listing all the designs
  viewAllDesign: async (req, res) => {
    Design.find((err, data) => {
      if (err) {
        return res.json({
          error: true,
          status: 404,
          message: err,
        });
      }

      return res.json({
        error: false,
        status: 200,
        message: data,
      });
    });
  },

  //get design data by using id
  viewDesignById: async (req, res) => {
    Design.findById(req.params.id, (err, data) => {
      if (err) {
        return res.json({
          error: true,
          status: 404,
          message: "Not Found",
        });
      }

      return res.json({
        error: false,
        status: 200,
        message: data,
      });
    });
  },

  //Update Design Data
  updateDesign: async (req, res) => {
    Design.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(405).json({
            error: true,
            message: "Edit on those fields are not valid",
          });
        }
        return res.json({
          error: false,
          status: 200,
          message: "Design Updated Successfully",
        });
      }
    );
  },

  //Delete Design
  deleteDesign: async (req, res) => {
    Design.findByIdAndDelete(req.params.id).then((data) => {
      return res.json({
        error: false,
        status: 200,
        message: "Design Deleted Successfully",
      });
    });
  },
};
