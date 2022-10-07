import React from "react";
import {Link} from "react-router-dom";

export default function Card({name, image, temperament, weight, id}) {
    return (
        <div>
            <Link to={"/home/"+ id}>
            <h3>{name}</h3>
            </Link>
            <h4>This Doggie is: {temperament}</h4>
            <h5>They can weight: {weight} Kg</h5>
            <img src={image} alt="img not found" width="400px" height="200px"/>
        </div>
    );
}