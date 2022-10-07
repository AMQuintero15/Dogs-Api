import axios from "axios";

export function getDogs(){
    return async function(dispatch){ 
        var json = await axios.get("http://localhost:3001/dogs", {});
        
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/temperaments", {})

        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        })
    }
}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/dogs", payload);
        return response
    }
}

export function getDogsByName(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs?name=" + name)
            return dispatch ({
                type: "GET_DOGS_BY_NAME",
                payload: json.data
            })
        }
        catch (err){
            console.log(err)
        } 
    }
}

export function filterByName(payload){
    return {
        type: "FILTER_BY_NAME",
        payload
    }
}

export function filterByWeight(payload){
    return{
        type: "FILTER_BY_WEIGHT",
        payload
    }
}

export function filterByTemperament(payload){
    return {
        type: "FILTER_BY_TEMPERAMENT",
        payload
    }
}

export function filterByCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}