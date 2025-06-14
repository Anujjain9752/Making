const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/create', async (req, res) => {
    const {name} = req.body; 
    if (!name) {
        return res.status(400).json({ msg: 'Name is required' });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
        return res.status(400).json({ msg: 'Category already exists' });
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ msg: 'Category created successfully' });
});


router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});


router.put('/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const updated = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) {
        return res.status(404).json({ msg: 'Category not found' });
    }

    res.json({ msg: 'Category updated', updated });
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ msg: 'Category not found' });
    }

    res.json({ msg: 'Category deleted' });
});

module.exports = router;
