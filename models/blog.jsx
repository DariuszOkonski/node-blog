const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  created: {
    type: Date,
    default: Date.now
  },
  content: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;