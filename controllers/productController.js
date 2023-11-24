const {getProductData} = require("../services/productService");
const {getSupliers} = require("../services/suplierService");


const columns = [
    {field: 'suplier', name: "Proveedor"}, 
    {field: 'product', name: "Nombrer producto"}, 
    {field: 'amount', name: "Cantidad"}, 
    {field: 'description', name: "Descripción"}, 
];


module.exports = {
    getProducts(req, res) {
        const {suplierId} = req.params;
        const products = getProductData(suplierId);
        const supliers = getSupliers();
        res.render("products", { title: 'product', columns: columns, data: products, supliers: supliers });
    }
}