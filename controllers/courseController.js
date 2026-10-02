const Course = require("../models/Course");

// ================= CREATE COURSE =================

const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      category,
      thumbnail,
      price,
      duration,
      level,
      language,
    } = req.body;

    if (!title || !description || !instructor || !category || price == null) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, instructor, category and price are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      category,
      thumbnail,
      price,
      duration,
      level,
      language,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= GET ALL COURSES =================

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= GET COURSE BY ID =================

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= UPDATE COURSE =================

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    Object.assign(course, req.body);

    const updatedCourse = await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= DELETE COURSE =================

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};