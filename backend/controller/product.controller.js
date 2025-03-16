const mongoose = require("mongoose");
const productModel = require("../models/product.model.js");

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProducts = async (req, res) => {
    try {
        const product = req.body;
        if(!product.name || !product.price || !product.image) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }
        const newProduct = new productModel(product);
        try {
            await newProduct.save();
            res.status(201).json({ success: true, data: newProduct });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ success: false, message: "Invalid Id"});
        } else {
            const updateProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
            res.status(200).json({ success: true, data: updateProduct });
        }
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ success: false, message: "Invalid Id" });
        } else if(!product) {
            res.status(404).json({ success: false, message: "Id not found" });
        } else {
            await productModel.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Product Deleted" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}