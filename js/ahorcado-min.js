(function(){const F=document.getElementById("pizarra");const M=F.getContext("2d");const N="rgb(29.8,30.6,29.0)";const n="rgb(243,71,35)";const E="rgb(15,211,54)";const s="¡Fin del juego!";const R="Ganaste,";const P="¡Felicidades!";let palabrasSecretas=["HTML","CSS","KOTLIN","PYTHON","JAVA","COBOL","ASSEMBLY","SQL","PHP","LINUX","WINDOWS","ANDROID"];let palabraSecreta="";let arrPalabraSecreta;let coordenadasX;const A=9;let intentos=0;let aciertos=0;let juegoTerminado=false;let xLetraIncorrecta=100;let letrasCorrectas=new Array();let letrasIncorrectas=new Array();const Z=210;const u=F.width/2-Z/2;const X=290;const w=280;const W=290;const t=u+40;const Y=130;const V=W-w;const r=t;const v=50;const U=V;const p=r+Y;const I=35;const b=p;const a=U+v+I;const c=0;const l=2*Math.PI;const d=80;const T=a+I;const S=b;const Q=50;const z=T+d;const D=S;const L=50;const o=T+d;const H=S;const h=50;const aa=T+20;const m=S;function C(){indiceAleatorio=Math.floor(Math.random()*palabrasSecretas.length);palabraSecreta=palabrasSecretas[indiceAleatorio]}function i(){M.strokeStyle=N;M.lineWidth=4;M.beginPath();let y=362;let linea=50;const ab=10;const ac=F.width/2;arrPalabraSecreta=palabraSecreta.split("");let mitadPalabra=arrPalabraSecreta.length/2;let x=ac-mitadPalabra*(linea+ab);coordenadasX=new Array();coordenadasX.push(x);for(let indice=0;indice<arrPalabraSecreta.length;indice++){M.moveTo(x,y);x=x+linea;M.lineTo(x,y);x=x+ab;coordenadasX.push(x)}M.stroke()}function J(ac){const ab=/[a-zA-Z]/;return ab.test(ac)}function q(ac,ad,ab,ae){M.fillStyle=N;M.font=ad+" Inter, sans-serif";M.fillText(ac,ab,ae,250)}function O(){if(++intentos===A){juegoTerminado=true;k(s,"30px",n,390,40)}}function G(){if(++aciertos===palabraSecreta.length){juegoTerminado=true;k(R,"30px",E,420,40);k(P,"30px",E,420,80)}}function k(ae,ad,ac,ab,af){M.fillStyle=ac;M.font=ad+" Inter, sans-serif";M.fillText(ae,ab,af)}function B(){M.strokeStyle=N;M.lineWidth=6;M.beginPath();M.moveTo(u,X);M.lineTo(u+Z,X);M.stroke()}function K(ae){M.strokeStyle=N;M.lineWidth=6;switch(ae){case 1:M.beginPath();M.moveTo(t,W);M.lineTo(t,W-w);M.stroke();break;case 2:M.beginPath();M.moveTo(r,V);M.lineTo(r+Y,V);M.stroke();break;case 3:M.beginPath();M.moveTo(p,U);M.lineTo(p,U+v);M.stroke();break;case 4:M.beginPath();M.arc(b,a,I,c,l);M.stroke();break;case 5:M.beginPath();M.moveTo(S,T);M.lineTo(S,T+d);M.stroke();break;case 6:M.beginPath();M.moveTo(D,z);M.lineTo(D-30,z+Q);M.stroke();break;case 7:M.beginPath();M.moveTo(H,o);M.lineTo(H+30,o+L);M.stroke();break;case 8:M.beginPath();const ac=50;const ab=T+20;const ad=S;M.moveTo(ad,ab);M.lineTo(ad-30,ab+ac);M.stroke();break;case 9:M.beginPath();M.moveTo(m,aa);M.lineTo(m+30,aa+h);M.stroke();break;default:console.log("Este caso no debería ocurrir.");break}}function j(){f();C();i();B()}function g(){M.clearRect(0,0,F.width,F.height);juegoTerminado=false;intentos=0;aciertos=0;palabraSecreta="";letrasCorrectas.length=0;letrasIncorrectas.length=0;xLetraIncorrecta=100;j()}function f(){let parametros=window.location.search;const ac=new URLSearchParams(parametros);if(ac.has("palabra")){const ab=ac.get("palabra").toLocaleUpperCase();if(!palabrasSecretas.includes(ab)){palabrasSecretas.push(ab)}}}j();document.addEventListener("keypress",function(ab){if(!juegoTerminado){let letra=ab.key;if(J(letra)){let mayusculaLetra=letra.toUpperCase();if(arrPalabraSecreta.includes(mayusculaLetra)){if(!letrasCorrectas.includes(mayusculaLetra)){for(let indice=0;indice<arrPalabraSecreta.length;indice++){if(mayusculaLetra===arrPalabraSecreta[indice]){q(arrPalabraSecreta[indice],"60px",coordenadasX[indice],357);G();letrasCorrectas.push(mayusculaLetra)}}}}else{if(!letrasIncorrectas.includes(mayusculaLetra)){q(mayusculaLetra,"28px",xLetraIncorrecta,395);xLetraIncorrecta=xLetraIncorrecta+25;letrasIncorrectas.push(mayusculaLetra);O();K(intentos)}}}}});const e=document.getElementById("btn-nuevo-juego");e.addEventListener("click",function(){g()})})();