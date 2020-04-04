import React from "react";


function CustomFooter(props) {
    return(
        <footer className="page-footer font-small blue pt-4" style={{background:"#20232b", color:"white"}}>


            <div className="container-fluid text-center text-md-left">


                <div className="row">


                    <div className="col-md-6 mt-md-0 mt-3">


                        <h5><a href="#">COVID19.DZ</a></h5>
                        <p>Dashboard for the Corona Virus Disease situation in Algeria & around the world.</p>

                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3"/>


                        <div className="col-md-3 mb-md-0 mb-3">


                            <h5 className="text-uppercase">Contact</h5>

                            <ul className="list-unstyled">
                                <li>
                                    <i className="fa fa-linkedin-square"/>&nbsp;
                                    <a href="https://www.linkedin.com/in/ibrahim-slimani-184161b2/" target="_blank">Slimani Ibrahim</a>
                                </li>
                                <li>
                                    <i className="fa fa-github-square"/>&nbsp;
                                    <a href="https://github.com/Slimani-Ibrahim" target="_blank">Slimani Ibrahim</a>
                                </li>
                                <li>
                                    <i className="fa fa-envelope-square"/>&nbsp;
                                    <a>slimani.ibr@gmail.com</a>
                                </li>
                            </ul>

                        </div>

                </div>

            </div>

            <div className="footer-copyright text-center py-3">© 2020 Copyright. Realised by Slimani Ibrahim
        </div>

        </footer>
    );
}export {CustomFooter}
