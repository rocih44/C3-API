const express= require('express');
const _= require('lodash');
const cursos = require('./data/cursos.json');
const app = express();
const PORT = 3001;
// Para setear que la informacion que se envia en el body del los resquest sea en formato json.
app.use(express.json());



app.get('/cursos', (req, res)=>{        
    res.status(200).json(cursos);
});

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
}); 
