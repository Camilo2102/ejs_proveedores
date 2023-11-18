const express = require("express")
const router = express.Router();
const data = require("../public/data/data.json")


const proveedores = data.proveedores.map(proveedores =>{
    delete proveedores.productos;
    return proveedores;
})
const columns = Object.keys(proveedores[0]);

router.get("/", (req, res) => {
    res.render("suplier", {title: 'Suplier', columns: columns, data: proveedores})
   
})

module.exports = router