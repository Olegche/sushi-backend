const mongoose = require('mongoose')
const Order = require('../models/order')
//
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')

const {
    SENGRID_API_KEY
} = require('../../config')
const regEmail = require('../../emails/orderGet')
const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: SENGRID_API_KEY
    }
}))

const sendJSONResponse = (res, status, content) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(status).json(content);
}

module.exports.getOrders = function (req, res) {
    const filter = req.body.filter || {}
    Order.find(filter)
        .exec((err, orders) => {
            if (err) {
                sendJSONResponse(res, 404, {
                    message: "orders not found"
                })
                return
            }
            if (orders.length == 0) {
                sendJSONResponse(res, 404, {
                    message: "orders not found (empty)"
                })
                return
            }
            sendJSONResponse(res, 200, orders)
        })
}
module.exports.getOrderById = function (req, res) {
    if (req.params && req.params.orderid) {
        Order
            .findById(req.params.orderid, (err, order) => {
                if (err) {
                    sendJSONResponse(res, 404, {
                        message: 'order not found'
                    });
                    return
                }
                sendJSONResponse(res, 200, order)
            })
    }
}
module.exports.addOrder =  function (req, res) {
    if (!req.body || !req.body.userName ) {
        sendJSONResponse(res, 400, {
            message: "No data"
        })
        return
    }
    const newOrder = new Order({

        userName: req.body.userName,
        tel: req.body.tel,
        email: req.body.email,
        city: req.body.city,
        street: req.body.street,
        category: req.body.category,     
        house: req.body.house,
        entrance: req.body.entrance,
        flat: req.body.flat,
        dontRingTheDoor: req.body.dontRingTheDoor,
        leftAtDoor: req.body.leftAtDoor,     
        wishes: req.body.wishes,
        date: req.body.date,
        products: req.body.products,     
        totalPrice: req.body.totalPrice,
        statusOrder: req.body.statusOrder

       
    })
    newOrder.save((err) => {
        if (err) {
            sendJSONResponse(res, 500, {
                message: 'err',
                
            })
            return
        }
        sendJSONResponse(res, 200, {
            message: 'added'
        })
    })
     transporter.sendMail(regEmail(req.body))
}


module.exports.updateOrder = function (req, res) {
    if (req.body._id) {    
        Order.findByIdAndUpdate(req.body._id, {             
         statusOrder:req.body.statusOrder
            },
            (err, order) => {
                if (err) {
                    sendJSONResponse(res, 404, {
                        message: 'order not found'
                    });
                    return
                }
                sendJSONResponse(res, 200, {
                    message: 'changed'
                })
            }
        )
    } else {
        sendJSONResponse(res, 400, {
            message: ' bad request ('
        })
    }
}

