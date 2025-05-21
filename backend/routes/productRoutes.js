const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for product management

router.get('/', productController.getAllProducts); // Get all products
router.get('/:id', productController.getProductById); // Get a single product by ID
router.post('/', productController.addProduct); // Add a new product
router.put('/:id', productController.updateProduct); // Update a product by ID
router.delete('/:id', productController.deleteProduct); // Delete a product by ID

module.exports = router;