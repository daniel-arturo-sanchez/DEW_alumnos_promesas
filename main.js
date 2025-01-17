const staticDOM = {
  table: document.querySelector('#myTable'),
  tableBody: document.querySelector('#tableBody'),
  formulario: document.querySelector('#myForm'),
  id: document.querySelector('#id'),
  nombre: document.querySelector('#nombre'),
  grupos: document.querySelector('#grupos'),
}

(function () {
  let grupos = groupsRead();
  grupos.forEach( grupo => createOptionElement(grupo.grupo));
})();

function createOptionElement(name){
  let newOptionElement = document.createElement('option');
  newOptionElement.value = name;
  newOptionElement.textContent = name;

  drawFormOptions(newOptionElement);
}

function drawFormOptions(element) {
  staticDOM.grupos.appendchild(element);
}

function drawTable() {
    let alumnos = crudRead();
    alumnos.forEach( (alumno) => {
      let newTableRow = document.createElement('tr');
      let dataTable = document.createElement('td');
      dataTable.setAttribute() 
    })
}



function groupsRead() {
  fetch("http://localhost:3000/grupos")
    .then(response => response.json())
    .then(miJSON => miJSON)
    .catch(error => console.error(error))
}

//CRUD-READ
function crudRead() {
  fetch("http://localhost:3000/alumnos")
    .then(response => response.json())
    .then(miJSON => miJSON)
    .catch(error => console.log(error))
}

function crudRead1() {
  fetch("http://localhost:3000/alumnos/1")
    .then(response => response.json())
    .then(miJSON => console.log(miJSON))
    .catch(error => console.log(error))
}

function crudCreate() {
  let datosCreate = {
    nombre: "Pedro",
    grupo: "B"
  }

  fetch("http://localhost:3000/alumnos", {
    method: "POST",
    body: JSON.stringify(datosCreate),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response)=> response.json())
    .catch((error)=> console.error("Error: ", error))
    .then((response) => console.log("Success: ", response));
}

function crudUpdate() {
  let datosUpdate = {
    nombre: "Juan Pedro",
  }

  fetch("http://localhost:3000/alumnos/1", {
    method: "PATCH",
    body: JSON.stringify(datosUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response)=> response.json())
    .catch((error)=> console.error("Error: ", error))
    .then((response) => console.log("Success: ", response));
}

function crudDelete() {

  fetch("http://localhost:3000/alumnos/2", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response)=> response.json())
    .catch((error)=> console.error("Error: ", error))
    .then((response) => console.log("Success: ", response));
}