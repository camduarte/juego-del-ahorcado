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
        let pincel = document.getElementById("pizarra").getContext("2d");
        pincel.strokeStyle = "rgb(10,56,113)";
        pincel.lineWidth = 4;
        pincel.beginPath();

        let x = 50;
        let y = 250;
        let linea = 50;
        const espacio = 10;

        let arrPalabraSecreta = palabraSecreta.split("");
        for (let indice = 0; indice < arrPalabraSecreta.length; indice++) {
            pincel.moveTo(x, y); // punto inicial de la línea.
            
            x = x + linea; // punto final de la línea.
            pincel.lineTo(x, y);
            
            x = x + espacio; // agrego espacio entre guiones.
        }
        pincel.stroke();
    }

    escogerPalabraSecreta();
    dibujarGuiones();

})();