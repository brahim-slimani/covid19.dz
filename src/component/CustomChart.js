import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import {Chart} from "primereact/chart";

class CustomChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataChart: {
                labels: [],
                datasets: [{
                    label: '',
                    backgroundColor: '#ed1d24',
                    data: []
                }],
            },
            objectLabels: null
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
                                label: 'cases per day',
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
                                label: 'Deaths per day',
                                backgroundColor: '#ed1d24',
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
                                label: 'Recovered per day',
                                backgroundColor: '#ed1d24',
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
            <Panel header={this.props.title}>
                {console.log(this.state.objectLabels)}
                <Chart type='bar' data={this.state.dataChart} />
            </Panel>
        );
    }
}
export default CustomChart;