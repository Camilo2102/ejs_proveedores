const express = require("express")
const router = express.Router();
const data = require("../public/data/data.json")


const supliers = data.proveedores.map(proveedores =>{
    return {
        id: proveedores.id,
        nombre: proveedores.nombre,
        telefono: proveedores.telefono,
        ubicacion: proveedores.ubicacion
    }
})
const columns = ["nombre", "telefono", "ubicacion"];

router.get("/", (req, res) => {
    res.render("suplier", {title: 'Suplier', columns: columns, data: supliers})
   
})

module.exports = router