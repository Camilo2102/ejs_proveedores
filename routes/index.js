const express = require("express")
const router = express.Router();

const homeRouter = require("./home")
const suplierRouter = require("./suplier")
const suplierProductsRouter = require("./suplierProducts")
const productRouter = require("./products")

router.use("/", homeRouter)
router.use("/suplier", suplierRouter);
router.use("/suplierProducts", suplierProductsRouter)
router.use("/products", productRouter);

module.exports = router