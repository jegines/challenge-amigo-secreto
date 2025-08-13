// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.Fucionalidades:
//Agregar nombres: Los usuarios escribirán el nombre de un amigo en un campo de texto y lo agregarán a una lista visible al hacer clic en "Adicionar".
// Obtener una referencia a la lista donde se mostrarán los amigos
let listaAmigos = document.getElementById('listaAmigos');
let amigos = []; // Este array guardará los nombres de los amigos
let amigosParaSortear = []; // Array que usaremos para los sorteos, se reinicia con la lista de amigos
//*Capturar el valor del campo de entrada: Utilizar document.getElementById o document.querySelector para obtener el texto ingresado por el usuario.

function agregarAmigo() {
    console.log('✅ La función agregarAmigo() se ha iniciado.');

    let inputAmigo = document.getElementById('amigo');
    let nombre = inputAmigo.value.trim();

    if (!validarNombre(nombre)) {
        console.log('La validación falló. La función agregarAmigo() ha terminado.');
        return; 
    }

    // ✅ Si la validación pasa, continuamos con la lógica de negocio
    amigos.push(nombre);
    
    // ➡️ ¡IMPORTANTE! Aquí se crea la copia inicial para el sorteo
    amigosParaSortear = amigos.slice();
    
    console.log(`➡️ Se ha agregado el nombre "${nombre}" al array de amigos.`);
    
    // 🔄 Llamar a la función de actualización
    actualizarListaAmigos();

    // ✅ Limpiar el campo de texto
    inputAmigo.value = '';
    console.log(`➡️ El campo de texto se ha limpiado. El array actual es:`, amigos);
    console.log(`➡️ Amigos para sortear:`, amigosParaSortear);
}

//Validar la entrada: Implementar una validación para asegurarse de que el campo no esté vacío. Si está vacío, mostrar un alert con un mensaje de error: "Por favor, inserte un nombre."
function validarNombre(nombre) {
    // ⛔️ VALIDACIÓN 1: No permitir nombres vacíos
    if (nombre === '') {
        console.log('⛔️ Error de validación: Nombre vacío.');
        alert('Por favor, escribe un nombre.');
        return false;
    }

    // ⛔️ VALIDACIÓN 2: No permitir nombres repetidos
    if (amigos.includes(nombre)) {
        console.log(`⛔️ Error de validación: El nombre "${nombre}" ya existe.`);
        alert('Este nombre ya ha sido agregado.');
        return false;
    }

    // ⛔️ VALIDACIÓN 3: Solo permitir letras, espacios y acentos
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
    if (!regex.test(nombre)) {
        console.log(`⛔️ Error de validación: El nombre "${nombre}" contiene caracteres no permitidos.`);
        alert('Por favor, usa solo letras y espacios. Los acentos son permitidos.');
        return false;
    }

    // ✅ Si todas las validaciones pasan, el nombre es válido
    return true;
}

//*Actualizar el array de amigos: Si el valor es válido, añadirlo al arreglo que almacena los nombre de amigos usando el método.push().
function actualizarListaAmigos() {
    console.log('🔄 La función actualizarListaAmigos() se ha iniciado.');
    
    // Obtener la referencia al cuerpo de la tabla
    const tablaCuerpo = document.querySelector('#amigos-table tbody');
    
    // 🧹 LIMPIAR el contenido de la tabla antes de agregar nuevos elementos
    tablaCuerpo.innerHTML = ''; 
    console.log('➡️ Se ha limpiado el cuerpo de la tabla en el HTML.');

    // 🔄 RECORRER el array de amigos y agregar una fila por cada nombre
    amigos.forEach(nombre => {
        const nuevaFila = document.createElement('tr');
        const nuevaCelda = document.createElement('td');
        
        nuevaCelda.textContent = nombre;
        nuevaFila.appendChild(nuevaCelda);
        tablaCuerpo.appendChild(nuevaFila);

        console.log(`➡️ Se ha agregado el nombre "${nombre}" a la tabla visible.`);
    });
    
    console.log('✅ La lista ha sido actualizada correctamente.');
}
//Limpiar el campo de entrada: Después de añadir el nombre, restablecer el campo de texto a una cadena vacía.
function limpiarCampo() {
    let inputAmigo = document.getElementById('amigo');
    inputAmigo.value = '';
    console.log('✅ El campo de texto ha sido limpiado.');
}

