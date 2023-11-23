const express = require('express');
const router = express.Router();
const data = require("../public/data/data.json");

let products = [];
router.get('/:name', (req, res) => {
    
    const nombreProveedor = req.params.nombre;
    // Encuentra el proveedor en el JSON por el nombre
    const proveedor = data.supliers.find(prov => prov.nombre === nombreProveedor);
    products = [];
    proveedor.productos.forEach(producto => {
        products.push({
            producto: producto.nombre,
            cantidad: producto.cantidad,
            descripcion: producto.descripcion
        });
    });
    const columns = ['producto', 'cantidad', 'descripcion'];
    if (proveedor) {
        res.render('suplierProducts', { title: `${nombreProveedor}`, columns: columns, data: products });
    } else {
        // Maneja el caso donde el proveedor no se encuentra
        res.status(404).send('Proveedor no encontrado');
    }
});

module.exports = router;
