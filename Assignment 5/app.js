const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const items = [
  { name: 'Harry Potter', category: 'book' },
  { name: 'The Lord of the Rings', category: 'book' },
  { name: 'Inception', category: 'movie' },
  { name: 'Titanic', category: 'movie' }
];

app.get('/search', (req, res) => {
  const query = req.query.q || '';

  const results = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  res.render('search', { query, results });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
