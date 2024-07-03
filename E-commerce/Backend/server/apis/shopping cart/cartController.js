const cartModel = require("./cartModel");
const add = async (req, res) => {
    let validation = "";
    if (!req.body.userId) {
        validation += "userId is required";
    }
    if (!req.body.productId) {
        validation += "productId is required";
    }
    if (!req.body.quantity) {
        validation += "quantity is required";
    }

    if (!!validation) {
        res.send({
            status: 500,
            success: false,
            message: "Validation error occured" + validation,
        });
    } else {
        let prevProduct = await cartModel.findOne({
            userId: req.body.userId,
            productId: req.body.productId,
        });

        if (prevProduct == null) {
            let obj = new cartModel();
            obj.userId = req.body.userId;
            obj.productId = req.body.productId;
            obj.quantity = req.body.quantity;
            obj
                .save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "New Cart Added",
                        data: result,
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.message,
                    });
                });
        } else {
            prevProduct.quantity += Number(req.body.quantity);
            prevProduct
                .save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Quantity Updated",
                        data: result,
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.message,
                    });
                });
        }
    }
};
const all = (req, res) => {

    cartModel
        .find(req.params)
        .populate("userId")
        .populate("productId")
        .exec()
        .then((result) => {
            res.send({
                status: 200,
                success: true,
                meassage: "Cart Loaded",
                data: result,
                total: result.length,
            });
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Error Occured",
                error: err.message,
            });
        });
};



const del = async (req, res) => {
    try {
        // Find the product by ID
        const Product = await cartModel.findByIdAndDelete(req.params.id);
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
            message: "Product Removed",

        })
    } catch (err) {
        res.send({
            success: false,
            status: 500,
            message: err.message
        })
    }
}


module.exports = { add, all, del };