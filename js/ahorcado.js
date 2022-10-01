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

    escogerPalabraSecreta();
})()