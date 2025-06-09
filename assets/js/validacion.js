document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-suscripcion");
  const saludo = document.getElementById("saludo");

  const campos = {
    nombre: {
      validador: valor => valor.length > 6 && valor.includes(" "),
      error: "Debe tener más de 6 letras y al menos un espacio.",
    },
    email: {
      validador: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
      error: "Email inválido.",
    },
    pass: {
      validador: valor => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(valor),
      error: "Debe tener al menos 8 caracteres, letras y números.",
    },
    repass: {
      validador: valor => valor === document.getElementById("pass").value,
      error: "Las contraseñas no coinciden.",
    },
    edad: {
      validador: valor => parseInt(valor) >= 18,
      error: "Debe ser mayor o igual a 18.",
    },
    telefono: {
      validador: valor => /^\d{7,}$/.test(valor),
      error: "Debe tener al menos 7 dígitos sin símbolos.",
    },
    direccion: {
      validador: valor => /^[A-Za-z0-9]+\s[A-Za-z0-9\s]{3,}$/.test(valor),
      error: "Debe tener al menos 5 caracteres y un espacio.",
    },
    ciudad: {
      validador: valor => valor.length >= 3,
      error: "Debe tener al menos 3 caracteres.",
    },
    cp: {
      validador: valor => /^\d{3,}$/.test(valor),
      error: "Debe contener solo números y al menos 3 dígitos.",
    },
    dni: {
      validador: valor => /^\d{7,8}$/.test(valor),
      error: "Debe ser un número de 7 u 8 dígitos.",
    },
  };

  // Cargar datos de LocalStorage si existen
  const datosGuardados = JSON.parse(localStorage.getItem("datosSuscripcion"));
  if (datosGuardados) {
    Object.keys(campos).forEach(id => {
      const input = document.getElementById(id);
      if (input && datosGuardados[id]) input.value = datosGuardados[id];
    });
  }

  Object.keys(campos).forEach(id => {
    const input = document.getElementById(id);
    const errorSpan = document.getElementById(`error-${id}`);

    input.addEventListener("blur", () => {
      if (!campos[id].validador(input.value)) {
        errorSpan.textContent = campos[id].error;
      }
    });

    input.addEventListener("focus", () => {
      errorSpan.textContent = "";
    });

    if (id === "nombre") {
      input.addEventListener("input", () => {
        saludo.textContent = "HOLA " + input.value;
      });
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let errores = [];

    Object.keys(campos).forEach(id => {
      const input = document.getElementById(id);
      const errorSpan = document.getElementById(`error-${id}`);
      if (!campos[id].validador(input.value)) {
        errores.push(`${id}: ${campos[id].error}`);
        errorSpan.textContent = campos[id].error;
      }
    });

    if (errores.length > 0) {
      mostrarModal("Errores en el formulario", errores.join("\n"));
    } else {
      // Recolectar datos
      const datos = {};
      Object.keys(campos).forEach(id => {
        datos[id] = document.getElementById(id).value;
      });

      // Crear la URL con query params
      const queryParams = new URLSearchParams(datos).toString();
      const url = `https://jsonplaceholder.typicode.com/posts?${queryParams}`;

      // Hacer fetch GET
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then(data => {
          // Aunque 'data' es la lista de 100 posts, mostramos los datos del formulario
          const mensaje = `¡Suscripción exitosa!\n\nDatos enviados:\n${Object.entries(datos).map(([k, v]) => `${k}: ${v}`).join("\n")}`;
          mostrarModal("¡Suscripción exitosa!", mensaje);

          // Guardar datos en LocalStorage
          localStorage.setItem("datosSuscripcion", JSON.stringify(datos));
        })
        .catch(err => {
          mostrarModal("Error en la suscripción", err.message);
        });

    }
  });

  // Modal
  function mostrarModal(titulo, mensaje) {
    const modal = document.getElementById("modal");
    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-mensaje").textContent = mensaje;
    modal.classList.add("visible");
  }

  document.getElementById("modal-cerrar").addEventListener("click", () => {
    document.getElementById("modal").classList.remove("visible");
  });
});
