const express = require("express")
const router = express.Router();

const {getAllSupliers, saveSuplier, updateSuplier, deleteSuplier} = require("../controllers/suplierController");

router.get("/", getAllSupliers);

router.post("/create", saveSuplier);

router.put("/update/:id", updateSuplier);

router.delete("/delete/:id", deleteSuplier);

module.exports = router