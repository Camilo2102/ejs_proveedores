const express = require("express");
const router = express.Router();
const data = require("../public/data/data.json");

const products = [];
data.supliers.forEach(proveedor => {
    proveedor.products.forEach(producto => {
        products.push({
            suplier: proveedor.name,
            product: producto.name,
            amount: producto.amount,
            description: producto.description
        });
    });
    
});

const columns = [
    {field: 'suplier', name: "Proveedor"}, 
    {field: 'product', name: "Nombrer producto"}, 
    {field: 'amount', name: "Cantidad"}, 
    {field: 'description', name: "Descripción"}, 
];

router.get("/", (req, res) => {
    res.render("products", { title: 'Products', columns: columns, data: products });
});

module.exports = router;
