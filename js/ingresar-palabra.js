(function(){
    const key = "palabrasGuardadas";
    const palabrasGuardadas = JSON.parse(sessionStorage.getItem(key)) || [];

    // Guardar nueva palabra
    const btnGuardarPalabra = document.getElementById("btn-guardar");
    btnGuardarPalabra.addEventListener("click", function() {
        const nuevaPalabra = document.getElementById("nueva-palabra").value.toUpperCase().replaceAll(" ", "");

        if(nuevaPalabra != "" && !palabrasGuardadas.includes(nuevaPalabra)) {
            palabrasGuardadas.push(nuevaPalabra);
            sessionStorage.setItem(key, JSON.stringify(palabrasGuardadas));
        }
    });
})();