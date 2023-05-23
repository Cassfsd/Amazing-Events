console.log(dataAmazing)

let textSlider = document.getElementById("slidetitle")
let sliderEventos = document.getElementById("arrow_next")
const fechaBase = dataAmazing.fechaActual
const eventos = dataAmazing.eventos
const eventosPasados = [] //Dejo vacio porque cuando recorra le tengo que hacer un push y si no es un array no puedo hacerle un push.
const eventosFuturos = []
let checkedCheckboxes = []
let search = ""
let ulNombreEventos = document.getElementById("allevents")
let arrayAFiltrar = []
var inputSearch = document.getElementById("inputSearch")
var searchContainer = document.getElementById("searchContainer")
let formulario = document.getElementById("form")
let stats = document.getElementById("statsView")




console.log(fechaBase);
console.log(eventos);

for (var i = 0; i < eventos.length; i++) {//siempre que trabajemos con arrays se debe usar el .lenght, es un dato que te va a garantizar que no te vas a pasar, aunque se agregen o eliminen datos. 
    if (eventos[i].date > fechaBase) {  //eventos[i] quiere decir el evento en el indice que está recorriendo. 
        eventosFuturos.push(eventos[i])
    } else { //Si la fecha del evento que está recorriendo, es mayor que la fecha base, le va a hacer un push a eventos futuros del evento que está capturando...
        eventosPasados.push(eventos[i])
    }//...sino, lo va a mandar a eventos pasados. 

}
console.log(eventosFuturos);
console.log(eventosPasados);
//Clase Funciones y DOM min:20

//VISTA DINAMICA DE LAS PAGINAS HOME, UPCOMING Y PAST EVENTS
var buttonNav = document.getElementsByClassName("navevents")
console.log(buttonNav) //Aca me trae la coleccion, puedo ver en consola propiedades de la variable, como ID por ejemplo.
// linea 29.captura los elementos con la clase navevents. Quedan todos los botones guardados dentro de la variable buttonNav

for (var i = 0; i < buttonNav.length; i++) {
    console.log(i) //Aca verifico si lo recorre
    const element = buttonNav[i];
    //A medida que los vaya recorriendo, va a ir guardando el elemento que está recorriendo
    element.addEventListener("click", function (e) {
        // console.log(e.target.id);
        imprimir(e.target.id)
        //Acá no hará nada en si, solo mostrar una consulta de consola
    })
}//Para el caso de contact y stats, donde para este proyecto si lo estamos trabajando con una pagina nueva, no hace falta que le agreguemos class a esos botones de una pagina nueva,  porque cuando le demos click nos va a refrescar. 

//CAPTURAR EL EVENTO DEL ID DONDE ESTAMOS HACIENDO CLICK
function imprimir(id) {
    //imprime o muestra en pantalla el parametro que va a recibir . Aca esta metida dentro de una funcion y no depende de si esta o no creada la funcion, la llamas con un click. Y en el caso anterior con el getelementbyclass busca directamente cuando carga el documento (aca si importa el orden de carga, con la funcion no.)  

    //La funcion imprimir, en funcion del paramtetro que reciba va a ejecutar una accion y necesita adentro un switch, para verificar de acuerdo  al parametro que reciba que va a hacer.
    switch (id) {
        case "upcoming":
            textSlider.innerHTML = "Eventos Futuros"
            display(eventosFuturos)
            imprimirCheckbox(eventosFuturos)
            checkedCheckboxes = []
            inputSearch.value = ""
            searchContainer.style.display = "flex"
            arrayAFiltrar = eventosFuturos
            stats.style.display = "none"
            formulario.style.display = "none"
            // console.log("Estoy en upcoming")
            break;
        case "past":
            textSlider.innerHTML = "Eventos Pasados"
            display(eventosPasados)
            imprimirCheckbox(eventosPasados)
            checkedCheckboxes = []
            inputSearch.value = ""
            searchContainer.style.display = "flex"
            arrayAFiltrar = eventosPasados
            stats.style.display = "none"
            formulario.style.display = "none"
            // console.log("Estoy en past")
            break;

        case "stats":
            imprimirStats()
            stats.style.display = "flex"
            ulNombreEventos.style.display = "none"
            searchContainer.style.display = "none"
            formulario.style.display = "none"
            break;

        case "formContact":
            ulNombreEventos.style.display = "none"
            searchContainer.style.display = "none"
            stats.style.display = "none"
            formulario.style.display = "flex"
            formulario.innerHTML =
                `
                
                <form action="">
                <div class="form_input">
                    <label for="email"><i class="fa-solid fa-user"></i></label>
                    <input type="email" name="email" placeholder="email@email.com" required>
                </div>
                <div class="form_input">
                    <label for="type"><i class="fa-solid fa-qrcode"></i></label>
                    <select id="type" name="type" >
                        <option value="Varios" selected>Varios</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Sugerencia">Sugerencia</option>
                        <option value="Felicitaciones">Felicitaciones</option>
                    </select>
                </div>
                <div class="form_input">
                    <label for="date"><i class="fa-solid fa-calendar"></i></i></label>
                    <input type="date"id="date">
                </div>
                <div class="form_input">
                    <label for="comentario"><i class="fa-solid fa-comment"></i></label>
                    <textarea id="comentario" placeholder="Dejanos tu comentario"></textarea>
                </div>
        
                <div class="boton_form">
                    <input  class="boton_submit"  type="submit" value="Enviar!!!" data-bs-toggle="modal" data-bs-target="#exampleModal">
                </div>
            </form>
            `


            let form = document.querySelector("form")
            form.addEventListener("submit", function (event) { actionForm(event) })
            //console.log("Ocultar las Cards o Estadisticas y va a mostrar el formulario de contactos")

            break;


        default:
            display(eventos)
            imprimirCheckbox(eventos)
            textSlider.innerHTML = "Home"
            checkedCheckboxes = []
            inputSearch.value = ""
            searchContainer.style.display = "flex"
            arrayAFiltrar = eventos
            stats.style.display = "none"
            formulario.style.display = "none"
        // console.log("Estoy en home")
        break;
    }
}
imprimir ()
//FUNCION PARA GENERAR EL TEMPLE LAYOUT(VISTA DINAMICA) //Creo la var afuera porque si la creo dentro del bucle se va a volver a cero, se sigue modificando si está dentro de la función. 

