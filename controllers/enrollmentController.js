const Enrollment = require("../models/Enrollment");

// ================= ENROLL IN COURSE =================

const enrollCourse = async (req, res) => {
  try {
    const user = req.user.userId;
    const { course } = req.body;

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course is required",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      user,
      course,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      user,
      course,
    });

    res.status(201).json({
      success: true,
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// ================= GET USER ENROLLMENTS =================

const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.params.userId,
    }).populate("course");

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= GET COURSE STUDENTS =================

const getCourseStudents = async (req, res) => {
  try {
    const students = await Enrollment.find({
      course: req.params.courseId,
    }).populate("user", "name email");

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= UPDATE PROGRESS =================

const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    enrollment.progress = progress;

    if (progress >= 100) {
      enrollment.completed = true;
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Progress updated",
      enrollment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= DELETE ENROLLMENT =================

const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    await enrollment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  enrollCourse,
  getUserEnrollments,
  getCourseStudents,
  updateProgress,
  deleteEnrollment,
};