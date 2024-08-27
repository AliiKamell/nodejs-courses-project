const express = require("express");
const router = express.Router();
const usersCountroller = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");

const multer = require("multer");
const appError = require("../utilities/appError");
// const upload = multer({ dest: "uploads/" });

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (re, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});



const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];

  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(appError.create("file must be an image", 400));
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

// Get all users
router.route("/").get(verifyToken, usersCountroller.getAllUsers);
// register
router
  .route("/register")
  .post(upload.single("avatar"), usersCountroller.register);
// login
router.route("/login").post(usersCountroller.login);

module.exports = router;
