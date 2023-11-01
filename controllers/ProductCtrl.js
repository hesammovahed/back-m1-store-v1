const ProductSchema = require('../models/Product')
const { body } = require('express-validator')

//get methods
const getAllProductsDashboard = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn
            const pageNumber = req.query.pn
            const goalProduct = await ProductSchema.find().skip((pageNumber - 1) * paginate).limit(paginate).sort({ _id: -1 }).select({ mainFile: false })
            const allProductNumbers = await (await ProductSchema.find()).length
            res.status(200).json({ goalProduct, allProductNumbers })
        } else {
            const allPosts = await ProductSchema.find().sort({ _id: -1 })
            res.status(200).json(allPosts)
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: ' دریافت با خطا رو به رو شد' }).status(400)
    }
}
module.exports.getAllProductsDashboard = getAllProductsDashboard

const getSingleProductForDashboard = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id)
        res.status(200).json({ product, msg: ' محصول با موفقیت دریافت شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت پست' })
    }
}
module.exports.getSingleProductForDashboard = getSingleProductForDashboard

const getActiveProduct = async (req, res) => {
    try {
        if (req.query.pn) {
            // && req.query.pgn
            const paginate = 1
            const pageNumber = req.query.pn
            const goalPosts = await ProductSchema.find({ published: true }).skip((pageNumber - 1) * paginate).limit(paginate).sort({ _id: -1 }).select({
                title: 1,
                image: 1,
                imageAlt: 1,
                shortDesc: 1,
                slug: 1,
                mainFile: false,
            })
            const allPostNumbers = await (await ProductSchema.find()).length
            res.status(200).json({ goalPosts, allPostNumbers })
        } else {
            const allProducts = await ProductSchema.find({ published: true }).sort({ _id: -1 }).select({
                title: 1,
                image: 1,
                imageAlt: 1,
                shortDesc: 1,
                slug: 1,
                price: 1,
                mainFile: false,
            })
            const allProductNumbers = await (await ProductSchema.find()).length
            res.status(200).json({ allProducts, allProductNumbers })
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: ' دریافت با خطا رو به رو شد' }).status(400)
    }
}
module.exports.getActiveProduct = getActiveProduct

const getProductBySlug = async (req, res) => {
    try {
        const item = await ProductSchema.findOne({ slug: req.params.slug, published: true })
        if (item) {
            res.status(200).json(item)
        } else {
            res.status(400).json({ msg: 'محصول موجود نمیباشد و یا غیر فعال است' })
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: ' دریافت محصول با خطا رو به رو شد' }).status(400)
    }
}
module.exports.getProductBySlug = getProductBySlug

const getMostViewedProducts = async (req, res) => {
    try {
        const items = await ProductSchema.find({ published: true }).sort({ _id: -1 }).limit(6).select({ mainFile: false })
        res.status(200).json(items)
    } catch (error) {
        console.log(error)
    }
}
module.exports.getMostViewedProducts = getMostViewedProducts

const getNewProductsAdded = async (req, res) => {
    try {
        const items = await ProductSchema.find({ published: true }).sort({ createdAt: -1 }).limit(6).select(
            {
                title: 1,
                image: 1,
                imageAlt: 1,
                price: 1,
                slug: 1,
            })
        res.status(200).json(items)
    } catch (error) {
        console.log(error)
    }
}
module.exports.getNewProductsAdded = getNewProductsAdded

const getProductsByCategory = async (req, res) => {
    try {
        const items = await ProductSchema.find({ categories: req.params.id }).select({
            image: 1,
            imageAlt: 1,
            price: 1,
            title: 1,
            published: 1,
            soldProduct: 1,
            updatedAt: 1,
            sellOffer: 1,
        })
        res.status(200).json(items)
    } catch (error) {
        console.log(error)
    }
}
module.exports.getProductsByCategory = getProductsByCategory

const getSellsOfferProducts = async (req, res) => {
    try {
        const product = await ProductSchema.find({ sellOffer: true, published: 1 }).select({
            image: 1,
            imageAlt: 1,
            price: 1,
            title: 1,
            priceAtOffer: 1,
            slug: 1,
        })
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت پست' })
    }
}
module.exports.getSellsOfferProducts = getSellsOfferProducts
//create methods
const createProduct = async (req, res) => {
    try {
        const data = req.body
        data.slug = req.body.slug.toLowerCase().replace(/\s+/g, '-')
        await ProductSchema.create(data)
        res.status(200).json({ msg: ' محصول با موفقیت افزوده شد' })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
module.exports.createProduct = createProduct

//delete method
const deleteProductDashboard = async (req, res) => {
    try {
        await ProductSchema.findByIdAndRemove(req.params.id)
        res.status(200).json({ msg: ' محصول با موفقیت حذف شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در حذف محصول' })
    }
}
module.exports.deleteProductDashboard = deleteProductDashboard

//update method
const updateProductDashboard = async (req, res) => {
    try {
        const data = req.body
        data.slug = req.body.slug.toLowerCase().replace(/\s+/g, '-')
        await ProductSchema.findByIdAndUpdate(req.params.id, data, { new: true })
        res.status(200).json({ msg: ' محصول با موفقیت به روز رسانی شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در به روز رسانی محصول' })
    }
}
module.exports.updateProductDashboard = updateProductDashboard

// search products
const searchProducts = async (req, res) => {
    try {
        let allProducts = await ProductSchema.find({ published: 1 }).sort({ _id: -1 }).select({
            image: 1,
            imageAlt: 1,
            price: 1,
            priceAtOffer: 1,
            title: 1,
            createdAt: 1,
            comments: 1,
            soldProduct: 1,
            productView: 1,
            sellOffer: 1,
            categories: 1,
            slug: 1,
            tags: 1,
            color: 1,
        })

        // KEYWORD SEARCH
        if (req.query.keyword) {
            // search on tags and titile and ...
            const result = allProducts.filter(item => item.title.includes(req.query.keyword) || item.tags.includes(req.query.keyword))
            allProducts = result
        }
        // ORDER BY PRICE  BY soldProduct  PAGEWIEW  DATE

        if (req.query.orderBy) {
            let result = []
            if (req.query.orderBy == 'lowPrice') {
                result = allProducts.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1)
            } else if (req.query.orderBy == ' ') {
                result = allProducts.sort((a, b) => Number(a.price) > Number(b.price) ? -1 : 1)
            } else if (req.query.orderBy == 'soldProduct') {
                result = allProducts.sort((a, b) => a.soldProduct > b.soldProduct ? 1 : -1)
            } else if (req.query.orderBy == 'productView') {
                result = allProducts.sort((a, b) => a.productView > b.productView ? 1 : -1)
            } else {
                result = allProducts
            }
        }
        //TYPE OF PRODUCT
        // don't forger add brand to your products

        //MAX AND MIN PRICE
        if (req.query.maxPrice && req.query.minPrice) {
            let result = allProducts.filter((item) => Number(item.price) <= req.query.maxPrice && Number(item.price) >= req.query.minPrice)
            allProducts = result
        }
        //CATEGORY
        if (req.query.categories) {
            let result = []
            const categoriesSlug = req.query.categories.split(',')
            console.log(categoriesSlug)
        }

        //dont forget add pagination system
        //default
        res.status(200).json(allProducts)

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت محصول' })
    }
}
module.exports.searchProducts = searchProducts
