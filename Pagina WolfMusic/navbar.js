function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function closeSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// PARA CORREGIR!!!
//cuando se cierra el navbar, vuelve al inicio de la pagina, no se mantiene en la seccion que se eligio