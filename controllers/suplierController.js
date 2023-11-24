const data = require("../public/data/data.json")
const { writeData } = require('../utils/fileUtil');

const { v4: uuidv4 } = require('uuid');

const {getSupliers} = require("../services/suplierService")

const columns = [
    { field: 'name', name: "Nombre" },
    { field: 'phone', name: "Teléfono" },
    { field: 'direction', name: "Ubicación" },
    { field: 'products', name: "Productos" },
];


module.exports = {
    getAllSupliers(req, res){
        try {
            const supliers = getSupliers();
            res.render("suplier", { title: 'Suplier', columns, data: supliers });
        } catch (error) {
            console.error("Error al obtener proveedores:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    saveSuplier(req, res){
        try {
            const newSuplier = {
                id: uuidv4(),
                name: req.body.name,
                phone: req.body.phone,
                direction: req.body.direction,
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
    },

    updateSuplier(req, res){
        try {
            const suplierToUpdate = req.body;

            const {id} = req.params;
    
            const indexToUpdate = data.supliers.findIndex(suplier => suplier.id === id);
    
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
    },


    deleteSuplier(req, res){
        try {
            const {id} = req.params;
    
            const dataFiltered = data.supliers.filter(suplier => suplier.id !== id);
    
            if (dataFiltered.length !== data.length) {
                const deletedData = {
                    supliers: dataFiltered
                }

                writeData(deletedData);
    
                res.status(200).json({ status: true, data: {id} });
            } else {
                res.status(404).json({ status: false, message: "Proveedor no encontrado" });
            }
        } catch (error) {
            console.error("Error durante la actualización:", error);
            res.status(500).json({ status: false, message: "Error interno del servidor" });
        }
    }


}