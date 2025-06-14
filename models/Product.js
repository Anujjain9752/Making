const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  mrp: { type: Number, required: true },
  ourPrice: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
