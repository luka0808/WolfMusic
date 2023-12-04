const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const asunto = document.getElementById("asunto")
const mensaje = document.getElementById("msj")
const form = document.getElementById("form")
const parrafo = document.getElementById("warning")


form.addEventListener("submit", e=>{
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    parrafo.innerHTML = "";

    if(nombre.value.length < 4){
        alert("ERROR!!, debe ingresar un Nombre")
        // warnings += `El Nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        alert("ERROR!!, debe ingresar un Email")
        // warnings += `El Email no es valido <br>`
        entrar = true
    }

    if(asunto.value.length < 2){
        alert("ERROR!!, debe ingresar el Asunto")
        // warnings += `Debe ingresar el Asunto <br>`
        entrar = true
    }
    if(mensaje.value.length < 2){
        alert("ERROR!!, debe ingresar el Mensaje")
        // warnings += `Debe ingresar un Mensaje <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(mensaje),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            Swal.fire(
                'Enviado',
                'Gracias por tu Mensaje',
                'success'
            );
            cleanForm();
            /* redirectUrl(); */
        })
        .catch((err) => console.log(err));
        // parrafo.innerHTML = "Enviado"
    }

})

function cleanForm() {
    form.reset();
}

