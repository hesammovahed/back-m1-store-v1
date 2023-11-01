const express = require('express')
const router = express()
const CategoryCtrl = require('../controllers/CategoryCtrl')

// routes for dashboard
router.get('/categories', CategoryCtrl.getAllCategories)
router.get('/category-by-id/:id', CategoryCtrl.getSingleCategory)
router.get('/category-for-product', CategoryCtrl.categoryForProduct)

router.post('/create-category', CategoryCtrl.createCategory)
router.post('/update-category/:id', CategoryCtrl.updateCategory)
router.post('/delete-category/:id', CategoryCtrl.updateCategory)

//routes of main
router.get('/categories-for-Home', CategoryCtrl.activeCategories)
router.get('/get-products-with-category', CategoryCtrl.getProductsWithCategory)

module.exports = router