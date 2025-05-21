const mongoose = require("mongoose");

// Define the product schema

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    label: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    trackListing: [
      {
        trackNumber: { type: Number, required: true },
        title: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes for the product schema to improve search performance

// Text index for searching by title, artist, and genre
productSchema.index({ title: "text", artist: "text", genre: "text" });

// Compound index for sorting by price and stock
productSchema.index({ price: 1, stock: -1 });

// Single-field index for filtering by condition
productSchema.index({ condition: 1 });

module.exports = mongoose.model("Product", productSchema);