window.addEventListener("load", iniciarJuego)

const seccionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
const botonMascotaJugador = document.getElementById("boton_mascota");

const botonReiniciar = document.getElementById("reiniciar");

const seccionSeleccionarMascota = document.getElementById("seleccionar_mascota");

const spanMascotaJugador = document.getElementById("mascota_jugador");
const spanVidasJugador = document.getElementById("vidas_jugador");
const spanVidasEnemigo = document.getElementById("vidas_enemigo");

const spanMascotaEnemigo = document.getElementById("mascota_enemigo");
let ataqueAleatorio;
let ataquesEnemigo = document.getElementById("ataquesEnemigo");

let spanResultadoRonda = document.getElementById("resultadoRonda");
const spanResultadoJuego = document.getElementById("resultadoJuego");
let spanAtaquesEnemigo = '';
let rondas = 0;
let resultadoCombate;

let spanMensajeAtaqueJugador = document.getElementById("ataque_jugador");
let spaResultadoAtaqueRonda = document.getElementById("resultadoAtaque");
let spanMensajeAtaqueEnemigo = document.getElementById("ataque_enemigo");
let contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");
let mokepones = [];


let opcionMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];

let ataqueJugador = {
    nombre: '',
    simbolo: ''
};

let ataqueEnemigo = {
    nombre: '',
    simbolo: ''  
};

let vidasJugador = 3;
let vidasEnemigo = 3;
let mascotaSeleccionada = false;

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }  
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5);
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5);
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5);

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🌱', id: 'boton_tierra'}
);

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🔥', id: 'boton_fuego'}
);

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🌱', id: 'boton_tierra'}
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego(){   
    //Ocultar el bloque de ataques antes de seleccionar el mokepon
    seccionSeleccionarAtaque.style.display = "none";
    //Por cada mokepon construir una tarjeta con un input de selección
    mokepones.forEach((mokepon) =>{
        //comillas invertidas `` para templates literarios
        opcionMokepones = `
            <input  type="radio" name ="mascota" id=${mokepon.nombre} /> 
            <label class = "tarjeta-de-mokepon" for = ${mokepon.nombre} >
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
            `
        contenedorTarjetas.innerHTML += opcionMokepones;
        inputHipodoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya"); 
    } )
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador(){  

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
        mascotaSeleccionada = true;
    }
    else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
        mascotaSeleccionada = true;
    }
    else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
        mascotaSeleccionada = true;
    }
    else{
        alert("Selecciona a tu mascota");
    }

    if(mascotaSeleccionada){
        //Cuando se seleccione la mascota ocultar la sección y mostrar la sección de ataques
        seccionSeleccionarMascota.style.display = "none";
        seccionSeleccionarAtaque.style.display = "flex";
        extraerAtaques(mascotaJugador);
        seleccionarMascotaEnemigo();
        spanVidasJugador.innerHTML = vidasJugador;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } 
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques); 
}


function mostrarAtaques(ataques) {
    //Construir los botones de ataques en función de la mascota seleccionada
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id= ${ataque.id} class="boton_ataque BAtaque"> ${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })

    botonFuego = document.getElementById("boton_fuego");
    botonAgua = document.getElementById("boton_agua");
    botonTierra = document.getElementById("boton_tierra");
    botones = document.querySelectorAll(".BAtaque");

}

function seleccionarMascotaEnemigo() {

    //Genero un numero aleatorio y se lo asigno a la mascota aleatoria del enemigo
    let mascotaAleatoria = aleatorio(0, mokepones.length-1);
    //Extraigo los ataques de la mascota que se ha generado
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;

    //Extraigo los emojis de los ataques de la mascota del enemigo
    for (let i = 0; i < ataquesMokeponEnemigo.length; i++){
        spanAtaquesEnemigo += ataquesMokeponEnemigo[i].nombre + '';
    }

    //Imprimo el nombre de la mascota del enemigo
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    //Dibujo los ataques de la mascota del enemido al lado de su nombre
    ataquesEnemigo. innerHTML = spanAtaquesEnemigo;
    
    secuenciaAtaqe();
}

function secuenciaAtaqe() {
   //Escuchar el evento click en los botones de ataque, asignar ataque del jugador
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            
            if (e.target.innerText === '🔥') {
                ataqueJugador.nombre = 'FUEGO';
                ataqueJugador.simbolo = '🔥'
                console.log(ataqueJugador);
                boton.style.background = "#112f58";            
            }
            else if (e.target.innerText === "💧") {
                ataqueJugador.nombre = 'AGUA';
                ataqueJugador.simbolo = '💧'
                console.log(ataqueJugador);
                boton.style.background = "#112f58";    
            }
            else {
                ataqueJugador.nombre = 'TIERRA';
                ataqueJugador.simbolo = '🌱'
                console.log(ataqueJugador);
                boton.style.background = "#112f58";  
            }
            //Si se ha hecho click en un botón de ataque -> deshabilitarlo
            boton.disabled = true;
            //Generar un ataque aleatorio del enemigo
            ataqueAleatorioEnemigo();
        })  
    })
}


function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueAleatorioEnemigo(){

    //Genero un número aleatorio en los ataques del enemigo
    let ataqueAleatorioIndice = aleatorio(0, ataquesMokeponEnemigo.length-1);
    //Obtengo los datos del ataque del array de los ataques
    ataqueAleatorio = ataquesMokeponEnemigo[ataqueAleatorioIndice];
    //Quito el ataque del array -> solo se puede utilizar una vez
    ataquesMokeponEnemigo.splice(ataqueAleatorioIndice, 1);
    //Obtengo los datos del ataque
    if(ataqueAleatorio.nombre === '🔥'){
        ataqueEnemigo.nombre = 'FUEGO';
        ataqueEnemigo.simbolo = '🔥'
    }
    else if(ataqueAleatorio.nombre === '💧'){
        ataqueEnemigo.nombre = 'AGUA';
        ataqueEnemigo.simbolo = '💧'
    }else{
        ataqueEnemigo.nombre = 'TIERRA';
        ataqueEnemigo.simbolo = '🌱'
    }
    //Teniendo el ataque seleccionado del jugar y el ataque aleatorio de la mascota del enemigo -> COMPARAR
    combate();
}

function combate(){
    spanVidasJugador.innerHTML = vidasJugador;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    
    if(ataqueJugador.nombre == ataqueEnemigo.nombre) {
        resultadoCombate = "EMPATE";     
    }
    else if (ataqueJugador.nombre == "FUEGO" && ataqueEnemigo.nombre == "TIERRA") {
        resultadoCombate = "GANASTE";
        vidasEnemigo --;
        spanVidasEnemigo.innerHTML = vidasEnemigo; 
    }
    else if (ataqueJugador.nombre == "AGUA" && ataqueEnemigo.nombre == "FUEGO") {
        resultadoCombate = "GANASTE";
        vidasEnemigo --;
        spanVidasEnemigo.innerHTML = vidasEnemigo; 
    }
    else if (ataqueJugador.nombre == "TIERRA" && ataqueEnemigo.nombre == "AGUA") {
        resultadoCombate = "GANASTE";
        vidasEnemigo --;
        spanVidasEnemigo.innerHTML = vidasEnemigo;    
    }
    else{
        resultadoCombate = "PERDISTE";
        vidasJugador --;
        spanVidasJugador.innerHTML = vidasJugador; 
    }
    //Imprimos los ataques de las mascotas y el resultado de ronda
    mensajeAtaque();
    //Aumentamos el número de rondas 
    rondas++;
    //Si se han gastado todos los ataques
    if(rondas == 5){
        terminarJuego();
    }
    //Si todavía quedan ataques, comprobar si alguna mascota ha perdido todas sus vidas.
    else{
        revisarVidas();
    }
}

function terminarJuego(){

    //Anular el parrafo para imprimir el mensaje final de victoria/derrota/empate
    spanResultadoJuego.innerHTML = '';

    if(vidasJugador > vidasEnemigo){
        spanResultadoJuego.style.color= 'green';
        spanResultadoJuego.innerHTML = "FELICIDADES, HAS GANADO EL JUEGO!"
        quitarBotonesAtaque();
    }
    else if(vidasJugador < vidasEnemigo){
        spanResultadoJuego.style.color= '#ff3860';
        spanResultadoJuego.innerHTML = "LO SIENTO, HAS PERDIDO EL JUEGO..."
        quitarBotonesAtaque();
    }
    else{
        spanResultadoJuego.style.color= 'black';
        spanResultadoJuego.innerHTML = "EL JUEGO HA QUEDADO EN EMPATE."
        quitarBotonesAtaque();
    }
}


function revisarVidas(){
    
    let spanResultadoJuego = document.getElementById("resultadoJuego");

    if(vidasEnemigo == 0){
        spanResultadoJuego.style.color= 'green';
        spanResultadoJuego.innerHTML = "FELICIDADES, HAS GANADO EL JUEGO!"
        quitarBotonesAtaque();
    }
    else if(vidasJugador == 0){
        spanResultadoJuego.style.color= '#ff3860';
        spanResultadoJuego.innerHTML = "LO SIENTO, HAS PERDIDO EL JUEGO..."
        quitarBotonesAtaque();
    }
}


function mensajeAtaque(){
    //Genero párrafos para la tabla resumen de ataques
    let parrafoJugador = document.createElement("p");
    let parrafoEnemigo = document.createElement("p");   
    let parrafoResultado = document.createElement("p");

    //Añado color al mensaje de resultado
    if(resultadoCombate === 'GANASTE'){
        spanResultadoJuego.style.color= 'green';
    }
    else if(resultadoCombate === 'PERDISTE'){
        spanResultadoJuego.style.color= '#ff3860';
    }
    else{
        spanResultadoJuego.style.color= 'black';
    }

    //Este valor se tiene que anular y volver a generarse tras cada ataque, irá quitando los ataques utilizados del enemigo
    spanAtaquesEnemigo = '';

    for (let i = 0; i < ataquesMokeponEnemigo.length; i++){
        spanAtaquesEnemigo += ataquesMokeponEnemigo[i].nombre + '';
    }
    //Vuelvo a imprimir los ataques que quedan al enemigo
    ataquesEnemigo. innerHTML = spanAtaquesEnemigo;

    parrafoJugador.innerHTML = ataqueJugador.simbolo;
    parrafoEnemigo.innerHTML = ataqueAleatorio.nombre;
    parrafoResultado.innerHTML = resultadoCombate;
    spanMensajeAtaqueJugador.appendChild(parrafoJugador);
    spanMensajeAtaqueEnemigo.appendChild(parrafoEnemigo);
    spanResultadoJuego.innerHTML = resultadoCombate;
}


function quitarBotonesAtaque(){
    botones.forEach((boton) => {
        boton.disabled = true;
    })
}

function reiniciarJuego(){
    location.reload();
}

