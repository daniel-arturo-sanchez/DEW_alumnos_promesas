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

staticDOM.btnCreate.addEventListener("click", (e) => {
  e.preventDefault()
  createAlumno()});
staticDOM.btnUpdate.addEventListener("click", (e) => {
  e.preventDefault()
  updateAlumno()});
staticDOM.btnDelete.addEventListener("click", (e) => {
  e.preventDefault()
  deleteAlumno()});

staticDOM.formulario.addEventListener("submit", (e) => e.preventDefault());
staticDOM.deleteFormulario.addEventListener("submit", (e) =>  e.preventDefault());

async function groupsRead() {
  await fetch("http://localhost:3000/grupos")
    .then((response) => response.json())
    .catch((error) => console.error(error));
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
      .catch((error) => {
        
        console.error("Error: ", error)});

    for (let i = staticDOM.tableBody.childElementCount - 1; i > -1; i--) {
      staticDOM.tableBody.removeChild(staticDOM.tableBody.children[i]);
    }
    dibujarTabla();
  }
}

async function updateAlumno() {
  if (IsValidFormToUpdate()) {
    let datosUpdate = {
      nombre: staticDOM.nombre.value,
    };

    let id = staticDOM.id.value;
    let respuesta;

    await fetch(`http://localhost:3000/alumnos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(datosUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        respuesta = response;
        console.error("Error: ", error)})
      .then((response) => {
        respuesta = response;
        console.log("Success: ", response)
      });
      for (let i = staticDOM.tableBody.childElementCount - 1; i > -1; i--) {
        staticDOM.tableBody.removeChild(staticDOM.tableBody.children[i]);
      }
      dibujarTabla();
  }

}

async function deleteAlumno() {
  let id = staticDOM.idDelete.value;
  let box = staticDOM.deleteBox;
  let respuesta;
  if (IsValidFormToDelete()) {
    await fetch(`http://localhost:3000/alumnos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if(response.ok) {
          console.log("Success: ", response.statusText)
          for (let i = staticDOM.tableBody.childElementCount - 1; i > -1; i--) {
            staticDOM.tableBody.removeChild(staticDOM.tableBody.children[i]);
          }
        } else {
          console.error("Error: ", response.statusText)
          if (box.childElementCount == 2) {
              let spanDelete = document.createElement("span");
              spanDelete.textContent = response.statusText;
              box.appendChild(spanDelete);
            } else {
              box.children[2].textContent = response.statusText;
            }   
            // for (let i = staticDOM.deleteBox.childElementCount - 1; i >= 2; i--) {
            //   staticDOM.deleteBox.removeChild(staticDOM.deleteBox.children[i]);
            // }
        }
      })
      .catch((error) => {
        console.error("Error: ", error)
        alert(error);        
      });
    dibujarTabla();
  }
}

function IsValidFormToCreate() {
  return validateGrupo() & validateIdCreate() & validateNombre();
}

function IsValidFormToUpdate() {
  return validateGrupo() & validateIdEdit() & validateNombre();
}

function IsValidFormToDelete() {
  let result = false;
  if (!IsValidTextField(staticDOM.idDelete)) {
    if (staticDOM.deleteBox.childElementCount == 2) {
      let spanDelete = document.createElement("span");
      spanDelete.textContent = staticDOM.idDelete.validationMessage;
      staticDOM.deleteBox.appendChild(spanDelete);
    } else {
      staticDOM.deleteBox.children[2].textContent =
        staticDOM.idDelete.validationMessage;
    }
  } else if (staticDOM.idDelete.value === "") {
    if (staticDOM.deleteBox.childElementCount == 2) {
      let spanDelete = document.createElement("span");
      spanDelete.textContent = "Este campo no puede estar vacío";
      staticDOM.deleteBox.appendChild(spanDelete);
    } else {
      staticDOM.deleteBox.children[2].textContent =
        "Este campo no puede estar vacío";
    }
  } else {
    for (let i = staticDOM.deleteBox.childElementCount - 1; i >= 2; i--) {
      staticDOM.deleteBox.removeChild(staticDOM.deleteBox.children[i]);
    }
    result = true;
  }
  return result;
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

function validateIdEdit() {
  let result = false;
  if (!IsValidTextField(staticDOM.id)) {
    if (staticDOM.idBox.childElementCount == 2) {
      let spanId = document.createElement("span");
      spanId.textContent = staticDOM.id.validationMessage;
      staticDOM.idBox.appendChild(spanId);
    } else {
      staticDOM.idBox.children[2].textContent = staticDOM.id.validationMessage;
    }
  } else if (staticDOM.id.value === "") {
    if (staticDOM.idBox.childElementCount == 2) {
      let spanId = document.createElement("span");
      spanId.textContent = "Este campo no puede estar vacío";
      staticDOM.idBox.appendChild(spanId);
    } else {
      staticDOM.idBox.children[2].textContent =
        "Este campo no puede estar vacío";
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
