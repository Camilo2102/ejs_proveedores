const express = require("express");
const router = express.Router();

const {getProducts, saveProduct, updateProduct,  deleteProduct} = require("../controllers/productController");

router.get("/:suplierId?", getProducts );

router.post("/create", saveProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router





