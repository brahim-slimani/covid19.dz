import React from "react";
import {CustomCard} from "../component/CustomCard";
import CustomHeader from "../component/CustomHeader";
import deathIcon from "../style/img/death-icon.png";
import CovidService from "../service/CovidService";
import {Button} from "primereact/button";
import {PanelMenu} from "primereact/panelmenu";
import {Panel} from "primereact/panel";
import CustomChart from "../component/CustomChart";

class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            countCases: null,
            countDeaths: null,
            countRecovered: null,
            countActive: null,
        }
    }

    componentDidMount() {
        CovidService.getCountryCovid('Algeria').then(response => {
            this.setState({
                countCases:response.data.cases,
                countDeaths:response.data.deaths,
                countRecovered:response.data.recovered,
                countActive:response.data.active
            });
        }).catch(error => {
            console.log(error);
            alert(error);
        })
    }

    render() {
        return(
            <div className="App">
                <CustomHeader/>
                <br/>
                <div className='card-container'>
                    <CustomCard icon='fa fa-certificate' title='Confirmed Cases' count={this.state.countCases}/>
                    &nbsp;
                    <CustomCard img={deathIcon} title='Deaths' count={this.state.countDeaths}/>
                    &nbsp;
                    <CustomCard icon='fa fa-heartbeat' title='Recovered' count={this.state.countRecovered}/>
                    &nbsp;
                    <CustomCard icon='fa fa-hotel' title='Hospitalized' count={this.state.countActive}/>
                </div>
                <br/>

                <div className="chart-container">
                    <CustomChart title='Evolution Cases' type='cases'/>
                    &nbsp;
                    <CustomChart title='Evolution Deaths' type='death'/>
                    &nbsp;
                    <CustomChart title='Evolution Recovered' type='recovered'/>
                </div>
            </div>
        );
    }

}
export default Dashboard;