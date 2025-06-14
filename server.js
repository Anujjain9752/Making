const express = require('express');
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Product = require('./models/Product');
const categoryRoutes = require('./routes/category');
const subcategoryRoutes = require('./routes/subcategory');
const productRoutes = require('./routes/product');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Use API routes
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/product', productRoutes);

// Render EJS Home Page
app.get('/', async (req, res) => {
  const categories = await Category.find();
  const subcategories = await Subcategory.find().populate('category');
  const products = await Product.find().populate('category').populate('subcategory');

  res.render('index', { categories, subcategories, products });
});

// Form handlers
app.post('/add-category', async (req, res) => {
  await Category.create({ name: req.body.name });
  res.redirect('/');
});

app.post('/delete-category/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.post('/add-subcategory', async (req, res) => {
  await Subcategory.create({ name: req.body.name, category: req.body.categoryId });
  res.redirect('/');
});

app.post('/delete-subcategory/:id', async (req, res) => {
  await Subcategory.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.post('/add-product', async (req, res) => {
  await Product.create({
    name: req.body.name,
    category: req.body.categoryId,
    subcategory: req.body.subcategoryId,
    mrp: req.body.mrp,
    ourPrice: req.body.ourPrice,
    description: req.body.description,
  });
  res.redirect('/');
});

app.post('/delete-product/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.post('/update-product/:id', async (req, res) => {
  const { name, mrp, ourPrice, description, categoryId, subcategoryId } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name,
    mrp,
    ourPrice,
    description,
    category: categoryId,
    subcategory: subcategoryId
  });
  res.redirect('/');
});

// MongoDB connection
mongoose.connect('mongodb+srv://Anuj_jain9752:EjPjIFV4kl6VY8Ja@cluster1.4ufk6.mongodb.net/making').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});


