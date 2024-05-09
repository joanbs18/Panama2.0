var urls = "http://localhost:8082/api/citas";
var dataA = {
  nombre: "Antonio",
  apellido: "Arroyo",
  telefono: "54981652",
  fecha: "12/12/2023",
  hora: "12:30",
  especialidad: "Cirujano",
  medico: "Juan",
};
/*
await fetch(url, {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-type": "application/json" },
  body: {
    nombre: "Antonio",
    apellido: "Arroyo",
    telefono: "54981652",
    fecha: "2023-10-02",
    hora: "12:30",
    especialidad: "Cirujano",
    medico: "Juan",
  },
})
  .then((resp) => resp.json())
  .then((datos) => console.log(datos))
  .catch((err) => console.log(err));
*/
/*
axios({
  method: "post",
  url: "http://localhost:8082/api/citas",
  data: dataA,
});
*/
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    if (e.key === "Escape") e.target.value = "";

    document.querySelectorAll(".nombrePaciente").forEach((fruta) => {
      fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? fruta.classList.remove("filtro")
        : fruta.classList.add("filtro");
      var item = document.getElementById("nombre");
      console.log(item.classList.contains("filtro"));
      console.log(fruta.textContent);
      if (!item.classList.contains("filtro")) {
        document.getElementById("item").style.display = "none";
      }
    });
  }
});
/*
try {
  axios({
    method: "get",
    url: "http://localhost:8082/api/citas",
  })
    .then((result) => {
      console.log(result.data.citasL);
      mostrarData(result.data.citasL);
    })
    .catch((err) => {});
} catch (error) {
  alert("Estamos teniendo problemas, visitanos más tarde");
  console.log(error);
}

const mostrarData = (data) => {
  console.log(data);
  let body = "";
  for (var i = 0; i < data.length; i++) {
    body += `<tr class='columna'><td id='nombre' class='nombrePaciente'>${
      data[i].nombre + " " + data[i].apellido
    }</td><td>${data[i].fecha}</td><td>${data[i].hora}</td> <td>${
      data[i].especialidad
    }</td></tr>`;
  }
  document.getElementById("paciente").innerHTML = body;
  //console.log(body)
};
*/