//Sorteo aleatorio: Al hacer clic en el botón "Sortear Amigo", se seleccionará aleatoriamente un nombre de la lista y se mostrará en la página.
function sortearAmigo() {
    console.log('✅ La función sortearAmigo() se ha iniciado.');

    // ⛔️ VALIDACIÓN 1: Se requieren al menos dos amigos
    if (amigos.length < 2) {
        alert('Para sortear, necesitas al menos 2 amigos en la lista.');
        return;
    }

    // ⛔️ VALIDACIÓN 2: Si ya no hay amigos para sortear, se acabó el juego
    if (amigosParaSortear.length === 0) {
        alert('¡El juego ha terminado! Ya no hay más amigos por sortear.');
        document.getElementById('btn-sortear').disabled = true;
        return;
    }

    // 🎲 LÓGICA DEL SORTEO
    const indiceAleatorio = Math.floor(Math.random() * amigosParaSortear.length);
    
    // 🎁 Obtener el nombre del amigo sorteado y eliminarlo del array temporal
    const amigoSorteado = amigosParaSortear.splice(indiceAleatorio, 1)[0];
    
    // 📝 MOSTRAR EL RESULTADO
    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = `¡El amigo secreto es: ${amigoSorteado}!`;

    // ✅ HABILITAR EL BOTÓN DE REINICIAR
    document.getElementById('btn-reiniciar').disabled = false;

    // ➡️  Actualizar la nueva tabla de amigos restantes
    actualizarTablaAmigosRestantes();

    console.log('➡️ Amigos restantes para sortear:', amigosParaSortear);
}

//Reiniciar el juego: Al hacer clic en el botón "Reiniciar", se limpiará la lista de amigos y el campo de texto, y se ocultará el resultado del sorteo.
function reiniciarJuego() {
    console.log('🔄 La función reiniciarJuego() se ha iniciado.');

    // 1. Limpiar el array de amigos y el array temporal de sorteo
    amigos = [];
    amigosParaSortear = [];
    console.log('➡️ Los arrays de amigos han sido vaciados.');

    // 2. Limpiar el campo de texto
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.value = '';
    console.log('➡️ El campo de texto se ha limpiado.');

    // 3. Limpiar la lista visible de amigos
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    console.log('➡️ La lista de amigos en la interfaz se ha vaciado.');

    // 4. Limpiar el resultado del sorteo
    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = '';
    console.log('➡️ El resultado del sorteo se ha limpiado.');

    // 5. Deshabilitar el botón de Reiniciar y habilitar el de sortear
    document.getElementById('btn-reiniciar').disabled = true;
    document.getElementById('btn-sortear').disabled = false;
    console.log('➡️ Los botones han sido actualizados.');

    // ➡️  Limpiar la tabla de amigos sorteados
    const tablaCuerpo = document.querySelector('#amigos-table tbody');
    tablaCuerpo.innerHTML = '';

    // ➡️  Limpiar la tabla de amigos restantes
    const tablaCuerpoRestantes = document.querySelector('#amigos-restantes-table tbody');
    tablaCuerpoRestantes.innerHTML = '';

    console.log('✅ El juego ha sido reiniciado correctamente.');
}

//Actualizar la tabla de amigos restantes: Después de cada sorteo, actualizar la lista visible para mostrar los amigos que aún no han sido sorteados.
function actualizarTablaAmigosRestantes() {
    console.log('🔄 La función actualizarTablaAmigosRestantes() se ha iniciado.');

    const tablaCuerpoRestantes = document.querySelector('#amigos-restantes-table tbody');
    tablaCuerpoRestantes.innerHTML = '';

    amigosParaSortear.forEach(nombre => {
        const nuevaFila = document.createElement('tr');
        const nuevaCelda = document.createElement('td');
        
        nuevaCelda.textContent = nombre;
        nuevaFila.appendChild(nuevaCelda);
        tablaCuerpoRestantes.appendChild(nuevaFila);
    });

    console.log('✅ La tabla de amigos restantes ha sido actualizada.');
}