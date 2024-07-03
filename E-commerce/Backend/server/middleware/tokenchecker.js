const jwt = require('jsonwebtoken')
const secretKey = "kshxfywt543$%156%^3EFFC126856$#@#"


const check = (req, res, next) => {

    let token = req.headers['authorization']
    if (!!token) {
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                res.send({
                    success: false,
                    status: 403,
                    messege: 'Unauthorized Access',
                    token
                })
            }
            else {
                next()
            }
        })
    }
    else {
        res.send({
            success: false,
            status: 404,
            message: "No Token Found",
        })
    }
}

module.exports = check