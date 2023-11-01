const express = require('express')
const router = express()
const PostMiddleWareCtrl = require('../controllers/PostMiddleWareCtrl.js')

// routes for dashboard
router.get('/all-posts', PostMiddleWareCtrl.getAllPostsDashboard)
router.get('/post-by-id/:id', PostMiddleWareCtrl.getSinglePostByIdDashboard)

router.post('/create-post', PostMiddleWareCtrl.createNewPostDashboard)
router.post('/update-post/:id', PostMiddleWareCtrl.updatePostDashboard)
router.post('/delete-post/:id', PostMiddleWareCtrl.deletePostDashboard)

//routes of main
router.get('/posts-for-Home', PostMiddleWareCtrl.getNewPostForHome)
router.get('/posts', PostMiddleWareCtrl.getAllPostsView)
router.get('/post/:slug', PostMiddleWareCtrl.getSinglePostView)

router.get('/getMostViewedPostsForShow', PostMiddleWareCtrl.getMostViewedPostsForShow)
module.exports = router