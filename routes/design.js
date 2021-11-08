const express = require("express");
const router = express.Router();

const cleanBody = require("../middleware/cleanbody");

const designController = require("../src/designs/design.controller");

//API calls
router.post("/create", designController.createDesign);
router.get("/view-all", designController.viewAllDesign);
router.get("/view/:id", designController.viewDesignById);
router.put("/update/:id", designController.updateDesign);
router.delete("/delete/:id", designController.deleteDesign);
module.exports = router;
