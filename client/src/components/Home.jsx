import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByName, filterByWeight, filterByTemperament, getTemperaments, filterByCreated } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card/Card";
import Paginado from "./Paginado/Paginado";
import SearchBar from "./SearchBar";

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    useEffect(() =>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1)        
    }
    function handleSortName(e){
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortWeight(e){
        e.preventDefault();
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    
    function handleFilterTemp(e){
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e){
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
    }
    return (
        <div>
            <Link className="homeCreateDog" to= "/dogs">Create Dog</Link>
            <h1>My Doggies App</h1>
            <button onClick={ e => {handleClick(e)}}>
                Refresh All Dogs
            </button>
            <div>
                <select onChange={e => handleSortName(e)}>
                    <option value="Asc Name">Sort By Name (A - Z)</option>
                    <option value="Desc Name">Sort By Name (Z - A)</option>
                </select>
                <select onChange={e => handleSortWeight(e)}>
                    <option value="Asc Weight">Sort By Weight (Light - Heavy)</option>
                    <option value="Desc Weight">Sort By Weight (Heavy - Light)</option>
                </select>
                <select onChange={e => handleFilterTemp(e)}>
                    <option value="All">Sort By Temperament</option>
                    {
                        allTemperaments?.map((e, i) => {
                                return (
                                    <option id={i} value={e} key={i}>{e}</option>
                                )
                        }) 
                    }
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All Dogs">All Dogs</option>
                    <option value="Created Dogs">Created Dogs</option>
                    <option value="Api Dogs">Existing Dogs</option>
                </select>
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                <SearchBar/>
                {currentDogs?.map( (el)=> {
                    return (
                        <div key={el.id}>
                                    <Card name={el.name} image={el.image ? el.image : "https://holatelcel.com/wp-content/uploads/2020/09/cheems-memes-9.jpg"} temperament={el.temperament? el.temperament : "This Doggie has no temperaments"} id={el.id} weight={
                                        typeof el.weight === "string" ? !el.weight.includes("NaN") ? el.weight : "This Doggie did not share their weight" : el.weight
                                    } />
                            </div>
                        )})}
            </div>
        </div>
    )
}

