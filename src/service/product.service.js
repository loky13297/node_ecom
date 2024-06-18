const productCreate = require("../model/product.schema");
const { HTTP_CODE, CONSTANTS_TEXT } = require("../utils/constant");
const pagination = require("../utils/pagination");

//create product service
const createProductService = async (req, res) => {
    try {
        let newProducts = await productCreate.create(req.body);
        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.PRODUCT_CREATE,
            data: newProducts
        };
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

//get all product service
const getAllProductService = async (req, res) => {
    try {
        let pageMeta = await pagination(req, productCreate);
        let products = await productCreate
            .find()
            .limit(pageMeta?.limit)
            .skip(pageMeta?.skip);
        delete pageMeta.skip;
        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.SUCCESS,
            data: { products, pageMeta }
        };
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

//delete product service
const deleteProductService = async (req, res) => {
    try {
        await productCreate.findOneAndDelete({ _id: req.params.id });
        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.PRODUCT_DELETE,
            data: {}
        };
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

//update product service
const updateProductService = async (req, res) => {
    try {
        await productCreate.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { upsert: true }
        );
        return {
            error: false,
            status: HTTP_CODE.SUCCESS,
            message: CONSTANTS_TEXT.PRODUCT_UPDATE,
            data: {}
        };
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
};

//get product by id service
const getProductByIdService = async (req, res) => {
    try {
        let product = await productCreate.findOne({ _id: req.params.id })
        if (!!product) {
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.SUCCESS,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}

module.exports = {
    createProductService,
    getAllProductService,
    deleteProductService,
    updateProductService,
    getProductByIdService
}
