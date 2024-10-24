const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
let isLoggedIn = false;
app.get('/', (req, res) => {
  res.render('index', { isLoggedIn });
});
app.get('/login', (req, res) => {
  isLoggedIn = true;
  res.redirect('/');
});
app.get('/logout', (req, res) => {
  isLoggedIn = false;
  res.redirect('/');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});