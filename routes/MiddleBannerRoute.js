const express = require('express')
const router = express()
const { check } = require('express-validator')

const BannerMiddlewareCtrl = require('../controllers/BannerMiddlewareCtrl')

router.get('/middle-banners', BannerMiddlewareCtrl.getAllMidBan)
router.get('/active-banners', BannerMiddlewareCtrl.activeBanners)
router.get('/middle-banner/:id', BannerMiddlewareCtrl.getSingleBanner)

router.post('/new-middle-banner'  ,BannerMiddlewareCtrl.newMidBanner)
router.post('/delete-middle-banner/:id', BannerMiddlewareCtrl.deleteBanner)
router.post('/update-middle-banner/:id', BannerMiddlewareCtrl.updateMiddleBanner)

module.exports = router