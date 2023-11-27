const Blog = require("../models/blog");
const cloudinary = require("cloudinary");
const path = require("path");
const multer = require('multer');


// Controller for handling blog operations
const blogController = {
  createBlog: async (req, res) => {
    try {
      // Check if there is a file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Check if file size exceeds the limit
    if (req.file.size >= 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error: "File size exceeds the 5MB limit",
      });
    }

    // Extract data from request body
    const { tittle, description, metaDescription } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${Date.now()}_blogImage`,
    });

    // Create a new Blog instance with the uploaded image URL
    const newBlog = await Blog.create({
      tittle: tittle,
      description: description,
      metaDescription: metaDescription,
      blogImage: result.url,
    });

    res.json(newBlog);
  } catch (error) {
    console.log(error.message);
    const errorMessage = error.message || error.stack;
    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
  },

  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      const blogImages = req.files.blogImages;
  
      // Delete existing images from Cloudinary
      for (let i = 0; i < blog.blogImage.length; i++) {
        const imageUrl = blog.blogImage[i];
        const publicId = imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
  
      // Upload new images to Cloudinary
      const imagesLinks = [];
  
      for (let i = 0; i < blogImages.length; i++) {
        const image = blogImages[i];
        const filepath = path.resolve(__dirname, '../uploads', image.name);
  
        // Save image to local file system (optional, you can directly upload to Cloudinary)
        await image.mv(filepath);
  
        const result = await cloudinary.uploader.upload(filepath, {
          folder: "blogs",
        });
  
        imagesLinks.push(result.secure_url);
      }
  
      // Update the blog with new image links
      blog.blogImage = imagesLinks;
      
      // Save the updated blog to the database
      await blog.save();
  
      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },



  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBlogById: async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBlogById: async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
      res.json(deletedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = blogController;
