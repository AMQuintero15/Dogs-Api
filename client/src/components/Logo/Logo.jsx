import React from "react";
import { Component } from "react";
import imagen from "./dog.png"

export default class Logo extends Component{
    render() {
        return (
          <div className="logo-main">
            <img src={imagen} alt="Not Found" width="160px"/>
          </div>
        )
      }
    
}