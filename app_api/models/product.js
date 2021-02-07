const {
    Schema,
    model
} = require('mongoose')

const product = new Schema({
    title: String,
    price: String, 
    img: String,
    category: String,
    calories: String,
    isVegan: Boolean
})

module.exports = model('Product', product)