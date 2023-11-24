const express = require("express");
const router = express.Router();

const {getProducts} = require("../controllers/productController");

router.get("/:suplierId?", getProducts );

module.exports = router;
