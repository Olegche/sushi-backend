const express=require('express')
const router=express.Router()
const ctrOrders=require('../controllers/orders')
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/',ctrOrders.getOrders);
router.get('/:orderid',ctrOrders.getOrderById);
router.post('/add',
            urlencodedParser,
            ctrOrders.addOrder);
router.put('/update',
            urlencodedParser,
            ctrOrders.updateOrder);

module.exports=router