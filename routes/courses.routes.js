const express = require("express");
const router = express.Router();

const coursesCountroller = require("../controllers/courses.controllers");
const { validationSchema } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utilities/userRoles");
const allowedTo = require("../middlewares/allowedTo")

// Get all courses
router
  .route("/")
  .get(coursesCountroller.getAllCourses)
  .post(verifyToken, validationSchema(), coursesCountroller.addCourse);

router
  .route("/:courseId")
  .get(coursesCountroller.getCourse)
  .patch(validationSchema(), coursesCountroller.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesCountroller.deleteCourse);

module.exports = router;
