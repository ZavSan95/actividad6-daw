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
        input.addEventListener("keydown", () => {
          saludo.textContent = "HOLA " + input.value;
        });
        input.addEventListener("focus", () => {
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
        alert("Errores:\n" + errores.join("\n"));
      } else {
        const datos = Object.keys(campos).map(id => {
          return `${id}: ${document.getElementById(id).value}`;
        }).join("\n");
        alert("Formulario enviado con éxito:\n" + datos);
      }
    });
  });
  