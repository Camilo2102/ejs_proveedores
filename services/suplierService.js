const data = require("../public/data/data");

module.exports = {
    getSupliers () {
        return data.supliers.map(proveedores => {
            return {
                id: proveedores.id,
                name: proveedores.name,
                phone: proveedores.phone,
                direction: proveedores.direction
            }
        })
    }
}