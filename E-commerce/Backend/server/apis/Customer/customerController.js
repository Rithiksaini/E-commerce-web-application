const User = require('../user/usermodel')
const Customer = require('./customerModel')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    let validation = ""

    if (!req.body.name) {
        validation += "name is required"
    }
    if (!req.body.email) {
        validation += "email is required"
    }
    if (!req.body.password) {
        validation += "password is required"
    }
    if (!req.body.contact) {
        validation += "contact is required"
    }
    if (!req.body.address) {
        validation += "address is required"
    }
    if (!req.body.gender) {
        validation += "gender is required"
    }


    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        let prevCustomer = await Customer.findOne({ email: req.body.email })
        if (prevCustomer == null) {
            let totalUsers = await User.countDocuments()
            let obj1 = new User()
            obj1.autoId = totalUsers + 1
            obj1.name = req.body.name
            obj1.email = req.body.email
            obj1.password = bcrypt.hashSync(req.body.password, 10)

            obj1.save()
                .then(async (savedUser) => {
                    let totalCustomers = await Customer.countDocuments()
                    let customer = new Customer()
                    customer.autoId = totalCustomers + 1
                    customer.name = req.body.name
                    customer.email = req.body.email
                    customer.contact = req.body.contact
                    customer.address = req.body.address
                    customer.gender = req.body.gender
                    customer.userId = savedUser._id

                    customer.save()
                        .then((savedCustomer) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "New Account Created", data: savedUser
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
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
        else {
            res.send({
                success: false,
                status: 200,
                message: "User already exists with same mail"
            })
        }
    }

}

const all = (req, res) => {
    Customer.find(req.body)
        .sort({ createdAt: 1 })
        .populate('userId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "view Customer",
                data: result
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

const single = (req, res) => {
    let validation = ""

    if (!req.body.userId) {
        validation = "userId is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error " + validation
        })
    }
    else {
        Customer.findOne({ userId: req.body.userId })
            .populate('userId')
            .exec()

            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Customer not found"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Customer",
                        data: result
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
module.exports = { register, all, single, }