/*const utils = require("./utils")

var numeros=[[1,2],3,[4,5,6],7,[8,9]]
var numeros_ordenados=utils.myFunction(numeros)
console.log(utils.myFunction(numeros))
console.log(numeros_ordenados)
console.log(utils.ult(numeros))*/



const express= require('express');/*Se solicita una funcion de la dependecia 'express'*/
const _= require('lodash');
const cursos = require('./data/cursos.json');
const app = express();
const PORT = 3001;
// Para setear que la informacion que se envia en el body del los resquest sea en formato json.
app.use(express.json());



app.get('/cursos', (req, res)=>{        
    res.status(200).json(cursos);
});

/*app.get('/cursos', (req, res)=>{
    res.status(200).json({
        id: 1,
        numbre: "Laboratorio de programación y lenguaje",
        cantidad_alumnos: 51,
    })
});*/

app.get('/cursos', (req,res)=>{
    res.status(200).json({data: cursos, cantidad: cursos.length});
})

app.get('/cursos/:idCurso', (req, res)=>{
    const cursoID= req.params.idCurso
    const curso = cursos.find(c => c.id==cursoID );
    if (curso) res.status(200).json(curso);
    else
        res.status(404).json({
        message: `El curso ${cursoID} no se encuentra.`,
    });
});

app.post('/cursos/', (req, res) =>{
    const datosCurso= req.body;
    const ids= cursos.map((c)=> c.id );
    const idMAX= _.max(ids) + 1;
    const curso= {id: idMAX, ...datosCurso, habilitado: true }
    cursos.push(curso);
    res.status(201).json(curso);
})

app.delete('/cursos/:idCurso', (req, res)=>{
    const cursoID= req.params.idCurso
    const cursoIdx = cursos.findIndex(c => c.id==cursoID );
    if (cursoIdx >=0){
        cursos.splice(cursoIdx, 1);
        res.status(200).json({
            message: `El curso ${cursoID} fue eliminado.`
        })
    } 
    else
        res.status(404).json({
        message: `El curso ${cursoID} no se encuentra.`,
    });

})

app.listen(PORT, ()=>{
    console.log("La aplicacion inicio en el puerto 3001.");
    console.log(`La aplicacion inicio en el puerto ${PORT}.`);
}); /*Ponemos la app a escuchar // listen tiene dos parametros, el primero es un numero, y el segundo
es un callback, que tiene los parametros vacios, pero muestra por pantalla el mensaje */