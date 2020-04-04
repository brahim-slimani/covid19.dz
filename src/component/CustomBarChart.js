import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import {Chart} from "primereact/chart";
import {CustomProgress} from "./CustomProgress";

class CustomBarChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataChart: {
                labels: null,
                datasets: [{
                    label: '',
                    backgroundColor: '#ed1d24',
                    data: []
                }],
            },
        }

    }


    getXAxes = (data) => {
        // let result = Object.entries(data).map(( [k, v] ) => (k));
        let result = Object.entries(data).map(( [k, v] ) => {
          if(v != 0){
              return k;
          }
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });
        return result;
    }

    getYAxes = (data) => {
        //let result = Object.entries(data).map(( [k, v] ) => ({ [k]: v }));
        let result = Object.entries(data).map(( [k, v] ) => {
            if(v != 0){
                return v;
            }
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });
        return result;
    }


    componentDidMount() {
        CovidService.getHistoricalCovid('Algeria').then(response => {
            switch (this.props.type) {
                case 'cases' :
                    this.setState(prevState => ({
                        dataChart: {
                            ...prevState.dataChart,
                            labels: this.getXAxes(response.data.timeline.cases),
                            datasets: [{
                                label: 'Cumulation cases',
                                backgroundColor: '#ed1d24',
                                data:  this.getYAxes(response.data.timeline.cases)
                            }],
                        }
                    }));
                    break;
                case 'death' :
                    this.setState(prevState => ({
                        dataChart: {
                            ...prevState.dataChart,
                            labels: this.getXAxes(response.data.timeline.deaths),
                            datasets: [{
                                label: 'Cumulation Deaths',
                                backgroundColor: '#000000',
                                data:  this.getYAxes(response.data.timeline.deaths)
                            }],
                        }
                    }));
                    break;
                case 'recovered' :
                    this.setState(prevState => ({
                        dataChart: {
                            ...prevState.dataChart,
                            labels: this.getXAxes(response.data.timeline.recovered),
                            datasets: [{
                                label: 'Cumulation Recovered',
                                backgroundColor: '#1ea04c',
                                data:  this.getYAxes(response.data.timeline.recovered)
                            }],
                        }
                    }));
                    break;
            }
        }).catch(error =>{
            console.log(error);
        });
    }

    render() {
        return(
            <Panel header={this.props.title} className="chart-content">
                {this.state.dataChart.labels != null ? <Chart type='bar' data={this.state.dataChart} />
                : <CustomProgress type="spinner"/>}
            </Panel>
        );
    }
}
export default CustomBarChart;
