const express = require("express");
const router = express.Router();
const data = require("../public/data/data.json");

const products = [];
data.proveedores.forEach(proveedor => {
    if (proveedor.productos && Array.isArray(proveedor.productos)) {
        proveedor.productos.forEach(producto => {
            products.push({
                Proveedor: proveedor.nombre,
                Producto: producto.nombre,
                cantidad: producto.cantidad,
                Descripción: producto.descripcion
            });
        });
    }
});

const columns = ['Proveedor', 'Producto', 'cantidad', 'Descripción'];

router.get("/", (req, res) => {
    res.render("products", { title: 'Products', columns: columns, data: products });
});

module.exports = router;
