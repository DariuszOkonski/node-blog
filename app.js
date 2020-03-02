const express = require('express');
const app = express();
const mongoose = require('mongoose');

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
  console.log(req.body.blog);

  res.render('blogs');
})




// LISTENING =====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});