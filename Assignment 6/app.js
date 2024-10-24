const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get('/posts', (req, res) => {
  res.render('posts', { posts });
});

app.post('/posts', (req, res) => {
  const { title, body } = req.body;
    posts.push({ title, body });
    res.redirect('/posts');
});

app.get('/posts/:title', (req, res) => {
  const requestedTitle = req.params.title;
  const post = posts.find(p => p.title === requestedTitle);
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});