import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import {Chart} from "primereact/chart";

class CustomDoughnutChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataChart: {
                labels: [],
                datasets: [{
                    label: '',
                    backgroundColor: '',
                    data: []
                }],
            },
        }

    }


    getXAxes = () => {
        let axes;
        switch (this.props.type) {
            case 'global':
                axes = ['confirmed','deaths','recovered'];
                break;
            case 'today':
                axes = ['confirmed','deaths'];
                break;
        }
        return axes;
    }

    getYAxes = (data) => {
        let axes;
        switch (this.props.type) {
            case 'global':
                axes = [data.cases, data.deaths, data.recovered];
                break;
            case 'today':
                axes = [data.todayCases, data.todayDeaths];
                break;
        }
        return axes;
    }


    componentDidMount() {
        CovidService.getCountryCovid('Algeria').then(response => {
            this.setState(prevState => ({
                dataChart: {
                    ...prevState.dataChart,
                    labels: this.getXAxes(),
                    datasets: [{
                        data:  this.getYAxes(response.data),
                        backgroundColor: [
                            "#ed1d24",
                            "#000000",
                            "#1ea04c"
                        ],
                    }],
                }
            }));
        }).catch(error =>{
            console.log(error);
        });
    }

    render() {
        return(
            <Panel header={this.props.title} className="chart-content">
                {console.log(this.state.objectLabels)}
                <Chart type='doughnut' data={this.state.dataChart} />
            </Panel>
        );
    }
}
export default CustomDoughnutChart;
