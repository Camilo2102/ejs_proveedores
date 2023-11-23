const updateBtn = document.getElementById("btn_update");
const closeBtn = document.getElementById("close_btn");

const formName = document.getElementById("form-name");
const formPhone = document.getElementById("form-phone");
const formDirection = document.getElementById("form-direction");
const formId = document.getElementById("form-id");
const tableBody = document.getElementById("table_body");

const btnCreate = document.getElementById("btn_create")

let update = false;

const setUpdateData = (data) => {
    formId.value = data.id;
    formName.value = data.name;
    formPhone.value = data.phone;
    formDirection.value = data.direction;
}

const getData = () => {
    return {
        id: parseInt(formId.value),
        name: formName.value,
        phone: formPhone.value,
        direction: formDirection.value
    }
}

const asignUpdateCallbacks = () => {
    const updateBtns = document.getElementsByName("btn_show_update");

    updateBtns.forEach(btn => {
        console.log(btn);
        btn.addEventListener("click", () => {
            const value = JSON.parse(btn.getAttribute("value"));
            update = true;
            setUpdateData(value);
        })
    })
}

const start = () => {
    asignUpdateCallbacks();
}

start();


btnCreate.addEventListener('click', ()=>{
    formId.value = null;
    formName.value = null;
    formPhone.value = null;
    formDirection.value = null;
    update = false;
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

const crudButons = (suplier) => {
    return `<td>
    <a type="button" name="btn_show_update" data-bs-toggle="modal" data-bs-target="#updateModal" id="updateBtn_${suplier.id}" value='${JSON.stringify(suplier)}'>
        <img src="../img/pen.png" alt="Actualizar producto" style="width: 20px; height: auto;">
    </a>
</td>
<td>
    <a>
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
        <td id="name_${suplier.id}"> ${suplier.name} </td>
        <td id="phone_${suplier.id}"> ${suplier.phone} </td>
        <td id="direction_${suplier.id}"> ${suplier.direction}</td>
        ${productButon(suplier)}
        ${crudButons(suplier)}
    `

    asignUpdateCallbacks();
}

const updateSuplier = () => {
    const suplier = getData();

    fetch("http://localhost:3000/suplier/update",{
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
    const suplier = getData();

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
    console.log(update);
    if(update){
        updateSuplier();
    } else {
        createSuplier();
    }
})

