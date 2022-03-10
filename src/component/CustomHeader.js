import React from "react";
import logo from "../assets/img/covid.png";

function CustomHeader(props) {

    return (
        // <div className="App-header">
        //     <img src={flag} className="App-flag" alt="logo" />
        //     <div className="header-content">
        //         <strong className="App-title">COVID-19 Situation Dashboard in Algeria</strong>
        //         <div className="low-head">{props.lastUpdate}</div>
        //     </div>
        //     <img src={logo} className="App-logo" alt="logo" />
        // </div>
        <nav class="navbar navbar-light custom-header shadow-sm">
            <a class="navbar-brand nav-title" href="index">
                <img src={logo} className="App-logo" alt="logo" />
                &nbsp;
                <pre className="desktop-title mb-0 py-1">COVID-19 Situation in Algeria</pre>
                <pre className="mobile-title mb-0 py-1">COVID-19 DZ</pre>
            </a>

            <div class="right-nav">
                <a href="https://slimani-ibrahim.github.io/profile" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-globe" title="portfolio"></i>
                </a>&nbsp;&nbsp;
                <a href="https://github.com/Slimani-Ibrahim" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-github" title="github"></i>
                </a>&nbsp;&nbsp;
                <a href="https://www.linkedin.com/in/ibrahim-slimani-184161b2/" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin" title="linkedin"></i>
                </a>&nbsp;&nbsp;
                <a href="https://github.com/Slimani-Ibrahim/covid19.dz" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-code-fork" title="source code"></i>
                </a>
            </div>
        </nav>

    );

} export default CustomHeader;