function display(array) {

    var html = "";

    for (var i = 0; i < array.length; i++) {
        /*el += quiere decir que le va a ir agregando a medida que recorra un determinado elemento que sera el template string que vamos a componer */
        html += `
  <div class="event number1">
        <img src="./img/${array[i].image}" alt="feriadecomida">
        <h2>${array[i].name}</h2>  
        <p>${array[i].description}
        </p>
        <h4>$${array[i].price}</h4>
        <a href="./pages/feriadecomida.html"><button>Ver más</button></a>
      </div>
    `
        //En html yo no puedo representar objetos, por eso acá yo llamo a la clave (image,name, description) y luego al valor (lo que está dentro de la clave.)
        console.log(html);
        document.getElementById("allevents").innerHTML = html;

    }
}


//CREACION DINAMICA DE CHECKBOX POR CATEGORIA
function imprimirCheckbox(array) {
    let categories = array.map(evento => evento.category)
    // console.log(categories)
    let categoriasUnicas = new Set(categories)//Si existen datos repetidos dentro de categorias los eliminas. El método SET me devuelve del array un objeto con los datos únicos, me devuelve el objeto que contiene una sola vez el dato(no lo repite).
    let listaDeCategorias = [...categoriasUnicas] //Esto vaa ser el contenido de categoriasUnicas. Lo guarda en un array. 

    let categoriaEventos = ""
    listaDeCategorias.map(categoria =>
        categoriaEventos +=
        `
        <label><input type='checkbox' value='${categoria}'> ${categoria}</label>
        `
    )
    document.getElementById("checkcategories").innerHTML = categoriaEventos
    checkboxListener()
}
//Posibilidades de filtro de aquellas categorias que tienen eventos
// imprimir("home");




function checkboxListener() {
    //Voy a elegir todos los documentos de un mismo tipo. ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
    var checkboxs = document.querySelectorAll('input[type=checkbox') // Con el selectorAll capturamos las etiquetas input de tipo checkbox
    // elemento


    //recorro cada uno de los input checkbox y les aplico un escuchador de eventos change
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {

            //con cada change se limpia el array donde voy a guardar los input con checked true ya que utilizo un metodo push, caso contrario se van a agregar más eventos 
            checkedCheckboxes = []//creo un array vacio para poder guardar los datos de los checkbox con condicion checked true 

            //recorro el array de checkbox para extraer aquellos cuyos atibuto sea true
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {

                    //si se cumple la condicion de checked true los empujo al array que defini para almacenar los checkbox chequeados. 
                    checkedCheckboxes.push(checkboxs[i].value)

                }
            }
            console.log(checkedCheckboxes)
            console.log(arrayAFiltrar)
            filtrosCombinados() // Esto me permite mostrar el mensaje de no se encontraron eventos
        })
    }

}

inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value;
    search = datoInput.trim().toLowerCase();
    filtrosCombinados();
});

//FILTRAR LOS EVENTOS EN FUNCION DE LAS CATEGORIAS CHECKEADAS 
function filtrosCombinados() {

    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category => filtrado.push(...arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))
        display(filtrado)
    }

    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(search))

    }

    else if (search === "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category =>
            filtrado.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )

    }
    else {
        filtrado = arrayAFiltrar

    }

    filtrado.length > 0 ?
        display(filtrado) :
        ulNombreEventos.innerHTML = `<h1 class="ceroResult">  No se encontraron eventos para tu busqueda </h1> `

}

// let dataFromForm;
// var form = document.querySelector("form")
// form.addEventListener("submit", (evento) => { formData(evento) })

// function formData(evento) {
//     evento.preventDefault()
//     dataFromForm = {

//     }
//     console.log(evento)

