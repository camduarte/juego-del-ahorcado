(function() {
    let palabrasSecretas = ["HTML","CSS","KOTLIN","PYTHON","JAVA","COBOL","ASSEMBLY","SQL","PHP","LINUX","WINDOWS","ANDROID"];
    let palabraSecreta = "";
    let arrPalabraSecreta;
    let coordenadasX;
    let maxIntentos = 4;
    let intentos = 0;
    let aciertos = 0;

    /**
     * Escoge la palabra secreta.
     */
    function escogerPalabraSecreta() {
        indiceAleatorio = Math.floor(Math.random() * palabrasSecretas.length);
        palabraSecreta = palabrasSecretas[indiceAleatorio];
        console.log(palabraSecreta);
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

        let y = 362;
        let linea = 50;
        const espacio = 10;

        // Para centrar los guiones.
        const mitadPizarra = pizarra.width/2;
        arrPalabraSecreta = palabraSecreta.split("");
        let mitadPalabra = arrPalabraSecreta.length/2;
        let x = mitadPizarra - mitadPalabra * (linea + espacio);

        coordenadasX = new Array();
        coordenadasX.push(x); // guardo las coodernadas de cada guion.
        for (let indice = 0; indice < arrPalabraSecreta.length; indice++) {
            pincel.moveTo(x, y); // punto inicial de la línea.
            
            x = x + linea; // punto final de la línea.
            pincel.lineTo(x, y);
            
            x = x + espacio; // agrego espacio entre guiones.
            coordenadasX.push(x);
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

    /**
     * Dibuja una letra.
     * @param {La letra a ser dibujada.} letra 
     */
    function dibujarLetra(letra, tamano, x, y) {
        let pizarra = document.getElementById("pizarra");
        let pincel = pizarra.getContext("2d");
        pincel.fillStyle = "rgb(10,56,113)";
        pincel.font = tamano + " Inter, sans-serif";
        pincel.fillText(letra, x, y, 250);
    }

    /**
     * Verifica si el usuario alcanzó el máximo de intentos y finaliza el juego.
     */
    function finalizarJuego () {
        if(++intentos === maxIntentos) { // Verifico si el usuario perdió.
            alert("Perdiste!!!");
        }
    }

    /**
     * Verifica si el usuario ganó.
     */
    function verificarGanador() {
        if(++aciertos === palabraSecreta.length) { // Verifico si el usuario gana.
            dibujarMensaje("Ganaste, \n¡Felicidades!", "40px", "green", 0, 40);
        }
    }

    /**
     * Dibuja un mensaje en pantalla.
     * @param {*} mensaje El texto a dibujar.
     * @param {*} tamano El tamaño de la fuente.
     * @param {*} color El color del texto.
     * @param {*} x La coordena en el eje x.
     * @param {*} y La coordenada en el eje y.
     */
    function dibujarMensaje(mensaje, tamano, color, x, y) {
        const pizarra = document.getElementById("pizarra");
        const pincel = pizarra.getContext("2d");
        pincel.fillStyle = color;
        pincel.font = tamano + " Inter, sans-serif";
        pincel.fillText(mensaje, x, y);
    }

    escogerPalabraSecreta();
    dibujarGuiones();

    let xLetraIncorrecta = 100;
    let letrasIncorrectas = new Array();

    // Capturo las teclas presionadas por el usuario.
    document.addEventListener("keypress", function(evento) {
        let letra = evento.key;
        
        if(esLetra(letra)) {
            let mayusculaLetra = letra.toUpperCase(); 
            
            if(arrPalabraSecreta.includes(mayusculaLetra)) { // Verifico si está dentro de la palabra secreta.
                for (let indice = 0; indice < arrPalabraSecreta.length; indice++) {
                    if(mayusculaLetra === arrPalabraSecreta[indice]) {
                        //Dibujar letra correcta.
                        dibujarLetra(arrPalabraSecreta[indice], "60px", coordenadasX[indice], 357);
                        verificarGanador();
                    }
                }
            } else {
                //Dibujar letra incorrecta.
                if(!letrasIncorrectas.includes(mayusculaLetra)) { // Verifico que la letra incorrecta no este repetida.
                    dibujarLetra(mayusculaLetra, "28px", xLetraIncorrecta, 395);

                    xLetraIncorrecta = xLetraIncorrecta + 25; // Voy corriendo el eje x para que las letras se dibujen una al lado de la otra.
                    letrasIncorrectas.push(mayusculaLetra);

                    finalizarJuego();
                }
            }
        }
    });
})();