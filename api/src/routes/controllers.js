const axios = require("axios")
const { Dog, Temperament } = require("../db.js")

const getApiInfo = async() =>{
    const apiUrlDogs = await axios.get("https://api.thedogapi.com/v1/breeds")
    const apiInfoDogs = await apiUrlDogs.data.map(el => {
      return {
        id: el.id,
        name: el.name,
        height: el.height.metric,
        weight: el.weight.metric,
        lifeSpan: el.life_span,
        temperament: el.temperament
      }
    })
    return apiInfoDogs
}

const getAllDogs = async () =>{
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
    const dbInfo = await getDbInfo();
    return dbInfo
  }

  const getAllTemperaments = async () =>{
    const dbTemperament = await Temperament.findAll()
    return dbTemperament
  }

  module.exports = {
    getApiInfo,
    getAllDogs,
    getAllTemperaments
  }