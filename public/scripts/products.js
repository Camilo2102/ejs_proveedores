
const updateBtn = document.getElementById("btn_update");
const closeBtn = document.getElementById("close_btn");
const closeDeleteBtn = document.getElementById("close_delete_btn");

const formId = document.getElementById("form-id");
const formProduct = document.getElementById("form-product");
const formAmount = document.getElementById("form-amount");
const formDescription = document.getElementById("form-description");

const validationProduct = document.getElementById("validation-product");
const validationAmount = document.getElementById("validation-amount");
const validationDescription = document.getElementById("validation-description");
const validationFull = document.getElementById("validation-full")

const selectId = document.getElementById("select_suplier_id");
const validacionSelectedId = document.getElementById("validation-selected-id");

const tableBody = document.getElementById("table_body");

const btnCreate = document.getElementById("btn_create")
const btnDelete = document.getElementById("btn_delete")
const deleteDataContainer = document.getElementById("delete_data");


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[name="btn_show_update"]').forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('select_suplier_id').style.display = 'none';
            document.getElementById('label_suplir_select').style.display = 'none';
        });
    });

    document.getElementById('btn_create').addEventListener('click', function () {
        var path = window.location.pathname;
        if(path === '/products'){
            document.getElementById('select_suplier_id').style.display = 'block';
            document.getElementById('label_suplir_select').style.display = 'block';
        }else{
            document.getElementById('select_suplier_id').style.display = 'none';
            document.getElementById('label_suplir_select').style.display = 'none';
        }
       
    });
});


function getSelectedText() {
    var selectedText = '';

    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        selectedText = document.selection.createRange().text;
    }

    return selectedText;
}


formProduct.addEventListener('input', function (event) {
    var input = this.value;
    var selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (!/[a-zA-Z]/.test(input)) {
        validationProduct.textContent = 'Ingrese solo letras.';
        validationProduct.style.display = 'block';
    } else if (input.length < 4) {
        validationProduct.textContent = 'Mayor a tres';
        validationProduct.style.display = 'block';
    } else {
        validationProduct.textContent = '';
        validationProduct.style.display = 'none';
    }
});

formProduct.addEventListener('keydown', function (event) {
    var key = event.key;
    var input = this.value;
    var selectedText = getSelectedText();

    if (selectedText.length > 0) {
        input = selectedText;
    }

    if (!/[a-zA-Z]/.test(key)) {
        event.preventDefault();
        validationProduct.textContent = 'Ingrese solo letras.';
        validationProduct.style.display = 'block';
    } else if (input.length < 4) {
        validationProduct.textContent = 'Mayor a tres';
        validationProduct.style.display = 'block';
    } else {
        validationProduct.textContent = '';
        validationProduct.style.display = 'none';
    }
});

formAmount.addEventListener('input', function (event) {
    var input = this.value;
    var selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (!/^\d+$/.test(input)) {
        validationAmount.textContent = 'Ingrese solo números.';
        validationAmount.style.display = 'block';
    } else if (input.length < 1) {
        validationAmount.textContent = 'Ingrese al menos un número.';
        validationAmount.style.display = 'block';
    } else {
        validationAmount.textContent = '';
        validationAmount.style.display = 'none';
    }
});

formAmount.addEventListener('keydown', function (event) {
    var key = event.key;
    var input = this.value;
    var selectedText = getSelectedText();

    if (selectedText.length > 0) {
        input = selectedText;
    }

    if (!/^\d+$/.test(key)  && key !== 'Backspace') {
        event.preventDefault();
        validationAmount.textContent = 'Ingrese solo números.';
        validationAmount.style.display = 'block';
    } else if (input.length === 0 && key === '0') {
        event.preventDefault();
        validationAmount.textContent = 'Ingrese al menos un número diferente de cero.';
        validationAmount.style.display = 'block';
    } else {
        validationAmount.textContent = '';
        validationAmount.style.display = 'none';
    }
});

formDescription.addEventListener('input', function (event) {
    var input = this.value;
    var selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (input.length < 5) {
        validationDescription.textContent = 'Ingrese al menos cinco caracteres.';
        validationDescription.style.display = 'block';
    } else {
        validationDescription.textContent = '';
        validationDescription.style.display = 'none';
    }
});

formDescription.addEventListener('keydown', function (event) {
    var input = this.value;
    if (input.length < 5) {
        validationDescription.textContent = 'Ingrese al menos cinco caracteres.';
        validationDescription.style.display = 'block';
    } else {
        validationDescription.textContent = '';
        validationDescription.style.display = 'none';
    }
});

selectId.addEventListener('change', () =>{
    if(selectId.value === ""){
        validacionSelectedId.textContent = 'Debe de seleccionar un proveedor'
    }else{
        validacionSelectedId.textContent = ''
    }
})

let update = false;

const setUpdateData = (data) => {
    formId.value = data.id;
    formProduct.value = data.product;
    formAmount.value = data.amount;
    formDescription.value = data.description;
}

const setDeleteData = (id) => {
    console.log(id)
    const name = document.getElementById("product_"+id).textContent;
    const amount = document.getElementById("amount_"+id).textContent;
    const description = document.getElementById("description_" + id).textContent;

    btnDelete.setAttribute("value", id);

    deleteDataContainer.innerHTML = `
        <li>Nombre: ${name}</li>
        <li>Cantidad: ${amount}</li>
        <li>Dirección: ${description}</li>
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

const getFomrDataUpdate = () => {
    return {
        id: formId.value,
        name: formProduct.value,
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
            console.log(deleteId);
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

    tdName.innerHTML = suplier.name;
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

const getSelectedSupplierName = () => {
    const selectId = document.getElementById('select_suplier_id');
    const selectedOption = selectId.options[selectId.selectedIndex];
    return selectedOption.textContent;
};

const createRegister = (suplier) => {
    const selectedSupplierName = getSelectedSupplierName();
   
    tableBody.innerHTML += `
    <tr id="row_${suplier.id}">
        <td id="id_${suplier.id}"> ${selectedSupplierName} </td>
        <td id="product_${suplier.id}"> ${suplier.product} </td>
        <td id="amount_${suplier.id}"> ${suplier.amount}</td>
        <td id="description_${suplier.id}"> ${suplier.description}</td>
        ${crudButons(suplier)}
    </tr>`
    asignUpdateCallbacks();
    asignDeleteCallbacks();
}

const updateProduct = () => {
    const product = getFomrDataUpdate();
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
    if(validationProduct.textContent !== '' || validationAmount.textContent !== '' || validationDescription.textContent !== '' || validacionSelectedId.textContent !== ''){
        return;
    }else if(formProduct.value === '' || formAmount === '' || formDescription === '' || selectId.value === "" ){
        validationFull.textContent = 'Todos los campos son obligatorios'
        return;
    }

    if(update){
        updateProduct();
    } else {
        createProduct();
    }
})