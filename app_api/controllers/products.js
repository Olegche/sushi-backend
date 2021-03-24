// const mongoose = require('mongoose')


const Product = require('../models/product')

const sendJSONResponse = (res, status, content) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(status).json(content);
}

module.exports.getProducts = function (req, res) {
    const filter = req.body.filter || {}
    Product.find(filter)
        .exec((err, products) => {
            if (err) {
                sendJSONResponse(res, 404, {
                    message: "products not found"
                })
                return
            }
            if (products.length == 0) {
                sendJSONResponse(res, 404, {
                    message: "products not found (empty)"
                })
                return
            }
            sendJSONResponse(res, 200, products)
        })
}
module.exports.getProductById = function (req, res) {
    if (req.params && req.params.productid) {
        Product
            .findById(req.params.productid, (err, product) => {
                if (err) {
                    sendJSONResponse(res, 404, {
                        message: 'product not found'
                    });
                    return
                }
                sendJSONResponse(res, 200, product)
            })
    }
}
module.exports.addProduct = function (req, res) {
    if (!req.body || !req.body.title || !req.body.price) {
        sendJSONResponse(res, 400, {
            message: "No data"
        })
        return
    }
    const newProduct = new Product({

        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        category: req.body.category,
        calories: req.body.calories,
        isVegan: req.body.isVegan

    })
    newProduct.save((err) => {
        if (err) {
            sendJSONResponse(res, 500, {
                message: err
            })
            return
        }
        sendJSONResponse(res, 200, {
            message: 'added'
        })
    })
}
module.exports.updateProduct = function (req, res) {
    if (req.body._id) {    
        Product.findByIdAndUpdate(req.body._id, {             
                title: req.body.title,
                price: req.body.price,
                img: req.body.img,
                category: req.body.category,
                calories: req.body.calories,
                isVegan: req.body.isVegan
            },
            (err, product) => {
                if (err) {
                    sendJSONResponse(res, 404, {
                        message: 'product not found'
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
module.exports.deleteProduct = function (req, res) {

    console.log(req.body._id);
    if (req.body._id){
       Product.findOneAndDelete({ _id: req.body._id }, function (err, doc) {
        // mongoose.disconnect();
    
        if (err)
          return res
            .status(500)
            .json({ success: false, err: { msg: "Deleting failed!" } });
        res.json({ success: true });
      }); 
    }
    
}