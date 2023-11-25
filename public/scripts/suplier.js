const updateBtn = document.getElementById("btn_update");
const closeBtn = document.getElementById("close_btn");
const closeDeleteBtn = document.getElementById("close_delete_btn");

const formName = document.getElementById("form-name");
const formPhone = document.getElementById("form-phone");
const formDirection = document.getElementById("form-direction");

const validationName = document.getElementById("validation-name");
const validationPhone = document.getElementById("validation-phone");
const validationDirection = document.getElementById("validation-direction");
const validationFull = document.getElementById("validation-full")

const formId = document.getElementById("form-id");
const tableBody = document.getElementById("table_body");

const btnCreate = document.getElementById("btn_create")
const btnDelete = document.getElementById("btn_delete")
const deleteDataContainer = document.getElementById("delete_data");

let update = false;

function getSelectedText() {
    var selectedText = '';

    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        selectedText = document.selection.createRange().text;
    }

    return selectedText;
}


formName.addEventListener('input', function (event) {
    var input = this.value;
    var selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (!/[a-zA-Z]/.test(input)) {
        validationName.textContent = 'Ingrese solo letras.';
        validationName.style.display = 'block';
    } else if (input.length < 4) {
        validationName.textContent = 'Mayor a tres';
        validationName.style.display = 'block';
    } else {
        validationName.textContent = '';
        validationName.style.display = 'none';
    }
});

formName.addEventListener('keydown', function (event) {
    var key = event.key;
    var input = this.value;
    var selectedText = getSelectedText();

    if (selectedText.length > 0) {
        input = selectedText;
    }

    if (!/[a-zA-Z]/.test(key)) {
        event.preventDefault();
        validationName.textContent = 'Ingrese solo letras.';
        validationName.style.display = 'block';
    } else if (input.length < 4) {
        validationName.textContent = 'Mayor a tres';
        validationName.style.display = 'block';
    } else {
        validationName.textContent = '';
        validationName.style.display = 'none';
    }
});


formPhone.addEventListener('input', function (event) {
    var input = this.value;
    var selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (!/^\d+$/.test(input)) {
        validationPhone.textContent = 'Ingrese solo números.';
        validationPhone.style.display = 'block';
    } else if (input.length !== 10) {
        validationPhone.textContent = 'El número de celular tiene diez digitos';
        validationPhone.style.display = 'block';
    } else {
        validationPhone.textContent = '';
        validationPhone.style.display = 'none';
    }
});

formPhone.addEventListener('keydown', function (event) {
    var key = event.key;
    var input = this.value;
    var selectedText = getSelectedText();

    if (selectedText.length > 0) {
        input = selectedText;
    }

    if (key !== 'Backspace' && !/^\d+$/.test(key)) {
        event.preventDefault();
        validationPhone.textContent = 'Ingrese solo números.';
        validationPhone.style.display = 'block';
    } else if (input.length !== 10) {
        validationPhone.textContent = 'El número de celular tiene diez digitos';
        validationPhone.style.display = 'block';
    } else {
        validationPhone.textContent = '';
        validationPhone.style.display = 'none';
    }
});

formDirection.addEventListener('input', function (event) {
    var input = this.value;
    var selectedText = getSelectedText();
    if (selectedText.length > 0) {
        input = selectedText;
    }
    if (input.length < 5) {
        validationDirection.textContent = 'Mayor a cuatro';
        validationDirection.style.display = 'block';
    } else {
        validationDirection.textContent = '';
        validationDirection.style.display = 'none';
    }
});

formDirection.addEventListener('keydown', function (event) {
    var key = event.key;
    var input = this.value;
    var selectedText = getSelectedText();

    if (selectedText.length > 0) {
        input = selectedText;
    }

    if (input.length < 3) {
        validationDirection.textContent = 'Mayor a tres';
        validationDirection.style.display = 'block';
    } else {
        validationDirection.textContent = '';
        validationDirection.style.display = 'none';
    }
});

const setUpdateData = (data) => {
    formId.value = data.id;
    formName.value = data.name;
    formPhone.value = data.phone;
    formDirection.value = data.direction;
}

const setDeleteData = (id) => {
    console.log(id)
    const name = document.getElementById("name_"+id).textContent;
    console.log(name)
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
        name: formName.value,
        phone: formPhone.value,
        direction: formDirection.value
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
    const updateBtns = document.getElementsByName("btn_show_delete");

    updateBtns.forEach(btn => {
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
    console.log('name')
    console.log(formName.value);
    formId.value = null;
    formName.value = null;
    formPhone.value = null;
    formDirection.value = null;
    update = false;
})

btnDelete.addEventListener("click", () => {
    const deleteId = btnDelete.getAttribute("value");

    fetch(`http://localhost:3000/suplier/delete/${deleteId}`,{
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
    const tdName = document.getElementById("name_"+suplier.id);
    const tdPhone = document.getElementById("phone_"+suplier.id);
    const tdDirection = document.getElementById("direction_" + suplier.id);
    const updateBTN = document.getElementById("updateBtn_" + suplier.id);
    updateBTN.setAttribute("value", JSON.stringify(suplier))

    tdName.innerHTML = suplier.name;
    tdPhone.innerHTML = suplier.phone;
    tdDirection.innerHTML = suplier.direction;
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

const productButon = (suplier) => {
    return `<td>
    <a href="/suplierProducts/${suplier.name}">
        <img src="img/boxs.png" alt="Productos" style="width: 20px; height: auto;">
    </a></td>`
}

const createRegister = (suplier) => {
    tableBody.innerHTML += `
    <tr id="row_${suplier.id}">
        <td id="name_${suplier.id}"> ${suplier.name} </td>
        <td id="phone_${suplier.id}"> ${suplier.phone} </td>
        <td id="direction_${suplier.id}"> ${suplier.direction}</td>
        ${productButon(suplier)}
        ${crudButons(suplier)}
    
    </tr>    `

    asignUpdateCallbacks();
    asignDeleteCallbacks();
}

const updateSuplier = () => {
    const suplier = getFomrData();
    console.log(suplier)
    fetch(`http://localhost:3000/suplier/update/${suplier.id}`,{
        method: "PUT",
        body: JSON.stringify(suplier),
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

const createSuplier = () => {
    const suplier = getFomrData();

    fetch("http://localhost:3000/suplier/create",{
        method: "POST",
        body: JSON.stringify(suplier),
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
    if(validationName.textContent !== '' || validationPhone.textContent !== '' || validationDirection.textContent !== ''){
        return;
    }else if(formName.value === '' || formPhone.value === '' || formDirection.value === ''){
        validationFull.textContent = 'Todos los campos son obligatorios';
        return;
    }
    if(update){
        updateSuplier();
    } else {
        createSuplier();
    }
})

