const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  enrollCourse,
  getUserEnrollments,
  getCourseStudents,
  updateProgress,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/", protect, enrollCourse);

router.get("/user/:userId", protect, getUserEnrollments);

router.put("/:id", protect, updateProgress);

router.delete("/:id", protect, deleteEnrollment);

module.exports = router;
