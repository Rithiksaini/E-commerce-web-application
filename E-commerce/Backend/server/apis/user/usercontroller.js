const User = require('./usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = "kshxfywt543$%156%^3EFFC126856$#@#"
const login = async (req, res) => {
    let validation = ""
    if (!req.body.email) {
        validation += "Email is required"
    }
    if (!req.body.password) {
        validation += "Password is required"
    }
    if (!!validation)
        res.send({
            success: false,
            status: 500,
            message: validation
        })
    else {
        let userData = await User.findOne({ email: req.body.email })
        if (userData == null) {
            res.send({
                success: false,
                status: 500,
                message: "User not found"
            })
        }
        else {
            if (bcrypt.compareSync(req.body.password, userData.password)) {
                if (userData.status) {
                    let payload = {
                        _id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        userType: userData.userType
                    }

                    let token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
                    res.send({
                        success: true,
                        status: 200,
                        message: "Login Successfull",
                        data: userData,
                        token: token
                    })
                }
                else res.send({
                    success: false,
                    status: 500,
                    message: "Account Inactive"
                })
            }
            else res.send({
                success: false,
                status: 500,
                message: "Invalid Credentials"
            })
        }
    }
}

const changePass = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required.";
    }
    if (!req.body.currentPassword) {
        validation += "Current Password is Required";
    }
    if (!req.body.newPassword) {
        validation += "New Password is Required.";
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error :" + validation
        })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account does not exist",
                    })
                }
                else {

                    if (!bcrypt.compareSync(req.body.currentPassword, userData.password)) {
                        return  res.send({
                            success: false,
                            status: 400,
                            message: "Password Invalid",
                        })
                    }
                if (!!req.body.currentPassword) userData.password = bcrypt.hashSync(req.body.newPassword, 10)
                    userData.save()
                        .then((updatedPass) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Password updated successfully",
                                data: updatedPass
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err
                })
            })
    }
}
const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    // if (!req.body.status) {
    //     validation = "status is required"
    // }
    if (!!validation) {
        res.send({
            success: false,
            status: 404,
            message: "validation error :" + validation
        })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "User not found"
                    })
                }
                else if(result.status==true) {
                    result.status = false

                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "User Inactive",
                                data: updatedData
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }
                else{
                    
                    result.status= true
                    result.save()
                    .then((updatedData) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "User Activated",
                            data: updatedData
                        })
                    })
                    .catch((err) => {
                        res.send({
                            success: false,
                            status: 500,
                            message: err.message
                        })
                    })
                }
            })
            
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}
module.exports = { login, changePass, update }
