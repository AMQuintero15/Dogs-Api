import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogsDetail } from "../actions";
import { useEffect } from "react";

export default function DogDetail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogsDetail(props.match.params.id));
    }, [dispatch]);

    const dogDetail = useSelector((state) => state.detail)

    return (
        <div>
            {
                dogDetail.length > 0 ?
                <div>
                    <h3>I am {dogDetail[0].name}</h3>
                    <h4>I am know for being: {dogDetail[0].temperament? dogDetail[0].temperament : "A mistery"}</h4>
                    <h5>I can weight: {!dogDetail[0].weight.includes("NaN")? dogDetail[0].weight: "I won't share my weight"
                    } Kg</h5>
                    <h5>My height is: {dogDetail[0].height} cm</h5>
                    <h5>I can live: {dogDetail[0].lifeSpan}</h5>
                    <img src={dogDetail[0].image ? dogDetail[0].image : "https://holatelcel.com/wp-content/uploads/2020/09/cheems-memes-9.jpg"} alt="" width="400px" height="200px"/>
                </div> : <p>Loading...</p>
            }
            <Link className="detailGoBack" to="/home">Go Back</Link>
        </div>
    )

}