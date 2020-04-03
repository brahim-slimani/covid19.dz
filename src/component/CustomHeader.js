import React from "react";
import logo from "../icon-coronavirus.png";

function CustomHeader(props){

    return(
        <div className="header-app">
            <strong>COVID-19 Dashboard Situation in Algeria  </strong>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
    
}export default CustomHeader;