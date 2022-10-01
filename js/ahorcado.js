(function() {
    let palabrasSecretas = ["HTML","CSS","JAVASCRIPT","PYTHON","CPLUSCPLUS","JAVA","COBOL","ASSEMBLY","SQL","PHP"];
    let palabraSecreta = "";

    function escogerPalabraSecreta() {
        indiceAleatorio = Math.floor(Math.random() * palabrasSecretas.length);
        palabraSecreta = palabrasSecretas[indiceAleatorio];
    }
})()