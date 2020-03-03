const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Blog = require('./models/blog.jsx');

// MongoDB Configuration ==========================
mongoose.connect('mongodb://localhost/node_blog', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Configuration ==================================
app.set('view engine', 'ejs');
app.use(express.static('public/css'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

// RESTful routes =================================
// display main page
app.get('/', (req, res) => {
  res.render('index');
});

// display and add new blog
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

});

// show selected blog
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundedPost) => {
    if (err) {
      res.redirect('/')
    } else {
      res.render('show', {
        post: foundedPost
      })
    }
  });
});

// edit selected blog
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, foundedPost) => {
    if (err) {
      res.redirect('/');
    } else {
      res.render('edit', {
        blog: foundedPost
      })
    }
  });
});

app.put('/blogs/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/blogs');
    }
  });
});

// delete selected blog

app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});




// LISTENING =====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});