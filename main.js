const staticDOM = {
  table: document.querySelector("#myTable"),
  tableBody: document.querySelector("#tableBody"),
  formulario: document.querySelector("#myForm"),
  deleteFormulario: document.querySelector("#Form-delete"),
  id: document.querySelector("#id"),
  nombre: document.querySelector("#nombre"),
  grupos: document.querySelector("#grupos"),
  btnCreate: document.querySelector("#create"),
  btnUpdate: document.querySelector("#update"),
  btnDelete: document.querySelector("#delete"),
  idDelete: document.querySelector("#deleteId"),
  idBox: document.querySelector("#id-box"),
  nombreBox: document.querySelector("#nombre-box"),
  gruposBox: document.querySelector("#grupo-box"),
  deleteBox: document.querySelector("#delete-box"),
};

document.addEventListener("DOMContentLoaded", dibujarTabla);
document.addEventListener("DOMContentLoaded", async () => {
  let grupos = await fetch("http://localhost:3000/grupos")
    .then((response) => response.json())
    .catch((error) => console.log(error));
  grupos.forEach((grupo) => {
    let option = document.createElement("option");

    option.textContent = grupo.grupo;
    option.value = grupo.grupo;

    staticDOM.grupos.appendChild(option);
  });
});

staticDOM.btnCreate.addEventListener("click", createAlumno);
staticDOM.btnUpdate.addEventListener("click", createAlumno);
staticDOM.btnDelete.addEventListener("click", createAlumno);

staticDOM.formulario.addEventListener("submit", (e) => e.preventDefault());
staticDOM.deleteFormulario.addEventListener("submit", (e) =>
  e.preventDefault()
);

async function groupsRead() {
  await fetch("http://localhost:3000/grupos")
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

//CRUD-READ
function crudRead() {
  fetch("http://localhost:3000/alumnos")
    .then((response) => response.json())
    .then((miJSON) => miJSON)
    .catch((error) => console.log(error));
}

function crudRead1() {
  fetch("http://localhost:3000/alumnos/1")
    .then((response) => response.json())
    .then((miJSON) => console.log(miJSON))
    .catch((error) => console.log(error));
}

function crudCreate() {
  let datosCreate = {
    nombre: "Pedro",
    grupo: "B",
  };

  fetch("http://localhost:3000/alumnos", {
    method: "POST",
    body: JSON.stringify(datosCreate),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error: ", error))
    .then((response) => console.log("Success: ", response));
}

function crudUpdate() {
  let datosUpdate = {
    nombre: "Juan Pedro",
  };

  fetch("http://localhost:3000/alumnos/1", {
    method: "PATCH",
    body: JSON.stringify(datosUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error: ", error))
    .then((response) => console.log("Success: ", response));
}

function crudDelete() {
  fetch("http://localhost:3000/alumnos/2", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error: ", error))
    .then((response) => console.log("Success: ", response));
}

//Validation Functions
//Create-Update
function IsValidTextField(inputText) {
  return inputText.validationMessage === "";
}

async function dibujarTabla() {
  let alumnos = await fetch("http://localhost:3000/alumnos")
    .then((response) => response.json())
    .catch((error) => console.log(error));

  alumnos.forEach((alumno) => {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.textContent = alumno.id;
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = alumno.nombre;
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = alumno.grupo;
    tr.appendChild(td);

    staticDOM.tableBody.appendChild(tr);
  });
}

async function createAlumno() {
  if (IsValidFormToCreate()) {
    let datosCreate = {
      nombre: staticDOM.nombre.value,
      grupo: staticDOM.grupos.value,
    };

    await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      body: JSON.stringify(datosCreate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error: ", error));

    for (let i = staticDOM.tableBody.childElementCount - 1; i > -1; i--) {
      staticDOM.tableBody.removeChild(staticDOM.tableBody.children[i]);
    }
    dibujarTabla();
  }
}

function IsValidFormToCreate() {
  return validateGrupo() & validateIdCreate() & validateNombre();
}

function validateIdCreate() {
  let result = false;
  if (staticDOM.id.value !== "") {
    if (staticDOM.idBox.childElementCount == 2) {
      let spanId = document.createElement("span");
      spanId.textContent = "Este campo debe estar vacío";
      staticDOM.idBox.appendChild(spanId);
    } else {
      staticDOM.idBox.children[2].textContent = "Este campo debe estar vacío";
    }
  } else {
    for (let i = staticDOM.idBox.childElementCount - 1; i >= 2; i--) {
      staticDOM.idBox.removeChild(staticDOM.idBox.children[i]);
    }
    result = true;
  }
  return result;
}

function validateNombre() {
  let result = false;
  if (!IsValidTextField(staticDOM.nombre)) {
    if (staticDOM.nombreBox.childElementCount == 2) {
      let spanNombre = document.createElement("span");
      spanNombre.textContent = staticDOM.nombre.validationMessage;
      staticDOM.nombreBox.appendChild(spanNombre);
    } else {
      staticDOM.nombreBox.children[2].textContent =
        staticDOM.nombre.validationMessage;
    }
  } else {
    for (let i = staticDOM.nombreBox.childElementCount - 1; i >= 2; i--) {
      staticDOM.nombreBox.removeChild(staticDOM.nombreBox.children[i]);
    }
    result = true;
  }
  return result;
}

function validateGrupo() {
  let result = false;

  if (!IsValidTextField(staticDOM.grupos)) {
    if (staticDOM.gruposBox.childElementCount == 2) {
      let spanGrupos = document.createElement("span");
      spanGrupos.textContent = staticDOM.grupos.validationMessage;
      staticDOM.gruposBox.appendChild(spanGrupos);
    } else {
      staticDOM.gruposBox.children[2].textContent =
        staticDOM.grupos.validationMessage;
    }
  } else {
    for (let i = staticDOM.gruposBox.childElementCount - 1; i >= 2; i--) {
      staticDOM.gruposBox.removeChild(staticDOM.gruposBox.children[i]);
    }
    result = true;
  }
  return result;
}
