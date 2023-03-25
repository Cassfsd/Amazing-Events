console.log(dataAmazing)


const fechaBase = dataAmazing.fecha.Actual1
const eventos=dataAmazing.eventos
const eventos pasados=[] //DEjo vacio porque cuando recorra le tengo que hacer un push y si no es un array no puedo hacerle un push.
const eventosFuturos=[]





console.log(fechaBase);
console.log(eventos)

for (var i=0; i<eventos.length; i++){
if(eventos[i].date > fechaBase){
    eventosFuturos.push(eventos[i])
} else{
    eventosPasados.push(eventos[i])
}

console.log(eventosFuturos)
console.log(eventosPasados)
}