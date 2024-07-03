const router = require('express').Router();
const customerController = require( "../apis/Customer/customerController" )
const productcontroller = require("../apis/Product/productController")
const cartController = require("../apis/shopping cart/cartController")

router.post('/register', customerController.register)


router.get('/products', productcontroller.all)
router.get('/products/:id', productcontroller.single)

router.use(require('../middleware/tokenchecker'))
router.get('/cart/:id',cartController.all)
router.post('/cart',cartController.add)

router.delete('/cart/:id',cartController.del)



router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "invalid address"
    })
})
module.exports = router;  