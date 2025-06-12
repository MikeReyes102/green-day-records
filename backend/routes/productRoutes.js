const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getAllProducts); // Get all products
router.get("/search", productController.searchProducts); // Search products
router.get("/:id", productController.getProductById); // Get product by ID

// Admin routes (protected)
router.post('/', protect, adminOnly, productController.addProduct); // Add new product
router.patch('/:id', protect, adminOnly, productController.updateProduct); // Update product
router.delete('/:id', protect, adminOnly, productController.deleteProduct); // Delete product

module.exports = router;