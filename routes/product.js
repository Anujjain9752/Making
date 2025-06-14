const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

// Create product
router.post("/create", async (req, res) => {
  const { name, categoryId, subcategoryId, mrp, ourPrice, description } =
    req.body;

  if (!name || !categoryId || !subcategoryId || !mrp || !ourPrice) {
    return res.status(400).json({ msg: "All required fields must be filled" });
  }

  const category = await Category.findById(categoryId);
  const subcategory = await Subcategory.findById(subcategoryId);

  if (!category || !subcategory) {
    return res.status(400).json({ msg: "Invalid category or subcategory" });
  }

  const newProduct = new Product({
    name,
    category: categoryId,
    subcategory: subcategoryId,
    mrp,
    ourPrice,
    description,
  });

  await newProduct.save();
  res.status(201).json({ msg: "Product created successfully" });
});

router.get("/", async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("subcategory", "name");
  res.json(products);
});

router.put("/:id", async (req, res) => {
  const { name, mrp, ourPrice, description } = req.body;

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { name, mrp, ourPrice, description },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ msg: "Product not found" });
  }

  res.json({ msg: "Product updated", updated });
});

router.delete("/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.json({ msg: "Product deleted" });
});

module.exports = router;
