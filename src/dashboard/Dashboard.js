import React from "react";
import { CustomCard } from "../component/CustomCard";
import deathIcon from "../assets/img/death-icon.png";
import bioIcon from "../assets/img/bio-danger-yellow.png";
import CovidService from "../service/CovidService";
import CovidDoughnutChart from "./CovidDoughnutChart";
import GridCountries from "./GridCountries";
import CovidRankDeath from "./CovidRankDeath";
import { CustomAnalyticChart } from "./CustomAnalyticChart";
import DailyChartReport from "./DailyChartReport";
import AdviceCard from "../component/AdviceCard";
import ScrollTop from "react-scrolltop-button";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countCases: null,
            countDeaths: null,
            countRecovered: null,
            countActive: null,
            todayCases: null,
            todayDeaths: null,
            lastUpdate: null,
        }
    }

    getXAxes = (data) => {
        // let result = Object.entries(data).map(( [k, v] ) => (k));
        let result = Object.entries(data).map(([k, v]) => {
            return (v !== 0) ? k : null;
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });
        return result;
    }

    getYAxes = (data) => {
        //let result = Object.entries(data).map(( [k, v] ) => ({ [k]: v }));
        let result = Object.entries(data).map(([k, v]) => {
            return (v !== 0) ? v : null;
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });

        return result;
    }

    componentDidMount() {
        CovidService.getCountryCovid('Algeria').then(response => {
            this.setState({
                countCases: response.data.cases,
                countDeaths: response.data.deaths,
                countRecovered: response.data.recovered,
                countActive: response.data.active,
                todayCases: response.data.todayCases,
                todayDeaths: response.data.todayDeaths,
                lastUpdate: 'last update : ' + this.timespanToDatetime(response.data.updated)
            });
        }).catch(error => {
            console.log(error);
            alert(error);
        });

    }

    timespanToDatetime = (doubleDate) => {
        if (doubleDate === "") return "";
        if (doubleDate === null) return "";
        if (doubleDate === undefined) return "";
        const current_datetime = new Date(doubleDate);
        return current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    }


    render() {
        return (
            <div className="App">
                {/* <CustomHeader lastUpdate={this.state.lastUpdate} /> */}
                <div className="card-parent">
                    <AdviceCard />
                    <br />
                    <div className='card-container'>
                        <CustomCard icon='fa fa-certificate' title='Total Cases' count={this.state.countCases} todayReport={this.state.todayCases} subtitle='new cases' color="red" />
                        &nbsp;
                        <CustomCard img={deathIcon} title='Total Deaths' count={this.state.countDeaths} todayReport={this.state.todayDeaths} subtitle='new deaths' color="white" />
                        &nbsp;
                        <CustomCard icon='fa fa-heartbeat' title='Total Recovers' count={this.state.countRecovered} color="#00ff00" />
                        &nbsp;
                        <CustomCard img={bioIcon} title='Active Cases' count={this.state.countActive} color="#ffde00" />
                    </div>
                </div>

                <br />

                <div className="chart-container">
                    <DailyChartReport title="Daily cases" type="cases" label="cases" country="algeria" color="red" />
                    &nbsp;
                    <DailyChartReport title="Daily deaths" type="deaths" label="deaths" country="algeria" color="black" />
                    &nbsp;
                    <DailyChartReport title="Daily recovers" type="recovered" label="recovers" country="algeria" color="#00ff00" />
                </div>

                {/* <div className="chart-container">
                    <CovidBarChart title='Evolution Cases' type='cases' perimeter='Algeria'/>
                    &nbsp;
                    <CovidBarChart title='Evolution Deaths' type='death' perimeter='Algeria'/>
                    &nbsp;
                    <CovidBarChart title='Evolution Recovered' type='recovered' perimeter='Algeria'/>
                </div> */}

                <div className="chart-container">
                    <CustomAnalyticChart title='Cumulations' perimeter='Algeria' />
                    &nbsp;
                    <CovidDoughnutChart title='Global Situation' type='global' perimeter='Algeria' />
                    &nbsp;
                    {this.state.todayCases !== 0 ? <CovidDoughnutChart title='Today Situation' type='today' perimeter='Algeria' /> : <div className="chart-content" />}
                </div>

                {/*<div className="chart-container">
                    <WilayaChart title='Cases % Wilaya' type='confirmed'/>
                    &nbsp;
                    <WilayaChart title='Deaths % Wilaya' type='deaths'/>
                    &nbsp;
                    <div className="chart-content" />
                </div>*/}

                {/* <GridProvinces title="Situation in Provinces" viewport={window.innerWidth > 500 ? "desktop" : "mobile"} /> */}

                <GridCountries title="COVID-19 around the world" viewport={window.innerWidth > 500 ? "desktop" : "mobile"} />

                {/* <div className="chart-container">
                    <CovidBarChart title='Evolution Cases' type='cases' perimeter='world'/>
                    &nbsp;
                    <CovidBarChart title='Evolution Deaths' type='death' perimeter='world'/>
                    &nbsp;
                    <CovidBarChart title='Evolution Recovered' type='recovered' perimeter='world'/>
                </div> */}

                <div className="chart-container">
                    <DailyChartReport title="Daily cases" type="cases" label="cases" country="all" color="red" />
                    &nbsp;
                    <DailyChartReport title="Daily deaths" type="deaths" label="deaths" country="all" color="black" />
                    &nbsp;
                    <DailyChartReport title="Daily recovers" type="recovered" label="recovers" country="all" color="#00ff00" />
                </div>


                <div className="chart-container">
                    <CustomAnalyticChart title='Cumulations' perimeter='all' />
                    &nbsp;
                    <CovidDoughnutChart title='Global Situation' type='global' perimeter='world' />
                    &nbsp;
                    <CovidDoughnutChart title='Today Situation' type='today' perimeter='world' />
                </div>

                <CovidRankDeath />

                <ScrollTop
                    text={<i className="fa fa-arrow-up" />}
                    distance={90}
                    className="scroll-btn"
                    style={{ backgroundColor: "#1ea04c", border: "0.5px solid white", padding: "2px 8px", color: "white" }}
                />

            </div>
        );
    }

}
export default Dashboard;
