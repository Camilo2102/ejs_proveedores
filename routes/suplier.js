const express = require("express")
const router = express.Router();
const data = require("../public/data/data.json")
const { writeData } = require('../utils/fileUtil');

const getSupliers = () => {
    return data.supliers.map(proveedores => {
        return {
            id: proveedores.id,
            name: proveedores.name,
            phone: proveedores.phone,
            direction: proveedores.direction
        }
    })
}

const columns = [
    { field: 'name', name: "Nombre" },
    { field: 'phone', name: "Teléfono" },
    { field: 'direction', name: "Ubicación" },
    { field: 'products', name: "Productos" },
];

router.get("/", (req, res) => {
    try {
        const supliers = getSupliers();
        res.render("suplier", { title: 'Suplier', columns, data: supliers });
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/create", (req, res) => {
    try {
        const newSuplier = {
            id: data.supliers.length + 1,
            name: req.body.name || "Nuevo proveedor",
            phone: req.body.phone || "",
            direction: req.body.direction || "",
            products: []
        };

        data.supliers.push(newSuplier);

        writeData(data);

        delete newSuplier.products

        res.status(201).json({ status: true, data: newSuplier });
    } catch (error) {
        console.error("Error al crear un nuevo proveedor:", error);
        res.status(500).json({ status: false, message: "Error interno del servidor" });
    }
});

router.put("/update", (req, res) => {
    try {
        const suplierToUpdate = req.body;

        const indexToUpdate = data.supliers.findIndex(suplier => suplier.id === suplierToUpdate.id);

        if (indexToUpdate !== -1) {
            data.supliers[indexToUpdate] = { ...data.supliers[indexToUpdate], ...suplierToUpdate };

            writeData(data);

            res.status(200).json({ status: true, data: suplierToUpdate });
        } else {
            res.status(404).json({ status: false, message: "Proveedor no encontrado" });
        }
    } catch (error) {
        console.error("Error durante la actualización:", error);
        res.status(500).json({ status: false, message: "Error interno del servidor" });
    }
});

module.exports = router