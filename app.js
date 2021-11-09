const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = 5000;

//importing routes
const designRoutes = require("./routes/design");
const imageRoutes = require("./routes/image");

//connecting to mongo db
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "design-app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//importing route files
app.use("/design", designRoutes);
app.use("/image", imageRoutes);

//API call to check server status
app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started listening on PORT : " + PORT);
});
