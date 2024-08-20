var dominio= "http://localhost:3307";


function mostrarEspecialidad(especialidad) {
  buscarMedicos(especialidad);
  var tipoEspecialidad = document.querySelector(
    ".especialidad-seleccionada .tipo"
  );
  var especialidadSeleccionada = document.querySelector(
    ".especialidad-seleccionada"
  );
  var closeButton = document.querySelector(".especialidad-seleccionada span");

  tipoEspecialidad.textContent = especialidad;

  if (especialidad) {
    especialidadSeleccionada.style.display = "flex"; // Mostrar el elemento si se selecciona una especialidad
  } else {
    especialidadSeleccionada.style.display = "none"; // Ocultar el elemento si no se selecciona ninguna especialidad
  }

  closeButton.addEventListener("click", function () {
    especialidadSeleccionada.style.display = "none"; // Ocultar el elemento cuando se hace clic en la X
    const medicosContainer = document.getElementById("medicos");

    // Limpiar contenido previo
    medicosContainer.innerHTML = "";
  });

  // Obtener todos los botones de especialidad
  var buttons = document.querySelectorAll(".buttons-especialidad .button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remover la clase 'button-selected' de todos los botones
      buttons.forEach(function (btn) {
        btn.classList.remove("button-selected");
      });
      // Agregar la clase 'button-selected' al botón actual
      button.classList.add("button-selected");
    });
  });
}
async function buscarMedicos(especialidad) {
  const url = `${dominio}/api/medico/${especialidad}`;
  try {
    const response = await fetch(url);
    const medicos = await response.json();

   console.log(medicos)

   if (medicos.message=="No se encontraron médicos para la especialidad proporcionada") {
      throw new Error("No se encontraron médicos para la especialidad proporcionada.");
    } else {
      mostrarMedicos(medicos.data);
    }
  } catch (error) {
    console.error("Error:", error);
    alert(error.message); // Opcional: Mostrar el mensaje de error al usuario
  }
}


