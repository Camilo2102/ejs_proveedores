const data = require("../public/data/data.json")
const { writeData } = require('../utils/fileUtil');
const { v4: uuidv4 } = require('uuid');
const {getProductData} = require("../services/productService");
const {getSupliers} = require("../services/suplierService");


const columns = [
    {field: 'suplier', name: "Proveedor"}, 
    {field: 'product', name: "Nombre producto"}, 
    {field: 'amount', name: "Cantidad"}, 
    {field: 'description', name: "Descripción"}, 
];


module.exports = {
    getProducts(req, res) {
        const {suplierId} = req.params;
        const products = getProductData(suplierId);
        const supliers = getSupliers();
        res.render("products", { title: 'products', columns: columns, data: products, supliers: supliers });
    },

    saveProduct(req, res) {
        try {
            const supplierId = req.body.supplierId; 
            console.log('este')
            console.log(supplierId);
            const supplier = data.supliers.find((sup) => sup.id === supplierId);

            if (!supplier) {
                return res.status(404).json({ status: false, message: "Proveedor no encontrado" });
            }

            const newProduct = {
                id: uuidv4(),
                name: req.body.product,
                amount: req.body.amount,
                description: req.body.description
            };

            supplier.products.push(newProduct);

            writeData(data);

            res.status(201).json({ status: true, data: newProduct });
        } catch (error) {
            console.error("Error al agregar un nuevo producto al proveedor:", error);
            res.status(500).json({ status: false, message: "Error interno del servidor" });
        }
    },
    updateProduct(req, res) {
        try {
            const productIdToUpdate = req.params.productId; 
            const productData = req.body; 

            const suplierId = req.params.suplierId;
            const suplier = data.supliers.find((sup) => sup.id === suplierId);

            if (!suplier) {
                return res.status(404).json({ status: false, message: "Proveedor no encontrado" });
            }

            const productIndex = suplier.products.findIndex(product => product.id === productIdToUpdate);

            if (productIndex !== -1) {
                suplier.products[productIndex] = { ...suplier.products[productIndex], ...productData };
                writeData(data);

                res.status(200).json({ status: true, data: suplier.products[productIndex] });
            } else {
                res.status(404).json({ status: false, message: "Producto no encontrado en el proveedor" });
            }
        } catch (error) {
            console.error("Error durante la actualización del producto:", error);
            res.status(500).json({ status: false, message: "Error interno del servidor" });
        }
    },
    deleteProduct(req, res) {
        try {
            const { suplierId, productId } = req.params;
            const suplier = data.supliers.find(suplier => suplier.id === suplierId);
    
            if (suplier) {
                const updatedProducts = suplier.products.filter(product => product.id !== productId);
                suplier.products = updatedProducts;
                writeData(data);
    
                res.status(200).json({ status: true, data: { id: productId } });
            } else {
                res.status(404).json({ status: false, message: "Proveedor no encontrado" });
            }
        } catch (error) {
            console.error("Error durante la eliminación del producto:", error);
            res.status(500).json({ status: false, message: "Error interno del servidor" });
        }
    }
    


}