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

const modalLabel = document.getElementById("updateModalLabel");


const selectSuplier =  document.getElementById('select_suplier_id');
const selectContainer =  document.getElementById('suplier_select_container');

const suplierId = window.location.pathname.split("/")[2];

function getSelectedText() {
    let selectedText = '';

    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        selectedText = document.selection.createRange().text;
    }

    return selectedText;
}

function validInput(input, regex, longitudMinima = 1, text, validation) {
    let selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (!regex.test(input)) {
        validation.textContent = `Ingrese solo ${text}`;
        validation.style.display = 'block';
    } else if (input.length < longitudMinima) {
        validation.textContent = `Mayor a ${longitudMinima}`;
        validation.style.display = 'block';
    } else {
        validation.textContent = '';
        validation.style.display = 'none';
    }
}

function validKeydown(event, regex, longitudMinima = 1, text, validation) {
    let selectedText = getSelectedText();
    let key = event.key;
    let input = event.target.value;
    if (selectedText.length > 0) {
        input = selectedText;
    }

    if (!regex.test(key) && key !== 'Backspace') {
        event.preventDefault();
        validation.textContent = `Ingrese solo ${text}`;
        validation.style.display = 'block';
    } else if (input.length < longitudMinima) {
        validation.textContent = `Mayor a ${longitudMinima}`;
        validation.style.display = 'block';
    } else {
        validation.textContent = '';
        validation.style.display = 'none';
    }
}

formProduct.addEventListener('input', function (event) {
    validInput(event.target.value, /[a-zA-Z]/, 3, 'letras', validationProduct);
});

formProduct.addEventListener('keydown', function (event) {
    validKeydown(event, /[a-zA-Z]/, 3, 'letras', validationProduct);
});


formAmount.addEventListener('input', function (event) {
    validInput(event.target.value, /^\d+$/, 1, 'números', validationAmount);
});

formAmount.addEventListener('keydown', function (event) {
    validKeydown(event, /^\d+$/, 1, 'números', validationAmount);
});

formDescription.addEventListener('input', function (event) {
    validInput(event.target.value, /.*/, 5, 'caracteres', validationDescription);
});

formDescription.addEventListener('keydown', function (event) {
    validKeydown(event, /.*/, 5, 'caracteres', validationDescription);
});

selectId.addEventListener('change', () => {
    if (selectId.value === "") {
        validacionSelectedId.textContent = 'Debe de seleccionar un proveedor';
    } else {
        validacionSelectedId.textContent = '';
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
    const name = document.getElementById("product_" + id).textContent;
    const amount = document.getElementById("amount_" + id).textContent;
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
            modalLabel.innerText = "Actualizar producto";
            selectContainer.style.display = 'none';
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

btnCreate.addEventListener('click', () => {
    selectContainer.style.display = 'flex';
    modalLabel.innerText = "Agregar producto";

    selectId.disabled = !!suplierId;
    
    selectId.value = suplierId ?? null;
    formProduct.value = null;
    formAmount.value = null;
    formDescription.value = null;
    update = false;
})

btnDelete.addEventListener("click", () => {
    const deleteId = btnDelete.getAttribute("value");
    fetch(`http://localhost:3000/products/delete/${deleteId}`, {
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

const updateRegister = (product) => {

    const tdName = document.getElementById("product_" + product.id);
    const tdAmount = document.getElementById("amount_" + product.id);
    const tdDescition = document.getElementById("description_" + product.id);
    const updateBTN = document.getElementById("updateBtn_" + product.id);
    updateBTN.setAttribute("value", JSON.stringify(product))

    tdName.innerHTML = product.name;
    tdAmount.innerHTML = product.amount;
    tdDescition.innerHTML = product.description;

    Swal.fire({
        title: "¡Exito!",
        text: "Se ha actualizado el producto con exito",
        icon: "success"
    })
}

const deleteRegister = (id) => {
    const trToDelete = document.getElementById(`row_${id}`);
    trToDelete.remove()

    Swal.fire({
        title: "¡Exito!",
        text: "Se ha eliminado el producto con exito",
        icon: "success"
    })
}

const crudButons = (product) => {
    return `<td>
    <a type="button" name="btn_show_update" data-bs-toggle="modal" data-bs-target="#updateModal" id="updateBtn_${product.id}" value='${JSON.stringify(product)}'>
        <img src="../img/pen.png" alt="Actualizar producto" style="width: 20px; height: auto;">
    </a>
</td>
<td>
    <a type="button" name="btn_show_delete" data-bs-toggle="modal" data-bs-target="#deleteModal" id="deleteBtn_${product.id}" value="${product.id}">
        <img src="../img/trash.png" alt="Eliminar producto" style="width: 20px; height: auto;">
    </a>
</td>`
}

const getSelectedSupplierName = () => {
    const selectId = document.getElementById('select_suplier_id');
    const selectedOption = selectId.options[selectId.selectedIndex];
    return selectedOption.textContent;
};

const createRegister = (product) => {
    const selectedSupplierName = getSelectedSupplierName();

    tableBody.innerHTML += `
    <tr id="row_${product.id}">
        <td id="id_${product.id}"> ${selectedSupplierName} </td>
        <td id="product_${product.id}"> ${product.name} </td>
        <td id="amount_${product.id}"> ${product.amount}</td>
        <td id="description_${product.id}"> ${product.description}</td>
        ${crudButons(product)}
    </tr>`

    asignUpdateCallbacks();
    asignDeleteCallbacks();

    Swal.fire({
        title: "¡Exito!",
        text: "Se ha creado el producto con exito",
        icon: "success"
    })
}

const updateProduct = () => {
    const product = getFomrDataUpdate();
    fetch(`http://localhost:3000/products/update/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        closeBtn.click();
        return res.json()
    }).then(res => {
        updateRegister(res.data);
    }).catch(err => {
        console.error(err);
    })
}

const createProduct = () => {
    const product = getFomrData();

    fetch("http://localhost:3000/products/create", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        closeBtn.click();
        return res.json()
    }).then(res => {
        createRegister(res.data);
    }).catch(err => {
        console.error(err);
    })
}

updateBtn.addEventListener("click", () => {
    if (validationProduct.textContent !== '' || validationAmount.textContent !== '' || validationDescription.textContent !== '' || validacionSelectedId.textContent !== '') {
        return;
    } else if (formProduct.value === '' || formAmount === '' || formDescription === '' || selectId.value === "") {
        validationFull.textContent = 'Todos los campos son obligatorios'
        return;
    }

    if (update) {
        updateProduct();
    } else {
        createProduct();
    }
})