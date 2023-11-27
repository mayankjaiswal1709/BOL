const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogs',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const multerUpload = multer({ storage });

// Routes for blog operations
router.post("/blogs",multerUpload.single('blogImage'), blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.put("/blogs/:id", blogController.updateBlogById);
router.put("/updateblogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlogById);

module.exports = router;
