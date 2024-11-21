const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Get all products or filter by category with optional limit
router.get('/:categoryId?', (req, res) => {
  const categoryId = req.params.categoryId ? parseInt(req.params.categoryId) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  
  let filteredProducts = categoryId 
    ? products.filter(product => product.categoryId === categoryId)
    : products;
    
  if (categoryId && filteredProducts.length === 0) {
    return res.status(404).json({ 
      error: 'No se encontraron productos para esta categoría' 
    });
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredProducts = filteredProducts.slice(0, limit);
  }
  
  res.json({
    total: filteredProducts.length,
    products: filteredProducts
  });
});

module.exports = router;