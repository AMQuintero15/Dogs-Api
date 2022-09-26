const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require("../db.js")
const { getAllDogs, getAllTemperaments } = require("./controllers.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req,res)=>{
    const name = req.query.name
    let dogsAll = await getAllDogs();
    if (name){
        let dogName = await dogsAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('The Dog Was Not Found') 
    } else{
        res.status(200).send(dogsAll)
    }
})

router.get("/temperaments", async (req,res) => {
    const name = req.query.name
    let temperamentsAll = await getAllTemperaments();
    if(name){
        let temperamentName = await temperamentsAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        temperamentName.length ?
        res.status(200).send(temperamentName) :
        res.status(404).send('The Temperament Was Not Found') 
    } else{
        res.status(200).send(temperamentsAll)
    }
})

router.post("/dogs", async (req,res) => {
    let {
        name,
        height,
        weight,
        lifeSpan,
        temperament
    } = req.body
    let dogCreated = await Dog.create({
        name,
        height,
        weight,
        lifeSpan,
    })
    let temperamentDb = await Temperament.findAll({
        where: { name: temperament }
    })
    console.log(temperamentDb)
    dogCreated.addTemperament(temperamentDb)
    res.send("The Dog Was Successfully Created")
})

router.get("/dogs/:id", async (req,res) =>{
    const id = req.params.id;
    const dogAll = await getAllDogs()
    if (id){
        let dogId = await dogAll.filter( el => el.id.toLowerCase().includes(id.toLowerCase()))
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send("The Dog Was Not Found")
    }
})

module.exports = router;
