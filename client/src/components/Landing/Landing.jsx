import React from "react";
import { Link } from "react-router-dom";
import Welcome from "./Welcome.png"

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome To The Dogs App</h1>
            <Link to="/home">
                <button>Start</button>
            </Link>
                <div className="welcome-image">
                <img src={Welcome} alt="Not Found" width="200px"
                // https://secure.img1-fg.wfcdn.com/im/74058062/resize-h755-w755%5Ecompr-r85/9287/92878508/Loree+Dog+Welcome+Rubber+30+in.+x+18+in.+Non-Slip+Outdoor+Door+Mat.jpg
                />
                </div>
        </div>
    )
}