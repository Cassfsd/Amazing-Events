console.log(dataAmazing)


const fechaBase = dataAmazing.fechaActual
const eventos=dataAmazing.eventos
const eventosPasados=[] //Dejo vacio porque cuando recorra le tengo que hacer un push y si no es un array no puedo hacerle un push.
const eventosFuturos=[]





console.log(fechaBase);
console.log(eventos);

for (var i=0; i<eventos.length; i++){//siempre que trabajemos con arrays se debe usar el .lenght, es un dato que te va a garantizar que no te vas a pasar, aunque se agregen o eliminen datos. 
if(eventos[i].date > fechaBase){  //eventos[i] quiere decir el evento en el indice que está recorriendo. 
    eventosFuturos.push(eventos[i])
} else{ //Si la fecha del evento que está recorriendo, es mayor que la fecha base, le va a hacer un push a eventos futuros del evento que está capturando...
    eventosPasados.push(eventos[i])
}//...sino, lo va a mandar a eventos pasados. 

}
console.log(eventosFuturos);
console.log(eventosPasados);
//Clase Funciones y DOM min:20

//VISTA DINAMICA DE LAS PAGINAS HOME, UPCOMING Y PAST EVENTS
var buttonNav= document.getElementsByClassName("navevents")
console.log(buttonNav) //Aca me trae la coleccion, puedo ver en consola propiedades de la variable, como ID por ejemplo.
 // linea 29.captura los elementos con la clase navevents. Quedan todos los botones guardados dentro de la variable buttonNav

for (var i=0; i < buttonNav.length; i++ ){
    console.log(i) //Aca verifico si lo reccorre
    const element= buttonNav[i];
    //A medida que los vaya recorriendo, va a ir guardando el elemento que está recorriendo
    element.addEventListener("click", function(e){
        // console.log(e.target.id);
        imprimir(e.target.id)
        //Acá no hará nada en si, solo mostrar una consulta de consola
    }) 
}//Para el caso de contact y stats, donde para este proyecto si lo estamos trabajando con una pagina nueva, no hace falta que le agreguemos class a esos botones de una pagina nueva,  porque cuando le demos click nos va a refrescar. 

//CAPTURAR EL EVENTO DEL ID DONDE ESTAMOS HACIENDO CLICK
function imprimir(id){
 //imprime o muestra en pantalla el parametro que va a recibir . Aca esta metida dentro de una funcion y no depende de si esta o no creada la funcion, la llamas con un click. Y en el caso anterior con el getelementbyclass busca directamente cuando carga el documento (aca si importa el orden de carga, con la funcion no.)  

//LA funcion imprimir, en funcion del paramtetro que reciba va a ejecutar una accion y necesita adentro un switch, para verificar de acuerdo  al parametro que reciba que va a hacer.
switch(id){
case "upcoming":
    display(eventosFuturos)
    // console.log("Estoy en upcoming")
    break;
case "past":
    display(eventosPasados)
    // console.log("Estoy en past")
  break;
  default:
    display(eventos)
        // console.log("Estoy en home")
}
}

//FUNCION PARA GENERAR EL TEMPLE LAYOUT(VISTA DINAMICA) //Creo la var afuera porque si la creo dentro del bucle se va a volver a cero, se sigue modificando si está dentro de la función. 

function display(array){

    var html="";

    for(var i=0; i<array.length; i++){
  /*el += quiere decir que le va a ir agregando a medida que recorra un determinado elemento que sera el template string que vamos a componer */      
   html+= `
  <div class="event number1">
        <img src="./img/${array[i].image}" alt="feriadecomida">
        <h2>${array[i].name}</h2>
        <p>${array[i].description}
        </p>
        <h4>${array[i].price}</h4>
        <a href="./pages/feriadecomida.html"><button>Ver más</button></a>
      </div>
    `
}
console.log(html);
document.getElementById("allevents").innerHTML=html;
}

imprimir("home");
