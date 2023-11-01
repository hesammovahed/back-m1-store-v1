const express = require('express')
const router = express()

const MiddleSliderMiddleWareCtrl = require('../controllers/MainSliderMiddleWareCtrl')

//routes for Dashboard
router.get('/get-all-mainSliders', MiddleSliderMiddleWareCtrl.getAllSliderDashboard)
router.get('/get-mainSlider-by-id/:id', MiddleSliderMiddleWareCtrl.getSliderByIdDashboard)

router.post('/create-slider', MiddleSliderMiddleWareCtrl.createSlider)
router.post('/delete-slider/:id', MiddleSliderMiddleWareCtrl.deleteSlider)
router.post('/edit-slider/:id', MiddleSliderMiddleWareCtrl.editSlide)

//route for view
router.get("/get-all-slider-for-show" ,MiddleSliderMiddleWareCtrl.getSlidersForView)


module.exports = router