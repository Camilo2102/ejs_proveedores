
const updateBtn = document.getElementById("btn_update");
const closeBtn = document.getElementById("close_btn");
const closeDeleteBtn = document.getElementById("close_delete_btn");

const formId = document.getElementById("form-id");
const formProduct = document.getElementById("form-product");
const formAmount = document.getElementById("form-amount");
const formDescription = document.getElementById("form-description");
const selectId = document.getElementById("select_suplier_id");
const tableBody = document.getElementById("table_body");

const btnCreate = document.getElementById("btn_create")
const btnDelete = document.getElementById("btn_delete")
const deleteDataContainer = document.getElementById("delete_data");

let update = false;

const dataFilePath = 'data/data.json';

fetch(dataFilePath)
  .then(response => response.json())
  .then(data => {
    // Aquí puedes usar los datos cargados
    console.log(data);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

const setUpdateData = (data) => {
    formId.value = data.id;
    formProduct.value = data.product;
    formAmount.value = data.amount;
    formDescription.value = data.description;
}

const setDeleteData = (id) => {
    const name = document.getElementById("name_"+id).textContent;
    const phone = document.getElementById("phone_"+id).textContent;
    const direction = document.getElementById("direction_" + id).textContent;

    btnDelete.setAttribute("value", id);

    deleteDataContainer.innerHTML = `
        <li>Nombre: ${name}</li>
        <li>Teléfono: ${phone}</li>
        <li>Dirección: ${direction}</li>
    `
}

const getFomrData = () => {
    return {
        id: formId.value,
        supplierId: selectId.value,
        product: formProduct.value,
        amount: formAmount.value,
        description: formDescription.value
    }
}

const asignUpdateCallbacks = () => {
    const updateBtns = document.getElementsByName("btn_show_update");

    updateBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const value = JSON.parse(btn.getAttribute("value"));
            update = true;
            setUpdateData(value);
        })
    })
}

const asignDeleteCallbacks = () => {
    const deleteBtns = document.getElementsByName("btn_show_delete");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const deleteId = btn.getAttribute("value");
            setDeleteData(deleteId);
        })  
    })
}

const start = () => {
    asignUpdateCallbacks();
    asignDeleteCallbacks();
}

start();

btnCreate.addEventListener('click', ()=>{
    selectId.value = null;
    formProduct.value = null;
    formAmount.value = null;
    formDescription.value = null;
    update = false;
})

btnDelete.addEventListener("click", () => {
    const deleteId = btnDelete.getAttribute("value");
    fetch(`http://localhost:3000/products/delete/${deleteId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        closeDeleteBtn.click();
        return res.json()
    }).then(res => {
        console.log()
        console.log(res.data.id)
        deleteRegister(res.data.id);
    }).catch(err => {
        console.error(err);
    })

})

const updateRegister = (suplier) => {
    const tdName = document.getElementById("product_"+suplier.id);
    const tdAmount = document.getElementById("amount_"+suplier.id);
    const tdDescition = document.getElementById("description_" + suplier.id);
    const updateBTN = document.getElementById("updateBtn_" + suplier.id);
    updateBTN.setAttribute("value", JSON.stringify(suplier))

    tdName.innerHTML = suplier.product;
    tdAmount.innerHTML = suplier.amount;
    tdDescition.innerHTML = suplier.description;
}

const deleteRegister = (id) => {
    const trToDelete = document.getElementById(`row_${id}`);
    trToDelete.remove()
}

const crudButons = (suplier) => {
    return `<td>
    <a type="button" name="btn_show_update" data-bs-toggle="modal" data-bs-target="#updateModal" id="updateBtn_${suplier.id}" value='${JSON.stringify(suplier)}'>
        <img src="../img/pen.png" alt="Actualizar producto" style="width: 20px; height: auto;">
    </a>
</td>
<td>
    <a type="button" name="btn_show_delete" data-bs-toggle="modal" data-bs-target="#deleteModal" id="deleteBtn_${suplier.id}" value="${suplier.id}">
        <img src="../img/trash.png" alt="Eliminar producto" style="width: 20px; height: auto;">
    </a>
</td>`
}

const createRegister = (suplier) => {
    const rutaArchivo = 'data/data.json';
    fetch(rutaArchivo)
    .then(response => response.json())
    .then(data => {
        const matchingSuplier = data.supliers.find(sup => sup.id === suplier.supplierId);
        tableBody.innerHTML += `
        <tr id="row_${suplier.id}">
            <td id="id_${suplier.id}"> ${matchingSuplier.name} </td>
            <td id="product_${suplier.id}"> ${suplier.product} </td>
            <td id="amount_${suplier.id}"> ${suplier.amount}</td>
            <td id="description_${suplier.id}"> ${suplier.description}</td>
            ${crudButons(suplier)}
        
        </tr>    `
        asignUpdateCallbacks();
        asignDeleteCallbacks();
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
   
}

const updateProduct = () => {
    const product = getFomrData();
    console.log(product)
    fetch(`http://localhost:3000/products/update/${product.id}`,{
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        closeBtn.click();
        return res.json()
    }).then(res => {
        updateRegister(product);
    }).catch(err => {
        console.error(err);
    })
}

const createProduct = () => {
    const product = getFomrData();
    console.log(product)
    fetch("http://localhost:3000/products/create",{
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        closeBtn.click();
        return res.json()
    }).then(res => {
        createRegister(product);
    }).catch(err => {
        console.error(err);
    })
}

updateBtn.addEventListener("click", () => {
    if(update){
        updateProduct();
    } else {
        createProduct();
    }
})