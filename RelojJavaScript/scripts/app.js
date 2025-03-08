/* Ejercicio una función que permite mostrar el reloj
en el elemento HTML con id="reloj" al presionar el botón con id="mostrar" */
let tiempoActual = new Date();
let año = tiempoActual.getFullYear();
let mes = tiempoActual.getMonth();
let dia = tiempoActual.getDay();
let hora = tiempoActual.getHours();
let minuto = tiempoActual.getMinutes();
let segundo = tiempoActual.getSeconds();
let intervalId;
let visibilidad = false; 
function reloj() {
    tiempoActual = new Date();
    año = tiempoActual.getFullYear();
    mes = tiempoActual.getMonth();
    dia = tiempoActual.getDay();
    hora = tiempoActual.getHours();
    minuto = tiempoActual.getMinutes();
    segundo = tiempoActual.getSeconds();
    document.getElementById("reloj").textContent = `Fecha: ${String(dia).padStart(2,0)}/${String(mes).padStart(2,0)}/${String(año).padStart(2,0)} Hora: ${hora>12 ? String(hora-12).padStart(2,0) : String(hora).padStart(2,0)}:${String(minuto).padStart(2,0)}:${String(segundo).padStart(2,0)}`;
}
function mostrar(){
    if (visibilidad){
        document.getElementById("reloj").textContent = "";
        clearInterval(intervalId);
        document.getElementById("mostrar").textContent = "Mostrar reloj"
    }else{
        reloj();
        intervalId = setInterval(reloj, 1000);
        document.getElementById("mostrar").textContent = "Ocultar reloj"
    }
    visibilidad = !(visibilidad);
}
