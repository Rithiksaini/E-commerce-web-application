const product = require('./productmodel')

const add = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required  "
    }
    if (!req.body.price) {
        validation += "price is Required  "
    }
    if (!req.body.detail) {
        validation += "detail is Required  "
    }




    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        let total = await product.countDocuments()
        let obj = new product()
        obj.autoId = total + 1
        obj.name = req.body.name
        obj.price = parseInt(req.body.price)
        obj.detail = req.body.detail
        obj.image = "product/" + req.file.filename

        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Product added",
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
}

const all = (req, res) => {
    product.find(req.params)
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All product Loaded",
                total: result.length,
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

const single = async (req, res) => {

    try {
        const Product = await product.findById(req.params.id);
        if (!Product) {
            res.send({
                success: false,
                status: 400,
                message: "product does not exist"
            })
        }
        res.send(Product);
    } catch (error) {
        res.send({
            success: false,
            status: 500,
            message: error.message
        })
    }
}
const update = async (req, res) => {

    try {
        const updatedProduct = await product.findById(req.params.id);

        if (updatedProduct == null) {
            res.send({
                success: false,
                status: 400,
                message: "product does not exist"
            })
        }
        else {
            if (!!req.body.name) updatedProduct.name = req.body.name
            if (!!req.body.price) updatedProduct.price = req.body.price
            if (!!req.body.detail) updatedProduct.detail = req.body.detail
            if (!!req.file) updatedProduct.image = "product/" + req.file.filename

            updatedProduct.save()
                .then((updatedData) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Data Updated",
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
    }

    catch (err) {
        res.send({
            success: false,
            status: 500,
            message: err.message
        })
    }

}

const del = async (req, res) => {
    try {
        // Find the product by ID
        const Product = await product.findByIdAndDelete(req.params.id);
        if (Product == null) {
            return res.send({
                success: false,
                status: 400,
                message: "product does not exist"
            })
        }
        res.send({
            success: true,
            status: 200,
            message: "Product deleted",

        })
    } catch (err) {
        res.send({
            success: false,
            status: 500,
            message: err.message
        })
    }
}


module.exports = { add, all, single, update, del }