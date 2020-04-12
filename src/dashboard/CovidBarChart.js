import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import {Chart} from "primereact/chart";
import {CustomProgress} from "../component/CustomProgress";

class CovidBarChart extends React.Component{

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

        //temporary static solution for ecart recovered timelines
        if(this.props.type == 'recovered' && this.props.perimeter == 'Algeria'){
            result[6] = 16;
            result[7] = 16;
            result[8] = 16;
            result[9] = 20;
            result[10] = 20;
            result[11] = 24;
            result[12] = 24;
        }
        return result;
    }


    componentDidMount() {
        var prefixUrl = this.props.perimeter == 'world' ? 'all' : 'Algeria';
        CovidService.getHistoricalCovid(prefixUrl).then(response => {
            let customResponse = this.props.perimeter == 'world' ? response.data : response.data.timeline;
            switch (this.props.type) {
                case 'cases' :
                    this.setState(prevState => ({
                        dataChart: {
                            ...prevState.dataChart,
                            labels: this.getXAxes(customResponse.cases),
                            datasets: [{
                                label: 'Cumulation cases',
                                backgroundColor: '#ed1d24',
                                data:  this.getYAxes(customResponse.cases)
                            }],
                        }
                    }));
                    break;
                case 'death' :
                    this.setState(prevState => ({
                        dataChart: {
                            ...prevState.dataChart,
                            labels: this.getXAxes(customResponse.deaths),
                            datasets: [{
                                label: 'Cumulation Deaths',
                                backgroundColor: '#000000',
                                data:  this.getYAxes(customResponse.deaths)
                            }],
                        }
                    }));
                    break;
                case 'recovered' :
                    this.setState(prevState => ({
                        dataChart: {
                            ...prevState.dataChart,
                            labels: this.getXAxes(customResponse.recovered),
                            datasets: [{
                                label: 'Cumulation Recovered',
                                backgroundColor: '#1ea04c',
                                fill: false,
                                data:  this.getYAxes(customResponse.recovered)
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
export default CovidBarChart;
