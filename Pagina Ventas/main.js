const abrirModalLogin = document.querySelector("#login-abrir-modal");
const modalLogin = document.querySelector("#modal-login");
const cerrarModalLogin = document.querySelector("#login-cerrar-modal");


abrirModalLogin.addEventListener("click",()=>{
    modalLogin.showModal();
})

cerrarModalLogin.addEventListener("click",()=>{
    modalLogin.close();
})