const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

// yaha pe apn ne create kiya hai subcateogry ke section ke liye routes
// Create subcategory
router.post('/create', async (req, res) => {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
        return res.status(400).json({ msg: 'Name and categoryId are required' });
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
        return res.status(400).json({ msg: 'Category does not exist' });
    }

    const newSubcategory = new Subcategory({ name, category: categoryId });
    await newSubcategory.save();

    res.status(201).json({ msg: 'Subcategory created successfully' });
});

// Get all subcategories
router.get('/', async (req, res) => {
     const subcategories = await Subcategory.find().populate('category', 'name');
    res.json(subcategories);
});


router.put('/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const updated = await Subcategory.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) {
        return res.status(404).json({ msg: 'Subcategory not found' });
    }

    res.json({ msg: 'Subcategory updated', updated });
});


router.delete('/:id', async (req, res) => {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ msg: 'Subcategory not found' });
    }

    res.json({ msg: 'Subcategory deleted' });
});

module.exports = router;
