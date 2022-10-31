const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
    temperaments: [],
}

function rootReducer(state = initialState, action){
    switch(action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                detail: []
            }
            
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload,
            }

        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload 
            }

        case "GET_DOGS_DETAIL":
            return {
                ...state,
                detail: action.payload
            }
        case "POST_DOG":
            return {
                ...state,
            }

        case "FILTER_BY_NAME":
            const dogsSort = action.payload === "Asc Name" ? state.allDogs.sort(function (a, b){
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0
            }) : state.allDogs.sort(function (a, b){
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                dogs: dogsSort
            }

        case "FILTER_BY_WEIGHT":
            const allDogsWeight = state.allDogs.map(el => {
                const allDogsWeightArr = el.weight.split(" - ")
                const allDogsWeightProm = Math.ceil((Number(allDogsWeightArr[0]) + Number(allDogsWeightArr[1]))/2)
                 return {
                    id: el.id,
                    name: el.name,
                    image: el.image,
                    temperament: el.temperament,
                    weight: allDogsWeightProm
                 }
            })
            
            const allDogsWeightFiltered = allDogsWeight.filter(el => el.weight !== false)

            const dogsWeight = action.payload
                if(dogsWeight === "Asc Weight"){
                    const allDogsWeightOrdered = allDogsWeightFiltered.sort(function(a, b){
                        return a.weight - b.weight
                    }) 
                    return {
                        ...state,
                        dogs: allDogsWeightOrdered
                    }
                } else {
                    const allDogsWeightOrdered = allDogsWeightFiltered.sort(function(a, b){
                        return b.weight - a.weight
                    }) 
                    return {
                        ...state,
                        dogs: allDogsWeightOrdered
                    }
                }
        case "FILTER_BY_TEMPERAMENT":
            const allDogs = state.allDogs
            const temperamentFiltered = action.payload === "All" ? allDogs : allDogs.filter(el => {
                if(el.temperament !== undefined){
                    return el.temperament.includes(action.payload)
                }
            })
            return{
                ...state,
                dogs: temperamentFiltered
            }

        case "FILTER_CREATED":
            const createdFilter = action.payload === "Created Dogs" ? state.allDogs.filter( el => el.createdInDb) : state.allDogs.filter( el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === "All Dogs" ? state.allDogs : createdFilter
            }
        default:
            return state
    }

}

export default rootReducer