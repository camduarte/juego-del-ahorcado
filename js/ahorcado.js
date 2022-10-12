(function() {
    const pizarra = document.getElementById("pizarra");
    const pincel = pizarra.getContext("2d");
    const colorAzul = "rgb(10,56,113)";
    const colorRojo = "rgb(243,71,35)";
    const colorVerde = "rgb(15,211,54)";
    const MSG_PERDISTE = "¡Fin del juego!";
    const MSG_GANASTE_1 = "Ganaste,";
    const MSG_GANASTE_2 = "¡Felicidades!";

    let palabrasSecretas = ["HTML","CSS","KOTLIN","PYTHON","JAVA","COBOL","ASSEMBLY","SQL","PHP","LINUX","WINDOWS","ANDROID"];
    let palabraSecreta = "";
    let arrPalabraSecreta;
    let coordenadasX;
    const maxIntentos = 9;
    let intentos = 0;
    let aciertos = 0;
    let juegoTerminado = false;
    let xLetraIncorrecta = 100;
    let letrasCorrectas = new Array();
    let letrasIncorrectas = new Array();

    // Coordenadas de la horca
    const largoHorcaParte1 = 210;
    const xHorcaParte1 = pizarra.width/2 - largoHorcaParte1/2;
    const yHorcaParte1 = 290;

    const alturaHorcaParte2 = 280; 
    const yHorcaParte2 = 290;
    const xHorcaParte2 = xHorcaParte1 + 40;
    
    const largoHorcaParte3 = 130;
    const yHorcaParte3 = yHorcaParte2 - alturaHorcaParte2;
    const xHorcaParte3 = xHorcaParte2;
    
    const alturaHorcaParte4 = 50;
    const yHorcaParte4 = yHorcaParte3;
    const xHorcaParte4 = xHorcaParte3 + largoHorcaParte3;
    
    const radio = 35;
    const xCabeza = xHorcaParte4;
    const yCabeza = yHorcaParte4 + alturaHorcaParte4 + radio;
    const anguloInicio = 0;
    const anguloFinal = 2 * Math.PI;
    
    const alturaTronco = 80;
    const yTronco = yCabeza + radio;
    const xTronco = xCabeza;
    
    const alturaPiernaIzquierda = 50;
    const yPiernaIzquierda = yTronco + alturaTronco;
    const xPiernaIzquierda = xTronco;
    const alturaPiernaDerecha = 50;
    const yPiernaDerecha = yTronco + alturaTronco;
    const xPiernaDerecha = xTronco;
    
    const largoBrazoDerecho = 50;
    const yBrazoDerecho = yTronco + 20;
    const xBrazoDerecho = xTronco;

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
        pincel.strokeStyle = colorAzul;
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
        return expReg.test(caracter);
    }

    /**
     * Dibuja una letra.
     * @param {La letra a ser dibujada.} letra 
     */
    function dibujarLetra(letra, tamano, x, y) {
        pincel.fillStyle = colorAzul;
        pincel.font = tamano + " Inter, sans-serif";
        pincel.fillText(letra, x, y, 250);
    }

    /**
     * Verifica si el usuario alcanzó el máximo de intentos y finaliza el juego.
     */
    function finalizarJuego () {
        if(++intentos === maxIntentos) {
            juegoTerminado = true;
            dibujarMensaje(MSG_PERDISTE, "30px", colorRojo, 390, 40);
        }
    }

    /**
     * Verifica si el usuario ganó.
     */
    function verificarGanador() {
        if(++aciertos === palabraSecreta.length) {
            juegoTerminado = true;
            dibujarMensaje(MSG_GANASTE_1, "30px", colorVerde, 420, 40);
            dibujarMensaje(MSG_GANASTE_2, "30px", colorVerde, 420, 80);
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
        pincel.fillStyle = color;
        pincel.font = tamano + " Inter, sans-serif";
        pincel.fillText(mensaje, x, y);
    }

    /**
     * Dibuja la base de la horca.
     */
    function dibujarBaseHorca() {
        pincel.strokeStyle = colorAzul;
        pincel.lineWidth = 6;

        pincel.beginPath();
        pincel.moveTo(xHorcaParte1, yHorcaParte1);
        pincel.lineTo(xHorcaParte1 + largoHorcaParte1, yHorcaParte1);
        pincel.stroke();
    }

    /**
     * Dibuja la horca.
     */
    function dibujarHorca(intento) {
        pincel.strokeStyle = colorAzul;
        pincel.lineWidth = 6;

        switch (intento) {
            case 1:
                // Horca parte2
                pincel.beginPath();
                pincel.moveTo(xHorcaParte2, yHorcaParte2);
                pincel.lineTo(xHorcaParte2, yHorcaParte2 - alturaHorcaParte2);
                pincel.stroke();
                break;
            case 2:
                // Horca parte3
                pincel.beginPath();
                pincel.moveTo(xHorcaParte3, yHorcaParte3);
                pincel.lineTo(xHorcaParte3 + largoHorcaParte3, yHorcaParte3);
                pincel.stroke();                
                break;
            case 3:
                // Horca parte4
                pincel.beginPath();
                pincel.moveTo(xHorcaParte4, yHorcaParte4);
                pincel.lineTo(xHorcaParte4, yHorcaParte4 + alturaHorcaParte4);
                pincel.stroke();    
                break;
            case 4:
                // Cabeza
                pincel.beginPath();
                pincel.arc(xCabeza, yCabeza, radio, anguloInicio, anguloFinal);
                pincel.stroke();
                break;
            case 5:
                // Tronco
                pincel.beginPath();
                pincel.moveTo(xTronco, yTronco);
                pincel.lineTo(xTronco, yTronco + alturaTronco);
                pincel.stroke();                
                break;
            case 6:
                // Pierna izquierda
                pincel.beginPath();
                pincel.moveTo(xPiernaIzquierda, yPiernaIzquierda);
                pincel.lineTo(xPiernaIzquierda - 30, yPiernaIzquierda + alturaPiernaIzquierda);
                pincel.stroke();                
                break;
            case 7:
                // Pierna Derecha
                pincel.beginPath();
                pincel.moveTo(xPiernaDerecha, yPiernaDerecha);
                pincel.lineTo(xPiernaDerecha + 30, yPiernaDerecha + alturaPiernaDerecha);
                pincel.stroke();        
                break;
            case 8:
                // Brazo izquierdo
                pincel.beginPath();
                const largoBrazoIzquierdo = 50;
                const yBrazoIzquierdo = yTronco + 20;
                const xBrazoIzquierdo = xTronco;
                pincel.moveTo(xBrazoIzquierdo, yBrazoIzquierdo);
                pincel.lineTo(xBrazoIzquierdo - 30, yBrazoIzquierdo + largoBrazoIzquierdo);
                pincel.stroke();
                break;
            case 9:
                // Brazo derecho
                pincel.beginPath();
                pincel.moveTo(xBrazoDerecho, yBrazoDerecho);
                pincel.lineTo(xBrazoDerecho + 30, yBrazoDerecho + largoBrazoDerecho);
                pincel.stroke();
                break;
            default:
                console.log("Este caso no debería ocurrir.");
                break;
        }

    }

    /**
     * Inicia el juego.
     */
    function iniciarJuego() {
        agregarPalabra();
        escogerPalabraSecreta();
        dibujarGuiones();
        dibujarBaseHorca();
    }

    /**
     * Reinicia el juego.
     */
    function reiniciarJuego() {
        pincel.clearRect(0, 0, pizarra.width, pizarra.height); // limpio la pizarra.
        juegoTerminado = false;
        intentos = 0;
        aciertos = 0;
        palabraSecreta = "";
        letrasCorrectas.length = 0; // elimino todos los elementos.
        letrasIncorrectas.length = 0; // elimino todos los elementos.
        xLetraIncorrecta = 100;
        iniciarJuego();
    }

    /**
     * Agrega una nueva palabra al juego.
     */
    function agregarPalabra() {
        let parametros = window.location.search; // obtengo los parámetros en la url.
        const urlParametros = new URLSearchParams(parametros);
        if(urlParametros.has("palabra")) {
            const palabra = urlParametros.get("palabra").toLocaleUpperCase();
            if(!palabrasSecretas.includes(palabra)) {
                palabrasSecretas.push(palabra);
            }
        }
    }

    iniciarJuego();

    // Capturo las teclas presionadas por el usuario.
    document.addEventListener("keypress", function(evento) {
        if(!juegoTerminado) {
            let letra = evento.key;

            if(esLetra(letra)) {
                let mayusculaLetra = letra.toUpperCase(); 
                
                if(arrPalabraSecreta.includes(mayusculaLetra)) { // Verifico si está dentro de la palabra secreta.
                    if (!letrasCorrectas.includes(mayusculaLetra)) { // Verifico si la letra correcta ya ha sido ingresada.
                        for (let indice = 0; indice < arrPalabraSecreta.length; indice++) {
                            if(mayusculaLetra === arrPalabraSecreta[indice]) {
                                //Dibujar letra correcta.
                                dibujarLetra(arrPalabraSecreta[indice], "60px", coordenadasX[indice], 357);
                                verificarGanador();
                                letrasCorrectas.push(mayusculaLetra);
                            }
                        }    
                    }
                } else {
                    //Dibujar letra incorrecta.
                    if(!letrasIncorrectas.includes(mayusculaLetra)) { // Verifico que la letra incorrecta no este repetida.
                        dibujarLetra(mayusculaLetra, "28px", xLetraIncorrecta, 395);
    
                        xLetraIncorrecta = xLetraIncorrecta + 25; // Voy corriendo el eje x para que las letras se dibujen una al lado de la otra.
                        letrasIncorrectas.push(mayusculaLetra);
    
                        finalizarJuego();
                        dibujarHorca(intentos);
                    }
                }
            }
        }
    });

    // Reiniciar juego
    const btnNuevoJuego = document.getElementById("btn-nuevo-juego");
    btnNuevoJuego.addEventListener("click", function() {
        reiniciarJuego();
    });
})();