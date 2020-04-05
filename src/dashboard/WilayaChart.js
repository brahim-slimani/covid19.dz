import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import {Chart} from "primereact/chart";
import {CustomProgress} from "../component/CustomProgress";

class WilayaChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataChart: {
                labels: null,
                datasets: [{
                    label: '',
                    backgroundColor: '',
                    data: []
                }],
            },
        }

    }


    getXAxes = (data) => {
        let axes = data.map(w => w.fr);
        return axes;
    }

    getYAxes = (data) => {
        let axes;
        switch (this.props.type) {
            case 'confirmed':
                axes = data.map(w => w.confirmed);
                break;
            case 'deaths':
                axes = data.map(w => w.deaths);
                break;
        }
        return axes;
    }


    componentDidMount() {
        CovidService.getWilayasCovid().then(response => {
            this.setState(prevState => ({
                dataChart: {
                    ...prevState.dataChart,
                    labels: this.getXAxes(response.data),
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
                {this.state.dataChart.labels != null ?
                    <Chart type='doughnut' data={this.state.dataChart} /> : <CustomProgress type='spinner'/>
                }
            </Panel>
        );
    }
}
export default WilayaChart;
