const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', productController.getAllProducts);
router.get("/search", productController.searchProducts); // ✅ Search Route First
router.get("/:id", productController.getProductById);

// Admin routes
router.post('/', protect, adminOnly, productController.addProduct); 
router.put('/:id', protect, adminOnly, productController.updateProduct); 
router.delete('/:id', protect, adminOnly, productController.deleteProduct); 

module.exports = router;