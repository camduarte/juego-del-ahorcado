(function() {
    let palabrasSecretas = ["HTML","CSS","JAVASCRIPT","PYTHON","CPLUSCPLUS","JAVA","COBOL","ASSEMBLY","SQL","PHP"];
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
        pincel.fillStyle = "#0A3871";
        
    }

    escogerPalabraSecreta();

})();