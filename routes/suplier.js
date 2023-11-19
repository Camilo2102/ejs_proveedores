const express = require("express")
const router = express.Router();
const data = require("../public/data/data.json")


const supliers = data.proveedores.map(proveedores =>{
    return {
        Nombre: proveedores.nombre,
        Teléfono: proveedores.telefono,
        Ubicación: proveedores.ubicacion
    }
})
const columns = ["Nombre", "Teléfono", "Ubicación"];

router.get("/", (req, res) => {
    res.render("suplier", {title: 'Suplier', columns: columns, data: supliers})
   
})

module.exports = router