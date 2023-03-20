(() =>{
    const pizarra = document.querySelector(".pizarra");
    const pincel = pizarra.getContext("2d");

    const calcularAnchoCanvas = () => {
        if(window.innerWidth > 768 ) {
            pizarra.width = (window.innerWidth/100)*50;
            console.log("desktop");
        } else if (window.innerWidth <= 768 && window.innerWidth > 600) {
            pizarra.width = (window.innerWidth/100)*75;
            console.log("tablet");
        } else if (window.innerWidth <= 600 && window.innerWidth >= 0) {
            console.log("phone");
            pizarra.width = (window.innerWidth/100)*75;
        }        
    }

    calcularAnchoCanvas();

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

    const dibujarBase = () => {
        const x1 = initX - anchoPizarra/100*15;
        const x2 = initX;
        const x3 = initX + anchoPizarra/100*15;

        const y1 = initY;
        const y2 = initY - altoPizarra/100*15;
        const y3 = initY;

        pincel.lineWidth = 5;
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
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
        pincel.strokeStyle = negro;
        pincel.beginPath();
        pincel.moveTo(brazoIzqX1, brazoIzqY1);
        pincel.lineTo(brazoIzqX2, brazoIzqY2);
        pincel.stroke();
    }

    // Modifico el tamaño del canvas según la ventana.
    // window.addEventListener('resize', () => {
    //     console.log('resize');
    //     if(window.innerWidth > 768 ) {
    //         pizarra.width = (window.innerWidth/100)*50;
    //     } else if (window.innerWidth <= 768) {
    //         pizarra.width = (window.innerWidth/100)*75;
    //     } else if (window.innerWidth <= 600) {
    //         pizarra.width = (window.innerWidth/100)*75;
    //     }
    //     // si hay fallos del usuario se pude recrear el dibujo con la variable aciertos y errores (errores no esta creada.).
    // });

    dibujarBase();
    dibujarPoste();
    dibujarSoporte();
    dibujarBarra();
    dibujarCuerda();
    dibujarCabeza();
    dibujarTronco();
    dibujarPiernaDerecha();
    dibujarPiernaIzquierda();
    dibujarBrazoDerecho();
    dibujarBrazoIzquierdo();

})();