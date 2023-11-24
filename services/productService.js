const data = require("../public/data/data");

module.exports = {
    getProductData (suplierId) {
        if(suplierId){
            const suplierFinded = data.supliers.find(suplier => suplier.id = suplierId);
           
            return suplierFinded.products.map((product) => (
                {
                    id: product.id,
                    suplier: suplierFinded.name,
                    product: product.name,
                    amount: product.amount,
                    description: product.description
                }
                ))
            }
            
        const products = [];
    
        data.supliers.forEach(suplier => {
            suplier.products.forEach(product => {
                products.push({
                    id: product.id,
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