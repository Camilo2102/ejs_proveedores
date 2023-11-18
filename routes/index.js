const express = require("express")
const router = express.Router();

const suplierRouter = require("./suplier")
const productRouter = require("./products")

router.use("/suplier", suplierRouter);
router.use("/products", productRouter);

module.exports = router