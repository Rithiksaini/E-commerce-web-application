const router = require('express').Router();

const multer = require('multer')
const productcontroller =require('../apis/Product/productController')
// const usercontroller = require('../apis/user/usercontroller');
const customercontroller = require('../apis/Customer/customerController')

router.use(require('../middleware/tokenchecker'))

const productStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "server/public/product")
    },
    filename:(req, file, cb)=>{
        cb(null,Date.now()+"-"+ file.fieldname +"-"+ file.originalname)
    }
})
//Product Routes
const productUpload = multer({storage:productStorage})
router.post("/products", productUpload.single('picture'),productcontroller.add)
router.get('/products', productcontroller.all)
router.get('/products/:id', productcontroller.single)
router.put('/products/:id', productUpload.single('picture'), productcontroller.update)
router.delete("/products/:id", productcontroller.del);

//customer routes

router.post('/customer/all', customercontroller.all)
router.post('/customer/single', customercontroller.single)

router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "invalid address"
    })
})
module.exports = router;  