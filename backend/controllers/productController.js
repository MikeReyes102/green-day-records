const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        // Handle errors during fetch
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        // Find product by its ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            // If not found, return 404
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        // Handle errors during fetch
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Search products by title or artist
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      // If no search query provided, return 400
      return res.status(400).json({ message: "Search query is required." });
    }

    // Perform a text search on products collection
    const products = await Product.find({ $text: { $search: query } });

    if (products.length === 0) {
      // If no products found, return 404
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json(products);
  } catch (error) {
    // Log and handle errors during search
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};


// The following functions are for Admin use only
// Add, update, and delete product functions

// Add a new product
const addProduct = async (req, res) => {
    try {
        // Create a new product using request body
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        // Handle errors during creation
        res.status(400).json({ message: 'Error adding product', error });
    }
}; 

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        // Find product by ID and update with new data
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            // If not found, return 404
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        // Handle errors during update
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        // Find product by ID and delete
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            // If not found, return 404
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        // Handle errors during deletion
        res.status(500).json({ message: err.message });
    }
};

// Export all controller functions
module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts };
