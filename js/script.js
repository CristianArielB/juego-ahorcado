const palabra = document.getElementById('palabra');
const letrasEquivocadas = document.getElementById('letras-incorrectas');
const jugarBtn = document.getElementById('boton-jugar');
const btnPalabraNueva = document.getElementById('cerrar-mensaje');
const popup = document.getElementById('contenedor-popup');
const mensajeFinal = document.getElementById('mensaje-final');
const agregarPalabra = document.getElementById('guardar-palabra');
const nuevaPalabra = document.querySelector('.text-area');

const dibujo = document.querySelectorAll(".parte-dibujo");

const palabras = ['alura', 'html', 'javascript', 'css'];
const listaPalabras = JSON.parse(localStorage.getItem("palabrasActualizadas")) || palabras;

let palabraSorteada = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];

const letrasCorrectas = [];
const letrasIncorrectas = [];

//Mostrar palabra oculta
function mostrarPalabra() {
    palabra.innerHTML = `
    ${palabraSorteada
    .split('')
    .map(
        letra =>`
        <span class="letra">
        ${letrasCorrectas.includes(letra) ? letra : ''}
        </span>
        `
    )
    .join('')}
    `;
    
    const palabraInterna = palabra.innerText.replace(/\n/g, '');

    if(palabraInterna === palabraSorteada){
        mensajeFinal.innerText = '¡Felicidades, ganaste!';
        popup.style.display= 'flex';
    }
}

//Actualizar las letras incorrectas
function actualizarLetraIncorrecta(){
    //Mostrar letras
    letrasEquivocadas.innerHTML = `
    ${letrasIncorrectas.length > 0 ? '<p>Incorrectas</p>' : ''}
    ${letrasIncorrectas.map(letra => `<span>${letra}</span>`)}
    `;

    //Mostrar partes del dibujo
    dibujo.forEach((parte,index) => {
        const errores = letrasIncorrectas.length;

        if(index < errores) {
            parte.style.display = 'block'
        }
        else {
            parte.style.display = 'none';
        }
    });

    //Comprobar si perdí
    if(letrasIncorrectas.length === dibujo.length){
        mensajeFinal.innerText = 'Fin del juego';
        popup.style.display = 'flex';
    }
}

//Keydown letter press
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letra = e.key;

        if(palabraSorteada.includes(letra)){
            if(!letrasCorrectas.includes(letra)){
                letrasCorrectas.push(letra);

                mostrarPalabra();
            }
        } else{
            if(!letrasIncorrectas.includes(letra)){
                letrasIncorrectas.push(letra);

                actualizarLetraIncorrecta();
            }
        }
    }
});

//Reiniciar juego
jugarBtn.addEventListener('click', () => {
    //Vacía los arrays
    letrasCorrectas.splice(0);
    letrasIncorrectas.splice(0);

    palabraSorteada = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];

    mostrarPalabra();

    actualizarLetraIncorrecta();

    popup.style.display = 'none';
});

mostrarPalabra();

//Agregar palabra nueva
function agregarPalabraNueva ()
{
    let expresionReg = /^[a-zA-Z]+$/;

    if((nuevaPalabra.value.length <= 3)){
        alert("Deben ser más de 3 letras");
    }

    if(expresionReg.test(nuevaPalabra.value) && nuevaPalabra.value.length >= 3){
        guardadoLocal(nuevaPalabra.value);
        
        mensajeFinal.innerText = 'Palabra agregada con éxito';
        popup.style.display = 'flex';

        btnPalabraNueva.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

}

function guardadoLocal(texto){
    let palabrasActualizadas = palabras;
    palabrasActualizadas.push(texto);
    let guardarNueva = JSON.stringify(palabrasActualizadas);
    localStorage.setItem("palabrasActualizadas", guardarNueva);
}
