// formulario.js

// Seleccionamos el formulario y el mensaje
const form = document.getElementById('leadForm');
const msg = document.getElementById('formMsg');

// Escuchamos el evento submit
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Obtenemos los valores del formulario
  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    program: form.program.value,
    consentPrivacy: form.consentPrivacy.checked,
    consentContact: form.consentContact.checked
  };

  // Validación básica
  if (!data.name || !data.phone || !data.email || !data.program) {
    msg.textContent = 'Por favor, completa todos los campos obligatorios.';
    msg.style.color = 'red';
    return;
  }
  if (!data.consentPrivacy || !data.consentContact) {
    msg.textContent = 'Debes aceptar las condiciones para continuar.';
    msg.style.color = 'red';
    return;
  }

  try {
    // Enviamos los datos a Spring Boot
    const response = await fetch("http://localhost:8080/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const result = await response.text();

    // Mostrar mensaje de éxito
    msg.textContent = result;
    msg.style.color = 'green';
    form.reset(); // Limpiar formulario
  } catch (error) {
    // Mostrar mensaje de error
    msg.textContent = 'Error al enviar el formulario: ' + error.message;
    msg.style.color = 'red';
  }
});
