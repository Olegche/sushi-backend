const express=require('express')
const router=express.Router()
const ctrProducts=require('../controllers/products')
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/',ctrProducts.getProducts);
router.get('/:productid',ctrProducts.getProductById);
router.post('/add',
            urlencodedParser,
            ctrProducts.addProduct);
router.put('/update',
            urlencodedParser,
            ctrProducts.updateProduct);
router.delete('/delete',ctrProducts.deleteProduct);

module.exports=router