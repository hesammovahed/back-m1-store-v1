const PostMiddleWare = require('../models/PostMiddleWare')
//dashboard
//get method
const getAllPostsDashboard = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn
            const pageNumber = req.query.pn
            const goalPosts = await PostMiddleWare.find().skip((pageNumber - 1) * paginate).limit(paginate).sort({ _id: -1 })
            const allPostNumbers = await (await PostMiddleWare.find()).length
            res.status(200).json({ goalPosts, allPostNumbers })
        } else {
            const allPosts = await PostMiddleWare.find().sort({ _id: -1 })
            res.status(200).json(allPosts)
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: ' دریافت با خطا رو به رو شد' }).status(400)
    }
}
module.exports.getAllPostsDashboard = getAllPostsDashboard

const getSinglePostByIdDashboard = async (req, res) => {
    try {
        const post = await PostMiddleWare.findById(req.params.id)
        res.status(200).json({ post, msg: ' پست با موفقیت به روز رسانی شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت پست' })
    }
}
module.exports.getSinglePostByIdDashboard = getSinglePostByIdDashboard

//create method
const createNewPostDashboard = async (req, res) => {
    try {
        const data = req.body
        data.slug = req.body.slug.toLowerCase().replace(/\s+/g, '-')
        await PostMiddleWare.create(data)
        res.status(200).json({ msg: ' پست با موفقیت افزوده شد' })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
module.exports.createNewPostDashboard = createNewPostDashboard

// update method
const updatePostDashboard = async (req, res) => {
    try {
        const data = req.body
        data.slug = req.body.slug.toLowerCase().replace(/\s+/g, '-')
        await PostMiddleWare.findByIdAndUpdate(req.params.id, data, { new: true })
        res.status(200).json({ msg: ' پست با موفقیت به روز رسانی شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در به روز رسانی پست' })
    }
}
module.exports.updatePostDashboard = updatePostDashboard


// delete method
const deletePostDashboard = async (req, res) => {
    try {
        await PostMiddleWare.findByIdAndRemove(req.params.id)
        res.status(200).json({ msg: ' پست با موفقیت حذف شد' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در حذف پست' })
    }
}

module.exports.deletePostDashboard = deletePostDashboard

//view

const getAllPostsView = async (req, res) => {
    try {
        if (req.query.pn) {
            // && req.query.pgn
            const paginate = 1
            const pageNumber = req.query.pn
            const goalPosts = await PostMiddleWare.find({ published: true }).skip((pageNumber - 1) * paginate).limit(paginate).sort({ _id: -1 }).select({
                title: 1,
                image: 1,
                imageAlt: 1,
                shortDesc: 1,
                pageView: 1,
                slug: 1,
            })
            const allPostNumbers = await (await PostMiddleWare.find()).length
            res.status(200).json({ goalPosts, allPostNumbers })
        } else {
            const allPosts = await PostMiddleWare.find({ published: true }).sort({ _id: -1 }).select({
                title: 1,
                image: 1,
                imageAlt: 1,
                shortDesc: 1,
                pageView: 1,
                slug: 1,
            })
            const allPostNumbers = await (await PostMiddleWare.find()).length
            res.status(200).json({ allPosts, allPostNumbers })
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: ' دریافت با خطا رو به رو شد' }).status(400)
    }
}
module.exports.getAllPostsView = getAllPostsView

const getNewPostForHome = async (req, res) => {
    try {
        const getNewPostForHome =
            await PostMiddleWare
                .find({ published: true })
                .select({
                    title: 1,
                    createdAt: 1,
                    shortDesc: 1,
                    slug: 1,
                    type: 1,
                    image: 1,
                    imageAlt: 1,
                    pageView: 1,
                }).sort({ _id: -1 })
                .limit(4)
        res.status(200).json(getNewPostForHome)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت پست  های فعال' })

    }
}
module.exports.getNewPostForHome = getNewPostForHome

const getSinglePostView = async (req, res) => {
    try {
        const post = await PostMiddleWare.findOne({ slug: req.params.slug })
        //page view function for view of blog
        const updatePostView = {
            pageView: post.pageView + 1,
        }
        await PostMiddleWare.findByIdAndUpdate(post._id, updatePostView, { new: true })
        res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'خطا در دریافت پست' })
    }
}
module.exports.getSinglePostView = getSinglePostView

const getMostViewedPostsForShow = async (req, res) => {
    try {
        const getNewPostForHome =
            await PostMiddleWare
                .find({ published: true })
                .select({
                    title: 1,
                    slug: 1,
                }).sort({ pageView: -1 })
                .limit(4)
        res.status(200).json(getNewPostForHome)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'دریافت با خطا رو به رو شد' })
    }
}
module.exports.getMostViewedPostsForShow = getMostViewedPostsForShow