document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatContainer = document.getElementById("chat-container");
    const chatClose = document.getElementById("chat-close");
    const chatToggle = document.getElementById("chat-toggle");

    if (!chatBox || !chatContainer) {
        return;
    }

    function agregarMensaje(mensaje, clase) {
        const mensajeElemento = document.createElement("div");
        mensajeElemento.textContent = mensaje;
        mensajeElemento.classList.add(clase);
        chatBox.appendChild(mensajeElemento);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function limpiarChat() {
        chatBox.innerHTML = "";
    }

    function obtenerNombre() {
        agregarMensaje("Hola, ¿cómo te llamas?", "mensaje");
        const nombreInput = document.createElement("input");
        nombreInput.type = "text";
        nombreInput.id = "nombreInput";
        nombreInput.placeholder = "Escribe tu nombre y presiona Enter";
        nombreInput.setAttribute("aria-label", "Tu nombre");
        chatBox.appendChild(nombreInput);
        nombreInput.focus();

        nombreInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && nombreInput.value.trim() !== "") {
                procesarNombre(nombreInput.value.trim());
            }
        });
    }

    function procesarNombre(nombre) {
        limpiarChat();
        agregarMensaje(`¡Hola, ${nombre}! Estamos aquí para apoyarte en lo que necesites.`, "mensaje");
        mostrarSecciones();
    }

    function mostrarSecciones() {
        const secciones = [
            { nombre: "Servicios Contables", url: "/servicios-contables" },
            { nombre: "Servicios de Auditoría", url: "/servicios-auditoria" },
            { nombre: "Contacto", url: "/contacto" },
        ];

        secciones.forEach((seccion) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.textContent = seccion.nombre;
            boton.addEventListener("click", () => {
                window.location.href = seccion.url;
            });
            chatBox.appendChild(boton);
        });
    }

    agregarMensaje("¡Bienvenido a nuestro despacho contable en línea!", "mensaje-bienvenida");
    setTimeout(obtenerNombre, 1500);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const chatHeader = document.getElementById("chat-header");

    function startDrag(event) {
        if (event.target === chatClose) {
            return;
        }
        isDragging = true;
        const rect = chatContainer.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        chatContainer.style.bottom = "auto";
        chatContainer.style.right = "auto";
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);
    }

    function drag(event) {
        if (!isDragging) {
            return;
        }
        chatContainer.style.left = `${event.clientX - offsetX}px`;
        chatContainer.style.top = `${event.clientY - offsetY}px`;
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);
    }

    if (chatHeader) {
        chatHeader.addEventListener("mousedown", startDrag);
    }

    if (chatClose && chatToggle) {
        chatClose.addEventListener("click", () => {
            chatContainer.style.display = "none";
            chatToggle.style.display = "block";
        });

        chatToggle.addEventListener("click", () => {
            chatContainer.style.display = "block";
            chatToggle.style.display = "none";
        });
    }
});
