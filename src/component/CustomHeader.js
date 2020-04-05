import React from "react";
import logo from "../style/img/covid-icon.png";
import flag from "../style/img/algeria-flag.png"

function CustomHeader(props){

    return(
        <div className="App-header">
            <img src={flag} className="App-flag" alt="logo" />
            <div className="header-content">
                <strong className="App-title">COVID-19 Situation Dashboard in Algeria</strong>
                <div className="low-head">{props.lastUpdate}</div>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );

}export default CustomHeader;
