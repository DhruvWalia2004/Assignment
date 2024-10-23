const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const products = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
    { name: "Product 3", price: 300 }
];

app.get('/products', (req, res) => {
    res.render('products', { products });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});