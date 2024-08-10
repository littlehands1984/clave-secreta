function asignarTexto (elemento, texto) {

    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
function condicionesIniciales () {

    document.getElementById('textoUsuario').value = "";
    document.getElementById('mensajeSalida').value = "";

    ocultarBoton ();
    asignarTexto ('p','No se encontró ningún mensaje! Ingresa el mensaje que deseas encriptar o desencriptar.');
}
function encriptar () {
    
    let texto = document.getElementById('textoUsuario').value; 

    if (texto === "") {
        asignarTexto ('p','No se encontró ningún mensaje! Ingresa el mensaje que deseas encriptar o desencriptar.');
    } else {
        mostrarBoton ();
        formulario.reset();
        const reemplaza = {
            a: 'ai',
            e: 'enter',
            i: 'imes',
            o: 'ober',
            u: 'ufat'
        };

        textoEncriptado = texto.toLowerCase().replace(/[aeiou]/g, match => reemplaza[match]);
        document.getElementById("mensajeSalida").value = textoEncriptado;
        asignarTexto ('p','Mensaje encriptado exitosamente!');
    }
}
function desencriptar () {
    
    let texto = document.getElementById('textoUsuario').value;

    if (texto === "") {
        asignarTexto ('p','No se encontró ningún mensaje! Ingresa el mensaje que deseas encriptar o desencriptar.');
    } else {
        let texto = document.getElementById('textoUsuario').value;
        formulario.reset();
        const reemplaza = {
            ai: 'a',
            enter: 'e',
            imes: 'i',
            ober: 'o',
            ufat: 'u'
        };

        desencriptado = texto.replace(/ai|enter|imes|ober|ufat/g, match => reemplaza[match]);
        if (desencriptado === texto) {
            asignarTexto ('p','Mensaje encriptado no encontrado, por favor intenta con un nuevo mensaje.');
        } else {
            mostrarBoton ();
            document.getElementById('mensajeSalida').value = desencriptado;
            asignarTexto ('p','¡Sherlock, acaso eres tú! Mensaje desencriptado exitosamente.');
        }
    }
}
function ocultarBoton () {
    
    let botonLimpieza = document.getElementById('limpieza');
    let botonCopiar = document.getElementById('copiarMensaje');

    botonLimpieza.style.display = "none";
    botonCopiar.style.display = "none";
}
function mostrarBoton () {

    let botonLimpieza = document.getElementById('limpieza');
    let botonCopiar = document.getElementById('copiarMensaje');

    botonLimpieza.style.display = "block";
    botonCopiar.style.display = "block";
}

condicionesIniciales ();

// Declaración del evento que prohibe al usuario el uso de letras mayúsculas y/o minúsculas con acentos así como caracteres especiales.
document.addEventListener('DOMContentLoaded', () => {

    const elementoEntrada = document.getElementById('textoUsuario');

    elementoEntrada.addEventListener('keydown', (event) => {
        const key = event.key;
        const elementosPermitidos = /^[a-z\s]$/;
        const especiales = [8, 127, 'Enter'];

        // Verifica si la tecla presionada es una tecla permitida
        if (!(elementosPermitidos.test(key) || !especiales.includes(key))) {
            event.preventDefault();
            asignarTexto ('p','Se prohíbe el uso de mayúsculas-minúsculas con acentos y/o caracteres especiales.');
        }
    });

    elementoEntrada.addEventListener('input', (event) => {
        const elemento = event.target.value;
        const restringidos = elemento.replace(/[^a-z\s]/g, ''); // Remueve caracteres no permitidos
        
        if (restringidos !== elemento) {
            asignarTexto ('p','Se prohíbe el uso de mayúsculas-minúsculas con acentos y/o caracteres especiales.');
            event.target.value = restringidos;
        }
    });
});

// Declaración del evento copiar
document.addEventListener('DOMContentLoaded', () => {
    const copiarTexto = document.getElementById('copiarMensaje');
    const elementoSalida = document.getElementById('mensajeSalida');

    copiarTexto.addEventListener('click', () => {
        // Selecciona el contenido del input
        elementoSalida.select();
        elementoSalida.setSelectionRange(0, 99999); // Para dispositivos móviles

        // Intenta copiar al portapapeles
        if (elementoSalida.value === "") {
            asignarTexto ('p','No se detectó mensaje para copiar.');
        } else {
            try {
                navigator.clipboard.writeText(elementoSalida.value)
                    .then(() => {
                        asignarTexto ('p','Mensaje copiado...');
                    })
                    .catch(err => {
                        alert('Error al copiar al portapapeles: ' + err);
                    });
            } catch (err) {
                alert('Error en la API del portapapeles: ' + err);
            }
        }
    });
});