const axios = require("axios")
const { Dog, Temperament } = require("../db.js")
const { API_KEY } = process.env

const getApiInfo = async() =>{
    const apiUrlDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfoDogs = await apiUrlDogs.data.map(el => {
      return {
        id: el.id,
        name: el.name,
        height: el.height.metric,
        weight: el.weight.metric,
        lifeSpan: el.life_span,
        image: el.image.url,
        temperament: el.temperament
      }
    })
    return apiInfoDogs
}

const getDbInfo = async () => {
  return await Dog.findAll({
      include:{
          model: Temperament,
          attributes: ["name"],
          through: {
              attributes: [],
          },
      }
  })
}

const getAllDogs = async () =>{
    const apiDogs = await getApiInfo()
    const dbInfo = await getDbInfo();
    const dbInfoString = dbInfo.map(el =>{
        let newDog = {
          name: el.name,
          height: el.height,
          weight: el.weight,
          lifeSpan: el.lifeSpan,
          image: el.image,
          createdInDb: el.createdInDb,
          temperaments: el.temperaments.map(temp => {
            return temp.name
        }).join(", ")
        } 
        return newDog
    })
    const allDogs = apiDogs.concat(dbInfoString)
    return allDogs
  }

  const getAllTemperaments = async () =>{
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const temperamentsInfo = temperamentsApi.data.map(el => {
      const tempEach = el.temperament?.split(",")
      return tempEach
      
    });
    const temperamentSet = new Set(temperamentsInfo.flat())
    const temperamentArr = Array.from(temperamentSet)
    const temperamentArrFinal = temperamentArr.map(el =>{
      if(el !== undefined){
        return el.trim()
      }})
      temperamentArrFinal.forEach(el => {
        if(el !== undefined){
          Temperament.findOrCreate({
            where: { name: el }
          })
        }
      });
      return temperamentArrFinal
  }

  module.exports = {
    getApiInfo,
    getAllDogs,
    getAllTemperaments,
  }