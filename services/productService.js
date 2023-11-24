const data = require("../public/data/data");

module.exports = {
    getProductData (suplierId) {
        if(suplierId){
            const fitleredData = data.supliers.find(suplier => suplier.id = suplierId);
           
            return fitleredData.products.map((suplier) => (
                {
                    id: suplier.id,
                    suplier: suplier.name,
                    product: suplier.name,
                    amount: suplier.amount,
                    description: suplier.description
                }
                ))
            }
            
        const products = [];
    
        data.supliers.forEach(suplier => {
            suplier.products.forEach(product => {
                products.push({
                    suplier: suplier.name,
                    product: product.name,
                    amount: product.amount,
                    description: product.description
                });
            });
        });
    
        return products;
    }
}