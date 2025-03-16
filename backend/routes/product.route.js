const express = require("express");
const {getProducts, createProducts, updateProducts, deleteProducts} = require("../controller/product.controller.js");
const router = express.Router();

router.route("/").get(getProducts).post(createProducts);

router.route("/:id").put(updateProducts).delete(deleteProducts);

module.exports = router;