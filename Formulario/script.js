document.getElementById("formularioOpinion").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var nombre = document.getElementById("nombre").value;
    var mensaje = document.getElementById("mensaje").value;
    
    if (nombre && mensaje) {
        var nuevaOpinion = document.createElement("div");
        nuevaOpinion.className = "opinion";
        nuevaOpinion.innerHTML = '<span class="nombre">' + nombre + ':</span><p>' + mensaje + '</p>';
        
        document.querySelector(".opiniones").appendChild(nuevaOpinion);
        
        // Limpiar el formulario después de enviar la opinión
        document.getElementById("nombre").value = "";
        document.getElementById("mensaje").value = "";
    } else {
        alert("Por favor, completa todos los campos del formulario.");
    }
});