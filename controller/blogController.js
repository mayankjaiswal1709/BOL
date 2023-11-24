const Blog = require("../models/blog");

// Controller for handling blog operations
const blogController = {
  createBlog: async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      res.json(newBlog);
    } catch (error) {
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
