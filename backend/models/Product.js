const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Album title
    artist: { type: String, required: true }, // Artist or band name
    genre: { type: String, required: true }, // Music genre
    releaseYear: { type: Number, required: true }, // Year of release
    label: { type: String, required: true }, // Record label
    condition: { type: String, required: true }, // Condition of the record (e.g., New, Used)
    price: { type: Number, required: true }, // Price of the product
    stock: { type: Number, required: true }, // Number of items in stock
    imageUrl: { type: String, required: true }, // URL to the product image
    trackListing: [
      {
        trackNumber: { type: Number, required: true }, // Track number on the album
        title: { type: String, required: true }, // Track title
        duration: { type: String, required: true }, // Duration of the track (e.g., "3:45")
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
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