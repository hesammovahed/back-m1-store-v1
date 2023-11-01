const Category = require('../models/Category')

// create
const createCategory = async (req, res) => {
    try {
        const item = req.body
        item.slug = req.body.slug.toLowerCase().replace(/\s+/g, '-')
        await Category.create(item)
        res.status(200).json({ msg: 'دسته بندی با موفقیت افزوده شد' })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
module.exports.createCategory = createCategory

// get All Categories
const getAllCategories = async (req, res) => {
    try {
        const AllCategory = await Category.find().sort({ _id: -1 })
        res.status(200).json(AllCategory)
    } catch (error) {
        console.log(error)
    }
}
module.exports.getAllCategories = getAllCategories

//get single Category
const getSingleCategory = async (req, res) => {
    try {
        const banner = await Category.findById(req.params.id)
        res.status(200).json(banner)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در به دریافت دسته بندی' })
    }
}
module.exports.getSingleCategory = getSingleCategory


//delete Category
const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id)
        res.status(200).json({ msg: ' دسته بندی با موفقیت حذف شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در حذف دسته بندی' })
    }
}

module.exports.deleteCategory = deleteCategory

//update Category
const updateCategory = async (req, res) => {
    try {
        const data = req.body
        data.slug = req.body.slug.toLowerCase().replace(/\s+/g, '-')
        await Category.findByIdAndUpdate(req.params.id, data, { new: true })
        res.status(200).json({ msg: ' دسته بندی با موفقیت به روز رسانی شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در به روز رسانی دسته بندی' })
    }
}
module.exports.updateCategory = updateCategory

//active Category for show to front end
const activeCategories = async (req, res) => {
    try {
        const activeCategories = await Category.find({ published: true }).select({
            image: 1,
            imageAlt: 1,
            slug: 1,
            title: 1,
        })
        res.status(200).json(activeCategories)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت دسته بندی های فعال' })

    }
}
module.exports.activeCategories = activeCategories

// category for product
const categoryForProduct = async (req, res) => {
    try {
        const items = await Category.find().select({ title: 1})
        res.status(200).json(items)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت دسته بندی ها ' })
    }
}
module.exports.categoryForProduct = categoryForProduct


const getProductsWithCategory = async (req, res) => {
    try {
        // const activeCategories = await Category.find({ published: true }).select({
        //     image: 1,
        //     imageAlt: 1,
        //     slug: 1,
        //     title: 1,
        // })
        // res.status(200).json(activeCategories)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت دسته بندی های فعال' })
    }
}
module.exports.getProductsWithCategory = getProductsWithCategory