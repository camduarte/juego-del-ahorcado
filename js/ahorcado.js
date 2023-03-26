(() =>{
    const pizarra = document.querySelector(".pizarra");
    const pincel = pizarra.getContext("2d");

    let anchoPizarra = pizarra.width;
    let altoPizarra = pizarra.height;

    console.log(`ancho<${anchoPizarra}>, alto<${altoPizarra}>`);

    const initX = anchoPizarra/100*25; // %25
    const initY = altoPizarra/100*75; // %75

    let posteX;
    let posteY;
    let cuerdaX3;
    let cuerdaY3;
    let cabezaX1;
    let cabezaY1;
    let cabezaRadio;
    let troncoX1;
    let troncoY1;
    let troncoX2;
    let troncoY2;

    const negro = "#000000";
    const colorMarron = "rgb(29.8,30.6,29.0)";
    const colorRojo = "rgb(243,71,35)";
    const colorVerde = "rgb(15,211,54)";
    const MSG_PERDISTE = "¡Fin del juego!";
    const MSG_GANASTE_1 = "Ganaste,";
    const MSG_GANASTE_2 = "¡Felicidades!";

    let palabrasSecretas = ["HTML","CSS","KOTLIN","PYTHON","JAVA","COBOL","ASSEMBLY","SQL","PHP","LINUX","WINDOWS","ANDROID"];
    let palabraSecreta = "";
    let arrPalabraSecreta;
    let coordenadasX;
    const maxIntentos = 7;
    let intentos = 0;
    let aciertos = 0;
    let juegoTerminado = false;
    let xLetraIncorrecta = 100;
    let letrasCorrectas = new Array();
    let letrasIncorrectas = new Array();

    const dibujarBaseParte1 = () => {
        const y = initY;
        const x1 = initX - anchoPizarra/100*10;
        const x2 = anchoPizarra - anchoPizarra/100*35;

        pincel.lineWidth = 5;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(x1, y);
        pincel.lineTo(x2, y);
        pincel.stroke();
    } 

    const dibujarBaseParte2 = () => {
        const x1 = initX - anchoPizarra/100*5;
        const x2 = initX;
        const x3 = initX + anchoPizarra/100*5;

        const y1 = initY;
        const y2 = initY - altoPizarra/100*5;
        const y3 = initY;

        pincel.lineWidth = 5;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(x1, y1);
        pincel.lineTo(x2, y2);
        pincel.lineTo(x3, y3);
        pincel.lineTo(x1, y1);
        pincel.fill();         
    }

    const dibujarPoste = () => {
        posteX = initX;
        posteY = (altoPizarra/100*10); // %25

        pincel.lineWidth = 5;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(initX, initY);
        pincel.lineTo(posteX, posteY);
        pincel.stroke();
    }

    const dibujarSoporte = () => {
        const soporteInitX = initX;
        const soporteInitY = posteY + altoPizarra/100*15;

        const soporteEndX = posteX + anchoPizarra/100*15;
        const soporteEndY = posteY;

        pincel.lineWidth = 5;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(soporteInitX, soporteInitY);
        pincel.lineTo(soporteEndX, soporteEndY);
        pincel.stroke();
    }

    const dibujarBarra = () => {
        const x1 = initX - 2; // -2 para ajustar la intersección.
        const y1 = altoPizarra/100*10;

        const x2 = x1 + anchoPizarra/100*35;
        const y2 = y1;

        pincel.lineWidth = 5;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(x1, y1);
        pincel.lineTo(x2, y2);
        pincel.stroke();
    }

    const dibujarCuerda = () => {
        const x1 = initX - 1;
        const y1 = altoPizarra/100*10;

        const x2 = x1 + anchoPizarra/100*35 -2; // -2 para ajustar la intersección.
        const y2 = y1;

        cuerdaX3 = x2;
        cuerdaY3 = altoPizarra/100*20;

        pincel.lineWidth = 3;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(x2, y2);
        pincel.lineTo(cuerdaX3, cuerdaY3);
        pincel.stroke();
    }

    const dibujarCabeza = () => {
        cabezaRadio = altoPizarra/100*8;
        cabezaX1 = cuerdaX3;
        cabezaY1 = cuerdaY3 + cabezaRadio;

        pincel.lineWidth = 2;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.arc(cabezaX1, cabezaY1, cabezaRadio, 0, 2* Math.PI, true);
        pincel.stroke();
    }

    const dibujarTronco = () => {
        troncoX1 = cabezaX1;
        troncoY1 = cabezaY1 + cabezaRadio;
        troncoX2 = troncoX1;
        troncoY2 = troncoY1 + altoPizarra/100*16;

        pincel.lineWidth = 2;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(troncoX1, troncoY1);
        pincel.lineTo(troncoX2, troncoY2);
        pincel.stroke();
    }

    const dibujarPiernaDerecha = () => {
        const piernaDerX1 = troncoX2;
        const piernaDerY1 = troncoY2;

        const piernaDerX2 = troncoX2 - anchoPizarra/100*8;
        const piernaDerY2 = troncoY2 + altoPizarra/100*10;

        pincel.lineWidth = 2;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(piernaDerX1, piernaDerY1);
        pincel.lineTo(piernaDerX2, piernaDerY2);
        pincel.stroke();
    }

    const dibujarPiernaIzquierda = () => {
        const piernaIzqX1 = troncoX2;
        const piernaIzqY1 = troncoY2;

        const piernaIzqX2 = troncoX2 + anchoPizarra/100*8;
        const piernaIzqY2 = troncoY2 + altoPizarra/100*10;

        pincel.lineWidth = 2;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(piernaIzqX1, piernaIzqY1);
        pincel.lineTo(piernaIzqX2, piernaIzqY2);
        pincel.stroke();
    }

    const dibujarBrazoDerecho = () => {
        const brazoDerX1 = troncoX1;
        const brazoDerY1 = troncoY1 + altoPizarra/100*3;

        const brazoDerX2 = troncoX1 - anchoPizarra/100*5;
        const brazoDerY2 = brazoDerY1 + altoPizarra/100*8;

        pincel.lineWidth = 2;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(brazoDerX1, brazoDerY1);
        pincel.lineTo(brazoDerX2, brazoDerY2);
        pincel.stroke();
    }

    const dibujarBrazoIzquierdo = () => {
        const brazoIzqX1 = troncoX1;
        const brazoIzqY1 = troncoY1 + altoPizarra/100*3;

        const brazoIzqX2 = troncoX1 + anchoPizarra/100*5;
        const brazoIzqY2 = brazoIzqY1 + altoPizarra/100*8;

        pincel.lineWidth = 2;
        pincel.fillStyle = negro;
        pincel.beginPath();
        pincel.moveTo(brazoIzqX1, brazoIzqY1);
        pincel.lineTo(brazoIzqX2, brazoIzqY2);
        pincel.stroke();
    }

    /**
     *  Agrega las palabras nuevas a la lista de palabras secretas.
     */
    function agregarPalabra() {
        const palabrasGuardadas = JSON.parse(sessionStorage.getItem("palabrasGuardadas")) || [];
        if(palabrasGuardadas.length != 0) {
            palabrasGuardadas.forEach(function(palabra) {
                if(!palabrasSecretas.includes(palabra)) {
                    palabrasSecretas.push(palabra);
                }
            });
        }
    }

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
        pincel.fillStyle = negro;
        pincel.lineWidth = 4;
        pincel.beginPath();

        // let y = 362;
        let y = altoPizarra / 100 * 90;
        let linea = 28;
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
        pincel.fillStyle = colorMarron;
        pincel.font = tamano + " Inter, sans-serif";
        pincel.fillText(letra, x, y, 250);
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
     * Inicia el juego.
     */
    function iniciarJuego() {
        agregarPalabra();
        escogerPalabraSecreta();
        dibujarGuiones();
        dibujarBaseParte1();
        dibujarBaseParte2();
        dibujarPoste();
        dibujarSoporte();
        dibujarBarra();
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
     * Verifica si el usuario alcanzó el máximo de intentos y finaliza el juego.
     */
    function finalizarJuego () {
        if(++intentos === maxIntentos) {
            juegoTerminado = true;
            dibujarMensaje(MSG_PERDISTE, "19px", colorRojo, anchoPizarra/100*60, 40);
        }
    }

    /**
     * Verifica si el usuario ganó.
     */
    function verificarGanador() {
        if(++aciertos === palabraSecreta.length) {
            juegoTerminado = true;
            dibujarMensaje(MSG_GANASTE_1, "19px", colorVerde, anchoPizarra/100*60, 40);
            dibujarMensaje(MSG_GANASTE_2, "19px", colorVerde, anchoPizarra/100*60, 80);
        }
    }

    /**
     * Dibuja la horca.
     */
    function dibujarHorca(intento) {
        switch (intento) {
            case 1:
                dibujarCuerda();
                break;
            case 2:
                dibujarCabeza();
                break;
            case 3:
                dibujarTronco();
                break;
            case 4:
                dibujarPiernaDerecha();
                break;
            case 5:
                dibujarPiernaIzquierda();
                break;
            case 6:
                dibujarBrazoDerecho();
                break;
            case 7:
                dibujarBrazoIzquierdo();
                break;
            default:
                console.log("Este caso no debería ocurrir.");
                break;
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
                                dibujarLetra(arrPalabraSecreta[indice], "40px", coordenadasX[indice], altoPizarra / 100 * 88);
                                verificarGanador();
                                letrasCorrectas.push(mayusculaLetra);
                            }
                        }    
                    }
                } else {
                    //Dibujar letra incorrecta.
                    if(!letrasIncorrectas.includes(mayusculaLetra)) { // Verifico que la letra incorrecta no este repetida.
                        dibujarLetra(mayusculaLetra, "28px", xLetraIncorrecta, altoPizarra / 100 * 97);
    
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