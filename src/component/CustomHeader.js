import React from "react";
import logo from "../style/img/covid-icon.png";
import flag from "../style/img/algeria-flag.png"

function CustomHeader(props){

    return(
        <div className="App-header">
            <img src={flag} className="App-flag" alt="logo" />
            <strong className="App-title">COVID-19 Dashboard Situation in Algeria  </strong>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );

}export default CustomHeader;