var selectedMedico = null; // Variable global para almacenar la información del médico seleccionado
function mostrarMedicos(medicos) {
  arrayMedicos = medicos;

  if (medicos.length===0){
    return;
  }
  const medicosContainer = document.getElementById("medicos");

  // Limpiar contenido previo
  medicosContainer.innerHTML = "";

  // Recorrer el arreglo de médicos y crear una tarjeta para cada uno
  medicos.forEach((medico, index) => {
    // Crear la tarjeta del médico
    const card = document.createElement("div");
    card.classList.add("card");

    // Contenido de la tarjeta
    const cardImg = document.createElement("div");
    cardImg.classList.add("card__img");
    cardImg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect fill="#d6f7fa" width="540" height="450"></rect>
            <defs>
                <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                    <stop offset="0" stop-color="#ffffff"></stop>
                    <stop offset="1" stop-color="#047d87"></stop>
                </linearGradient>
                <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                    <g fill-opacity="0.5">
                        <polygon fill="#89adb7" points="90 150 0 300 180 300"></polygon>
                        <polygon points="90 150 180 0 0 0"></polygon>
                        <polygon fill="#6b8992" points="270 150 360 0 180 0"></polygon>
                    </g>
                </pattern>
            </defs>
            <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
            <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
        </svg>
    `;

    const cardAvatar = document.createElement("div");
    cardAvatar.classList.add("card__avatar");
    const avatarImg = document.createElement("img");
    avatarImg.src =
      "img/pngtree-portrait-of-a-young-beautiful-woman-doctor-isolated-on-white-png-image_14366792.png"; // Reemplaza con la URL correcta de la imagen del médico
    avatarImg.alt = "Avatar del médico"; // Ajusta el atributo alt según corresponda
    cardAvatar.appendChild(avatarImg);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card__title");
    cardTitle.textContent = medico.nombre_medico;

    const cardSubtitle = document.createElement("div");
    cardSubtitle.classList.add("card__subtitle");
    cardSubtitle.textContent = medico.nombre_especialidad;

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card__wrapper");
    const btn = document.createElement("button");
    btn.classList.add("card__btn");
    btn.textContent = "Elegir";
    btn.setAttribute("data-id", medico.id); // Guardar el ID del médico en el botón

    // Agregar evento al botón
    btn.addEventListener("click", function () {
      selectedMedico = this.getAttribute("data-id");
      console.log(selectedMedico);
    });

    // Agregar elementos a la tarjeta
    cardWrapper.appendChild(btn);
    card.appendChild(cardImg);
    card.appendChild(cardAvatar);
    card.appendChild(cardTitle);
    card.appendChild(cardSubtitle);
    card.appendChild(cardWrapper);

    // Agregar la tarjeta al contenedor de médicos
    medicosContainer.appendChild(card);
  });

  eventoCard_Medicos();
}

function eventoCard_Medicos() {
  let selectedButton = null;

  // Obtén todas las tarjetas
  const cards = document.querySelectorAll(".card");

  // Agrega un event listener a cada tarjeta
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // Restablece el botón previamente seleccionado, si existe
      if (selectedButton) {
        selectedButton.classList.remove("selected");
        selectedButton.textContent = "Elegir";
      }
      // Selecciona el botón de esta tarjeta
      selectedButton = card.querySelector(".card__btn");
      selectedButton.classList.add("selected");
      selectedButton.textContent = "Elegido";

      // Evitar que el evento haga bubbling hasta la tarjeta
      event.stopPropagation();
    });
  });
}

// CALENDARIO
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let isPastDate =
      new Date(currYear, currMonth, i) <
      new Date(new Date().setHours(0, 0, 0, 0))
        ? "past-date"
        : "";
    liTag += `<li class="${isToday} ${isPastDate}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  // Volver a agregar el evento para seleccionar días después de renderizar el calendario
  agregarEventosDias();
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

function agregarEventosDias() {
  const dias = document.querySelectorAll(".days li");
  dias.forEach((dia) => {
    dia.addEventListener("click", (e) => {
      if (e.target.classList.contains("past-date")) {
        return;
      }

      if (e.target.tagName === "LI" && !e.target.classList.contains("inactive")) {
        dias.forEach(d => d.classList.remove('selected'));
        e.target.classList.add('selected');
        
        const selectedDay = e.target.textContent;
        const selectedDate = new Date(currYear, currMonth, selectedDay);
        const formattedDate = selectedDate.toISOString().split("T")[0];
        console.log("Fecha seleccionada:", formattedDate);

        obtenerHorasDisponibles(selectedMedico, formattedDate);
      }
    });
  });
}
var fechaElegida=null;
daysTag.addEventListener("click", (e) => {
  if (e.target.classList.contains("past-date")) {
    alert("No puedes seleccionar una fecha pasada");
    return;
  }

  if (e.target.tagName === "LI" && !e.target.classList.contains("inactive")) {
    const selectedDay = e.target.textContent;
    const selectedDate = new Date(currYear, currMonth, selectedDay);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    console.log("Fecha seleccionada:", formattedDate);
    fechaElegida=formattedDate
    obtenerHorasDisponibles(selectedMedico, formattedDate);
  }
});

//FETCH CITAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS

async function obtenerHorasDisponibles(medicoEspecialidadId, fecha) {
  const url = `${dominio}/api/citas/horas-disponibles/${medicoEspecialidadId}/${fecha}`;
console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET', // Método GET explícito
      headers: {
        'Content-Type': 'application/json' // Puedes ajustar los headers si es necesario
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const horasDisponibles = await response.json();
    console.log("Horas disponibles:", horasDisponibles);
    
    let arrayMedicos = null;
    arrayMedicos = horasDisponibles.horasDisponibles;

    let body = "";
    for (let a = 0; a < arrayMedicos.length; a++) {
      console.log(a);
      body += `<p class="hora">${arrayMedicos[a]}</p>`;
    }
    console.log(body);
    document.getElementById("ordenhora").innerHTML = body;
    eventoHoras();
  } catch (error) {
    console.error("Error al obtener las horas disponibles:", error);
  }
}



var horaElegida=null;
function eventoHoras() {
  const horas = document.querySelectorAll('.hora');
  let horaSeleccionada = null;

  horas.forEach(hora => {
      hora.addEventListener('click', (e) => {
          // Remover la clase de hora seleccionada de todas las horas
          horas.forEach(h => h.classList.remove('hora-seleccionada'));

          // Añadir la clase de hora seleccionada a la hora clickeada
          horaSeleccionada = e.target;
          horaSeleccionada.classList.add('hora-seleccionada');

          // Obtener el valor de data-hora
          const horaSeleccionadaValor = horaSeleccionada.getAttribute('data-hora');
          horaElegida=horaSeleccionadaValor;
          console.log('Hora seleccionada:', horaSeleccionadaValor);
      });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  const nombreInput = document.getElementById('input-nombre');
  const apellidosInput = document.getElementById('input-apellidos');
  
  // Función para validar la entrada de solo letras y espacios en blanco
  const validarLetras = (event) => {
    const teclaPresionada = event.key;
    
    // Permitir letras, espacios en blanco y teclas especiales como Enter, Flechas, etc.
    if (!(teclaPresionada.match(/^[A-Za-z\s]*$/) || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End')) {
      event.preventDefault(); // Evitar que se inserte la tecla no válida en el campo de entrada
    }
  };
  
  // Validar entrada solo de letras y espacios en blanco para el campo de nombre
  nombreInput.addEventListener('keydown', validarLetras);
  
  // Validar entrada solo de letras y espacios en blanco para el campo de apellidos
  apellidosInput.addEventListener('keydown', validarLetras);
});


document.getElementById('button-submit').addEventListener('click', () => {
  const nombres = document.getElementById('input-nombre').value.trim();
  const apellidos = document.getElementById('input-apellidos').value.trim();
  const cedula = document.getElementById('input-cedula').value.trim();
  const telefono = document.getElementById('input-telefono').value.trim();
  const medicoEspecialidadId = 3; // Reemplaza con el ID correspondiente
  const fecha = '2024-07-29'; // Reemplaza con la fecha correspondiente
  const hora = '14:00' // Reemplaza con la hora correspondiente

  // Validaciones simples
  if (!nombres || !apellidos || !cedula || !telefono || !medicoEspecialidadId || !fecha || !hora) {
      alert('Todos los campos son obligatorios');
      return;
  }

  const cedulaRegex = /^[0-9]{9}$/;
  if (!cedulaRegex.test(cedula)) {
      alert('Formato de cédula inválido');
      return;
  }

  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha)) {
      alert('Formato de fecha inválido');
      return;
  }

  const horaRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
  if (!horaRegex.test(hora)) {
      alert('Formato de hora inválido');
      return;
  }

  const data = {
      nombres,
      apellidos,
      cedula,
      telefono,
      medicoEspecialidadId,
      fecha,
      hora
  };

  fetch(`${dominio}/api/citas`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      if (result.error) {
          alert('Error: ' + result.error);
      } else {
          alert('Cita creada exitosamente');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error al crear la cita');
  });
});
