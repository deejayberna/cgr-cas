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

    function crearBoton(texto, onClick) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = texto;
        boton.addEventListener("click", onClick);
        chatBox.appendChild(boton);
    }

    function mostrarServicios() {
        agregarMensaje("¿Qué servicio te interesa?", "mensaje");
        const servicios = [
            { nombre: "Contadores / Fiscal", url: "/contadores" },
            { nombre: "Auditoría", url: "/auditores" },
            { nombre: "Nómina / RRHH", url: "/rrhh" },
            { nombre: "Control interno", url: "/controlinterno" },
            { nombre: "Contacto", url: "/contacto" },
        ];
        servicios.forEach((s) => crearBoton(s.nombre, () => { window.location.href = s.url; }));
    }

    function mostrarContacto(nombre) {
        limpiarChat();
        agregarMensaje(`Gracias, ${nombre}. ¿Cómo prefieres continuar?`, "mensaje");
        crearBoton("Ir a contacto", () => { window.location.href = "/contacto"; });
        crearBoton("WhatsApp", () => {
            window.open("https://wa.me/525556157899?text=Hola%2C%20soy%20" + encodeURIComponent(nombre) + "%20y%20me%20interesa%20un%20servicio%20de%20CGR-CAS", "_blank");
        });
    }

    function obtenerNombre() {
        agregarMensaje("Para orientarte mejor, ¿cómo te llamas?", "mensaje");
        const nombreInput = document.createElement("input");
        nombreInput.type = "text";
        nombreInput.placeholder = "Tu nombre y Enter";
        nombreInput.setAttribute("aria-label", "Tu nombre");
        chatBox.appendChild(nombreInput);
        nombreInput.focus();
        nombreInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && nombreInput.value.trim()) {
                mostrarContacto(nombreInput.value.trim());
            }
        });
    }

    agregarMensaje("¡Hola! Soy el asistente de CGR-CAS.", "mensaje-bienvenida");
    setTimeout(mostrarServicios, 800);
    setTimeout(obtenerNombre, 2500);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const chatHeader = document.getElementById("chat-header");

    function startDrag(event) {
        if (event.target === chatClose) return;
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
        if (!isDragging) return;
        chatContainer.style.left = `${event.clientX - offsetX}px`;
        chatContainer.style.top = `${event.clientY - offsetY}px`;
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);
    }

    if (chatHeader) chatHeader.addEventListener("mousedown", startDrag);

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
