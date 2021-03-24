const {
    Schema,
    model
} = require('mongoose')

const order = new Schema({
    userName: String,
    email: String,
    tel: String, 
    city: String,
    street: String,
    house: String,
    entrance: String,
    flat: String,
    dontRingTheDoor: Boolean,
    leftAtDoor: Boolean,
    wishes: String,
    date: Object,
    products: Object,
    totalPrice: Object,
    statusOrder: Boolean

})

module.exports = model('Order', order)