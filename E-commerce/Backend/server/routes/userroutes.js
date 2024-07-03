const router = require('express').Router();
const usercontroller = require('../apis/user/usercontroller');


router.post("/login",usercontroller.login  )
router.use(require('../middleware/tokenchecker'))
router.post("/changepassword",usercontroller.changePass)

router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "invalid address"
    })
})
module.exports = router;  