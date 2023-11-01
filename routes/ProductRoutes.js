const express = require('express')
const router = express()
const ProductCtrl = require('../controllers/ProductCtrl')

// routes for dashboard
router.get('/all-products', ProductCtrl.getAllProductsDashboard)
router.get('/product-by-id/:id', ProductCtrl.getSingleProductForDashboard)
router.get('/product-by-category/:id', ProductCtrl.getProductsByCategory)

router.post('/create-product', ProductCtrl.createProduct)
router.post('/update-product/:id', ProductCtrl.updateProductDashboard)
router.post('/delete-product/:id', ProductCtrl.deleteProductDashboard)

//routes of main
router.get('/product/:slug', ProductCtrl.getProductBySlug)
router.get('/sells-offer', ProductCtrl.getSellsOfferProducts)
router.get('/getMostViewedProducts', ProductCtrl.getMostViewedProducts)
router.get('/getNewProductsAdded', ProductCtrl.getNewProductsAdded)
router.get('/search-products', ProductCtrl.searchProducts)
module.exports = router