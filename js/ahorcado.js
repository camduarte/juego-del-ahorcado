(function() {
    let palabrasSecretas = ["HTML","CSS","KOTLIN","PYTHON","JAVA","COBOL","ASSEMBLY","SQL","PHP","LINUX","WINDOWS","ANDROID"];
    let palabraSecreta = "";

    /**
     * Escoge la palabra secreta.
     */
    function escogerPalabraSecreta() {
        indiceAleatorio = Math.floor(Math.random() * palabrasSecretas.length);
        palabraSecreta = palabrasSecretas[indiceAleatorio];
    }

    /**
     * Dibuja los guiones de la palabra secreta.
     */
    function dibujarGuiones() {
        let pizarra = document.getElementById("pizarra");
        let pincel = pizarra.getContext("2d");
        pincel.strokeStyle = "rgb(10,56,113)";
        pincel.lineWidth = 4;
        pincel.beginPath();

        let y = 330;
        let linea = 50;
        const espacio = 10;

        // Para centrar los guiones.
        const mitadPizarra = pizarra.width/2;
        let arrPalabraSecreta = palabraSecreta.split("");
        let mitadPalabra = arrPalabraSecreta.length/2;
        let x = mitadPizarra - mitadPalabra * (linea + espacio);

        for (let indice = 0; indice < arrPalabraSecreta.length; indice++) {
            pincel.moveTo(x, y); // punto inicial de la línea.
            
            x = x + linea; // punto final de la línea.
            pincel.lineTo(x, y);
            
            x = x + espacio; // agrego espacio entre guiones.
        }
        pincel.stroke();
    }

    /**
     * Verifica si el caracter es una letra.
     * @return true si es una letra.
     */
    function esLetra(caracter) {
        const expReg = /[a-zA-Z]/;
        if(expReg.test(caracter)) {
            return true;
        } else {
            return false;
        }
    }

    escogerPalabraSecreta();
    dibujarGuiones();

    // Capturo las teclas presionadas por el usuario.
    document.addEventListener("keypress", function(evento) {
        let resultado = esLetra(evento.key);
    });
})();