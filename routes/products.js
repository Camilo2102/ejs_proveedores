const express = require("express");
const router = express.Router();
const data = require("../public/data/data.json");

const products = [];
data.proveedores.forEach(proveedor => {
    proveedor.productos.forEach(producto => {
        products.push({
            proveedor: proveedor.nombre,
            producto: producto.nombre,
            cantidad: producto.cantidad,
            descripcion: producto.descripcion
        });
    });
    
});

const columns = ['proveedor', 'producto', 'cantidad', 'descripcion'];

router.get("/", (req, res) => {
    res.render("products", { title: 'Products', columns: columns, data: products });
});

module.exports = router;
