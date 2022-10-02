import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    useEffect(() =>{
        dispatch(getDogs());
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to= "/dogs">Create Dog</Link>
            <h1>My Doggies App</h1>
            <button onClick={ e => {handleClick(e)}}>
                Refresh All Dogs
            </button>
            <div>
                <select>
                    <option value="Asc Name">Sort By Name (A - Z)</option>
                    <option value="Desc Name">Sort By Name (Z - A)</option>
                </select>
                <select>
                    <option value="Asc Weight">Sort By Weight (Light - Heavy)</option>
                    <option value="Desc Weight">Sort By Weight (Heavy - Light)</option>
                </select>
                <select>
                    <option value="Temp">Sort By Temperament</option>
                </select>
                <select>
                    <option value="All Dogs">All Dogs</option>
                    <option value="Created Dogs">Created Dogs</option>
                    <option value="Api Dogs">Existing Dogs</option>
                </select>
            </div>
        </div>
    )
}