const BannerMiddleWare = require('../models/BannerMiddleWare.js')

// get All banners
const getAllMidBan = async (req, res) => {
    try {
        if (req.query.pn) {
            const paginate = 10
            const pageNumber = req.query.pn
            const GoalMidBan = await BannerMiddleWare.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate)
            const bannerQuantity = await (await BannerMiddleWare.find()).length
            res.status(200).json({ GoalMidBan, bannerQuantity })
        } else {
            const AllMidBans = await BannerMiddleWare.find().sort({ _id: -1 })
            res.status(200).json(AllMidBans)
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports.getAllMidBan = getAllMidBan

//get single banner
const getSingleBanner = async (req, res) => {
    try {
        const banner = await BannerMiddleWare.findById(req.params.id)
        res.status(200).json(banner)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در به دریافت بنر' })
    }
}
module.exports.getSingleBanner = getSingleBanner
// create banners
const newMidBanner = async (req, res) => {
    try {
        await BannerMiddleWare.create(req.body)
        res.status(200).json({ msg: ' بنر با موفقیت افزوده شد' })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
module.exports.newMidBanner = newMidBanner

//delete banner
const deleteBanner = async (req, res) => {
    try {
        await BannerMiddleWare.findByIdAndRemove(req.params.id)
        res.status(200).json({ msg: ' بنر با موفقیت حذف شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در حذف بنر' })
    }
}

module.exports.deleteBanner = deleteBanner

//update middle banner
const updateMiddleBanner = async (req, res) => {
    try {
        await BannerMiddleWare.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ msg: ' بنر با موفقیت به روز رسانی شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در به روز رسانی بنر' })
    }
}
module.exports.updateMiddleBanner = updateMiddleBanner

//active banner for show to front end
const activeBanners = async (req, res) => {
    try {
        const activeBanners = await BannerMiddleWare.find({ imageOnAndOff: true }).select({
            image: 1,
            imageAlt: 1,
            link: 1,
        })
        res.status(200).json(activeBanners)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت بنر های فعال' })

    }
}
module.exports.activeBanners = activeBanners