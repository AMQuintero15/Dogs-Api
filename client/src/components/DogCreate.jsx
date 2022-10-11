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
    else if(!input.height){
        errors.height = "A height is required"
    }
    else if(!/^[0-9\s-]*$/gm.test(input.height)){
        errors.height = "The height must only contain numbers"
    }
    else if(!/^.{5,7}$/.test(input.height)){
        errors.height = "Please input the height as a range e.g: 10 - 15"
    }
    else if(!input.weight){
        errors.weight = "A weight is required"
    }
    else if(!/^[0-9\s-]*$/gm.test(input.weight)){
        errors.weight = "The weight must only contain numbers"
    }
    else if(!/^.{5,7}$/.test(input.weight)){
        errors.weight = "Please input the weight as a range e.g: 10 - 15"
    }
    else if(!input.lifeSpan){
        errors.lifeSpan = "A Life Span is required"
    }
    else if(!/^[0-9\s-]|\W*(years)\W*$/gm.test(input.lifeSpan)){
        errors.lifeSpan = "The lifeSpan must only contain numbers and the words 'years' at the end"
    }
    else if(!/^.{11,13}$/.test(input.lifeSpan)){
        errors.lifeSpan = "Please input the lifeSpan as a range with the word years e.g: 10 - 15 years"
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
        weight: "",
        lifeSpan: "",
        image: "",
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
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
                    <input type="text" value={input.height} name="height" onChange={(e) => handleChange(e)}/>
                    {errors.height && (
                        <p className="error" style={ {color: "red"} }>{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="text" value={input.weight} name="weight" onChange={(e) => handleChange(e)}/>
                    {errors.weight && (
                        <p className="error" style={ {color: "red"} }>{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Life Span:</label>
                    <input type="text" value={input.lifeSpan} name="lifeSpan" onChange={(e) => handleChange(e)}/>
                    {errors.lifeSpan && (
                        <p className="error" style={ {color: "red"} }>{errors.lifeSpan}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
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