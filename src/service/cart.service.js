const authSchema = require("../model/auth.schema");
const cartSchema = require("../model/cart.schema");
const productSchema = require("../model/product.schema");
const { HTTP_CODE, CONSTANTS_TEXT } = require("../utils/constant");
const mongoose = require("mongoose");

//card update service
const updateCartService = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let obj = {};

        const findProduct = await productSchema.findById(
            new mongoose.Types.ObjectId(productId)
        );
        if(findProduct){
            obj = { ...findProduct?._doc, productQuantity: quantity };
            const updatedCart = await cartSchema.findOneAndUpdate(
                { userId: req.user.id, productId: productId },
                { $set: { product: obj } },
                { upsert: true }
            );
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.SUCCESS,
                data: updatedCart
            }
        }else{
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.PRODUCT_NOT_FOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: false,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }

};

//get user cart service
const getUserCartService = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        let userCart = await authSchema.aggregate([
            {
                $match: { _id: userId },
            },
            {
                $lookup: {
                    from: "carts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "item",
                },
            },
        ]);
       delete userCart[0].password
       delete userCart[0].confirmPassword
        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.SUCCESS,
            data: userCart[0]
        }
    } catch (err) {
        return {
            error: false,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

module.exports = { updateCartService,getUserCartService }