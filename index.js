require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("node:path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const httpStatusText = require("./utilities/httpStatusText");

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Mongo db server started");
});

app.use(express.json());
app.use(cors());
const coursesRouter = require("./routes/courses.routes");
const usersRouter = require("./routes/users.routes");

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// global middleware for roues not found
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not found",
  });
});

// middleware for error handleing for not using try and catch in every controller
app.use((error, req, res, next) => {
  // res.json(error)
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port: 5000");
});
