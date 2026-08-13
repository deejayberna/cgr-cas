document.addEventListener("DOMContentLoaded", () => {
    (function () {
        const chatBox = document.getElementById("chat-box");
        const chatContainer = document.getElementById("chat-container");
        const chatClose = document.getElementById("chat-close");

        function agregarMensaje(mensaje, clase) {
            const mensajeElemento = document.createElement("div");
            mensajeElemento.textContent = mensaje;
            mensajeElemento.classList.add(clase);
            chatBox.appendChild(mensajeElemento);
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
        }

        function limpiarChat() {
            while (chatBox.firstChild) {
                chatBox.removeChild(chatBox.firstChild);
            }
        }

        function bienvenida() {
            agregarMensaje("¡Bienvenido a nuestro despacho contable en línea!", "mensaje-bienvenida");
            setTimeout(obtenerNombre, 3000); // Wait for 3 seconds before asking for name
        }

        function obtenerNombre() {
            agregarMensaje("Hola, ¿cómo te llamas?", "mensaje");
            const nombreInput = document.createElement("input");
            nombreInput.type = "text";
            nombreInput.id = "nombreInput";
            chatBox.appendChild(nombreInput);
            nombreInput.focus(); // Focus on the input element

            nombreInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter" && nombreInput.value.trim() !== "") {
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
                { nombre: "Servicios Contables", url: "servicios-contables.html" },
                { nombre: "Servicios de Auditoría", url: "servicios-auditoria.html" },
                { nombre: "Contacto", url: "contacto.html" }
            ];

            secciones.forEach((seccion, index) => {
                const boton = document.createElement("button");
                boton.textContent = seccion.nombre;
                boton.onclick = () => window.location.href = seccion.url; // Navigate on click
                chatBox.appendChild(boton);

                if (index < secciones.length - 1) {
                    const separador = document.createElement("span");
                    separador.textContent = " | ";
                    chatBox.appendChild(separador);
                }
            });
        }

        bienvenida();

        // Drag and drop functionality for the chat window
        let isDragging = false;
        let offsetX, offsetY;

        function startDrag(e) {
            isDragging = true;
            offsetX = e.clientX - chatContainer.getBoundingClientRect().left;
            offsetY = e.clientY - chatContainer.getBoundingClientRect().top;
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", stopDrag);
        }

        function drag(e) {
            if (isDragging) {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                chatContainer.style.left = `${newX}px`;
                chatContainer.style.top = `${newY}px`;
            }
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", stopDrag);
        }

        chatContainer.addEventListener("mousedown", startDrag);
        chatClose.addEventListener("click", () => {
            chatContainer.style.display = "none";
        });
    })();
});
