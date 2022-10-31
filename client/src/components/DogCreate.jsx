import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "A name is required"
    }
    else if(!/^[a-zA-Z\s]*$/.test(input.name)){
        errors.name = "The name must only contain letters"
    }
    else if(!input.heightMin){
        errors.heightMin = "A minimum height is required"
    }
    else if(!input.heightMax){
        errors.heightMax = "A maximum height is required"
    }
    else if(Number(input.heightMin) >= Number(input.heightMax)){
        errors.heightMin = "Minimum height must be less than maximum height"
    }
    else if(!input.weightMin){
        errors.weightMin = "A minimum weight is required"
    }
    else if(!input.weightMax){
        errors.weightMax = "A minimum weight is required"
    }
    else if(Number(input.weightMin) >= Number(input.weightMax)){
        errors.weightMin = "Minimum weight must be less than maximum weight"
    }
    else if(!input.lifeSpanMin){
        errors.lifeSpanMin = "A minimum life span is required"
    }
    else if(!input.lifeSpanMax){
        errors.lifeSpanMax = "A minimum life span is required"
    }
    else if(Number(input.lifeSpanMin) >= Number(input.lifeSpanMax)){
        errors.lifeSpanMin = "Minimum lifeSpan must be less than maximum lifeSpan"
    }
    return errors
}

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({
        name: "A name is required"
    });

    const [input, setInput] = useState({
        name: "",
        height: "",
        heightMin: "",
        heightMax: "",
        weight: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        lifeSpanMin: "",
        lifeSpanMax: "",
        image: "",
        temperament: []
    })
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value,
            height: input.heightMin + " - " + input.heightMax,
            weight: input.weightMin + " - " + input.weightMax,
            lifeSpan: input.lifeSpanMin + " - " + input.lifeSpanMax + " years"
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        for (let i = 0; i < input.temperament.length; i++) {
            if(input.temperament[i] === e.target.value){
                return input
            }
        }
        setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
    })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postDog(input))
        alert("Dog Created")
        setInput({
            name: "",
            height: "",
            weight: "",
            lifeSpan: "",
            image: "",
            temperament: []
        })
        history.push("/home")
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== el)
        })
    }
    return  (
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            <h1>Create Your Doggie</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}/>
                    {errors.name && (
                        <p className="error" style={ {color: "red"} }>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Height:</label>
                    <input type="number" placeholder="Min" min={1} max={99} value={input.heightMin} name="heightMin" onChange={(e) => handleChange(e)}/>
                    <input type="number" placeholder="Max" min={+input.heightMin + 1} max={+input.heightMin + 50} value={input.heightMax} name="heightMax" onChange={(e) => handleChange(e)}/>
                    {errors.heightMax && (
                        <p className="error" style={ {color: "red"} }>{errors.heightMax}</p>
                    )}
                    {errors.heightMin && (
                        <p className="error" style={ {color: "red"} }>{errors.heightMin}</p>
                    )}
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="number" placeholder="Min" min={1} max={99} value={input.weightMin} name="weightMin" onChange={(e) => handleChange(e)}/>
                    <input type="number" placeholder="Max" min={+input.weightMin + 1} max={+input.weightMin + 50} value={input.weightMax} name="weightMax" onChange={(e) => handleChange(e)}/>
                    {errors.weightMax && (
                        <p className="error" style={ {color: "red"} }>{errors.weightMax}</p>
                    )}
                    {errors.weightMin && (
                        <p className="error" style={ {color: "red"} }>{errors.weightMin}</p>
                    )}
                </div>
                <div>
                    <label>Life Span:</label>
                    <input type="number" placeholder="Min" min={1} max={99} value={input.lifeSpanMin} name="lifeSpanMin" onChange={(e) => handleChange(e)}/>
                    <input type="number" placeholder="Max" min={+input.lifeSpanMin + 1} max={+input.lifeSpanMin + 50} value={input.lifeSpanMax} name="lifeSpanMax" onChange={(e) => handleChange(e)}/>
                    {errors.lifeSpanMax && (
                        <p className="error" style={ {color: "red"} }>{errors.lifeSpanMax}</p>
                    )}
                    {errors.lifeSpanMin && (
                        <p className="error" style={ {color: "red"} }>{errors.lifeSpanMin}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" placeholder="Url Link ..." value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                    {errors.image && (
                        <p className="error">{errors.image}</p>
                    )}
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    <option value="None">Select Your Doggies Temperaments</option>
                    {
                        temperaments?.map((e, i) => {
                            return (
                                    <option id={i} value={e} key={i}>{e}</option>
                                )})
                    }
                </select>
                <ul><li>{input.temperament.map(el => el + ", ")}</li></ul>
                <button type="submit" disabled={ Object.keys(errors).length === 0 ? false : true }>Create Doggie</button>
            </form>
            {input.temperament.map(el => 
                <div className="dogCreateTemps">
                    <p>{el}</p>
                    <button className="buttonX" onClick={() => handleDelete(el)}>X</button>
                </div>
                )}
        </div>
    )

}