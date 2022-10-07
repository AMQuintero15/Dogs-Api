import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions";

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)

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
    }, []);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        }) 
        console.log(input)
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
    return  (
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            <h1>Create Your Doggie</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Height:</label>
                    <input type="text" value={input.height} name="height" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="text" value={input.weight} name="weight" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Life Span:</label>
                    <input type="text" value={input.lifeSpan} name="lifeSpan" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
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
                <button type="submit">Create Doggie</button>
            </form>
        </div>
    )

}