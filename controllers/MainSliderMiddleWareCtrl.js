const MainSliderMiddleWare = require('../models/MainSliderMiddleWare')
const { models } = require('mongoose')

//get Sliders for dashboard
const getAllSliderDashboard = async (req, res) => {
    try {
        const allPosts = await MainSliderMiddleWare.find().sort({ _id: -1 })
        res.status(200).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت بنر ها' })
    }
}
module.exports.getAllSliderDashboard = getAllSliderDashboard

const getSliderByIdDashboard = async (req, res) => {
    try {
        const id = req.params.id
        const slide = await MainSliderMiddleWare.findById(id)
        res.status(200).json(slide)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت بنر' })
    }
}
module.exports.getSliderByIdDashboard = getSliderByIdDashboard

//create Slider for dashboard
const createSlider = async (req, res) => {
    try {
        const data = req.body
        await MainSliderMiddleWare.create(data)
        res.status(200).json({ msg: ' بنر با موفقیت افزوده شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در ساخت  بنر' })
    }
}
module.exports.createSlider = createSlider

//delete slider
const deleteSlider = async (req, res) => {
    try {
        await MainSliderMiddleWare.findByIdAndRemove(req.params.id)
        res.status(200).json({ msg: ' بنر با موفقیت حذف شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در ساخت  بنر' })
    }
}
module.exports.deleteSlider = deleteSlider

//edit slide
const editSlide = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        await MainSliderMiddleWare.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json({ msg: ' بنر با موفقیت به روز رسانی شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در ساخت  بنر' })
    }
}
module.exports.editSlide = editSlide


//slider for show

const getSlidersForView = async (req, res) => {
    try {
        const allPosts = await MainSliderMiddleWare.find({ published: true })
        res.status(200).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت بنر ها' })
    }
}
module.exports.getSlidersForView = getSlidersForView