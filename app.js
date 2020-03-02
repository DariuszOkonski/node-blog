const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB Configuration ==========================
mongoose.connect('mongodb://localhost/node_blog', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

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

// Configuration ==================================
app.set('view engine', 'ejs');
app.use(express.static('public/css'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// RESTful routes =================================
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/blogs', (req, res) => {
  Blog.find((err, foundedPosts) => {
    if (err) {
      res.redirect('/');
    } else {
      res.render('blogs', {
        posts: foundedPosts
      });
    }
  })

});

app.get('/blogs/new', (req, res) => {
  res.render('new');
});

app.post('/blogs', (req, res) => {
  Blog.create(req.body.blog, (err, blog) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/blogs');
    }
  })

})




// LISTENING =====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});