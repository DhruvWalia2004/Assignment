const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const products = [
    {
        name: "Product 1",
        description: "This is the description for Product 1",
        image: "/images/product1.jpg"
    },
    {
        name: "Product 2",
        description: "This is the description for Product 2",
        image: "/images/product2.jpg"
    },
    {
        name: "Product 3",
        description: "This is the description for Product 3",
        image: "/images/product3.jpg"
    }
];

app.get('/catalog', (req, res) => {
    res.render('catalog', { products });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
