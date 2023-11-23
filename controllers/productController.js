const data = require("../public/data/data.json");


const getProductData = (suplierId) =>{
    if(suplierId){
        const fitleredData = data.supliers.find(suplier => suplier.id = suplierId);
        return fitleredData.products.map((product) => (
            {
                suplier: proveedor.name,
                product: producto.name,
                amount: producto.amount,
                description: producto.description
            }
        ))
    }
    
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

    return products;
}

const columns = [
    {field: 'suplier', name: "Proveedor"}, 
    {field: 'product', name: "Nombrer producto"}, 
    {field: 'amount', name: "Cantidad"}, 
    {field: 'description', name: "Descripción"}, 
];


module.exports = {
    getProducts(req, res) {
        const {suplierId} = req.params;
        const data = getProductData(suplierId);
        res.render("products", { title: 'Products', columns: columns, data: data });
    }
}