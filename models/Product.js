const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    },
    updatedAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    },
    slug: {
        require: true,
        type: String,
        unique: true,
    },
    mainFile: {
        require: true,
        type: String,
    },
    price: {
        require: true,
        type: String,
    },
    priceAtOffer: {
        require: true,
        type: String,
    },
    image: {
        require: true,
        type: String,
    },
    imageAlt: {
        require: true,
        type: String,
    },
    shortDesc: {
        require: true,
        type: String,
    },
    longDesc: {
        require: true,
        type: String,
    },
    tags: {
        require: true,
        type: Array,
        default: [],
    },
    color: {
        require: true,
        type: Array,
        default: [],
    },
    relatedProduct: {
        require: true,
        type: Array,
        default: [],
    },
    comments: {
        require: true,
        type: Array,
        default: [],
    },
    typeOfProduct: {
        require: true,
        type: String,
    },
    soldProduct: {
        require: true,
        type: Number,
        default: 0,
    },
    productView: {
        require: true,
        type: Number,
        default: 0,
    },
    features: {
        require: true,
        type: Array,
        default: [],
    },
    categories: {
        require: true,
        type: Array,
        default: [],
    },
    published: {
        require: true,
        type: Boolean,
    },
    sellOffer: {
        require: true,
        type: Boolean,
    },


})
module.exports = mongoose.model('ProductSchema', ProductSchema)