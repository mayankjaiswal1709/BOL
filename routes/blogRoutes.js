const express = require("express");
const blogController = require("../controller/blogController");

const router = express.Router();

// Routes for blog operations
router.post("/blogs", blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.put("/blogs/:id", blogController.updateBlogById);
router.delete("/blogs/:id", blogController.deleteBlogById);

module.exports = router;
