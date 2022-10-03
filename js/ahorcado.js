(function() {
    let palabrasSecretas = ["HTML","CSS","KOTLIN","PYTHON","JAVA","COBOL","ASSEMBLY","SQL","PHP","LINUX","WINDOWS","ANDROID"];
    let palabraSecreta = "";
    let arrPalabraSecreta;
    let coordenadasX;
    let maxIntentos = 9;
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
        if(++intentos === maxIntentos) {
            dibujarMensaje("¡Fin del juego!", "40px", "rgb(243,71,35)", 0, 40);
        }
    }

    /**
     * Verifica si el usuario ganó.
     */
    function verificarGanador() {
        if(++aciertos === palabraSecreta.length) {
            dibujarMensaje("Ganaste, ¡Felicidades!", "40px", "rgb(15,211,54)", 0, 40);
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

    /**
     * Dibuja la horca.
     */
    function dibujarHorca() {
        const pizarra = document.getElementById("pizarra");
        const pincel = pizarra.getContext("2d");
        pincel.strokeStyle = "rgb(10,56,113)";
        pincel.lineWidth = 6;

        // Horca part1
        pincel.beginPath();
        const largoHorcaParte1 = 210;
        const xHorcaParte1 = pizarra.width/2 - largoHorcaParte1/2;
        const yHorcaParte1 = 290;
        pincel.moveTo(xHorcaParte1, yHorcaParte1);
        pincel.lineTo(xHorcaParte1 + largoHorcaParte1, yHorcaParte1);
        pincel.stroke();

        // Horca parte2
        pincel.beginPath();
        const alturaHorcaParte2 = 280; 
        const yHorcaParte2 = 290;
        const xHorcaParte2 = xHorcaParte1 + 40;
        pincel.moveTo(xHorcaParte2, yHorcaParte2);
        pincel.lineTo(xHorcaParte2, yHorcaParte2 - alturaHorcaParte2);
        pincel.stroke();

        // Horca parte3
        pincel.beginPath();
        const largoHorcaParte3 = 130;
        const yHorcaParte3 = yHorcaParte2 - alturaHorcaParte2;
        const xHorcaParte3 = xHorcaParte2;
        pincel.moveTo(xHorcaParte3, yHorcaParte3);
        pincel.lineTo(xHorcaParte3 + largoHorcaParte3, yHorcaParte3);
        pincel.stroke();

        // Horca parte4
        pincel.beginPath();
        const alturaHorcaParte4 = 60;
        const yHorcaParte4 = yHorcaParte3;
        const xHorcaParte4 = xHorcaParte3 + largoHorcaParte3;
        pincel.moveTo(xHorcaParte4, yHorcaParte4);
        pincel.lineTo(xHorcaParte4, yHorcaParte4 + alturaHorcaParte4);
        pincel.stroke();

        // Cabeza
        pincel.beginPath();
        const radio = 35;
        const xCabeza = xHorcaParte4;
        const yCabeza = yHorcaParte4 + alturaHorcaParte4 + radio;
        const anguloInicio = 0;
        const anguloFinal = 2 * Math.PI;
        pincel.arc(xCabeza, yCabeza, radio, anguloInicio, anguloFinal);
        pincel.stroke();

        // Tronco
        pincel.beginPath();
        const alturaTronco = 80;
        const yTronco = yCabeza + radio;
        const xTronco = xCabeza;
        pincel.moveTo(xTronco, yTronco);
        pincel.lineTo(xTronco, yTronco + alturaTronco);
        pincel.stroke();

        // Pierna izquierda
        // Pierna Derecha
        // Brazo izquierdo
        // Brazo derecho
    }

    escogerPalabraSecreta();
    dibujarGuiones();
    dibujarHorca();

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