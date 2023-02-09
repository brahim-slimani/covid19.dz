import React from "react";


function CustomFooter() {
    return (
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row content-footer">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5><a href="/">COVID19.DZ</a></h5>
                        <p>Situation Dashboard of the Covid19 in Algeria & around the world.</p>
                    </div>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Contact</h5>
                        <ul className="list-unstyled">
                            <li>
                                <i className="fa fa-linkedin" />&nbsp;
                                <a href="https://www.linkedin.com/in/brahim-slimani/" target="_blank" rel="noopener noreferrer">Brahim Slimani</a>
                            </li>
                            <li>
                                <i className="fa fa-github-square" />&nbsp;
                                <a href="https://github.com/brahim-slimani" target="_blank" rel="noopener noreferrer">Brahim Slimani</a>
                            </li>
                            <li>
                                <i className="fa fa-envelope-square" />&nbsp;
                                <a href="mailto:slimani.ibr@gmail.com" >slimani.ibr@gmail.com</a>
                            </li>
                            <li>
                                <i className="fa fa-globe" />&nbsp;
                                <a href="https://brahim-slimani.github.io/profile/" target="_blank" rel="noopener noreferrer">www.brahim-slimani.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright. Realised by Brahim Slimani
            </div>
        </footer>
    );
} export { CustomFooter }
