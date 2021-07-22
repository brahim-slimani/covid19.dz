import React from "react";
import { Panel } from "primereact/panel";
import CovidService from "../service/CovidService";
import { Chart } from "primereact/chart";
import { CustomProgress } from "../component/CustomProgress";

class CovidDoughnutChart extends React.Component {

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


    getXAxes = () => {
        let axes;
        switch (this.props.type) {
            case 'global':
                axes = ['active cases', 'deaths', 'recovered'];
                break;
            case 'today':
                axes = ['new cases', 'deaths', 'recovered'];
                break;
            default: break;
        }
        return axes;
    }

    getYAxes = (data) => {
        let axes;
        switch (this.props.type) {
            case 'global':
                axes = [data.active, data.deaths, data.recovered];
                break;
            case 'today':
                axes = [data.todayCases, data.todayDeaths, data.todayRecovered];
                break;
            default: break;
        }
        return axes;
    }


    componentDidMount() {
        if (this.props.perimeter === 'world') {
            CovidService.getWorldCovid().then(response => {
                this.setState(prevState => ({
                    dataChart: {
                        ...prevState.dataChart,
                        labels: this.getXAxes(),
                        datasets: [{
                            data: this.getYAxes(response.data),
                            backgroundColor: [
                                "#ed1d24",
                                "#000000",
                                "#00ff00"
                            ],
                        }],
                    }
                }));
            }).catch(error => {
                console.log(error);
            });
        } else {
            CovidService.getCountryCovid('Algeria').then(response => {
                this.setState(prevState => ({
                    dataChart: {
                        ...prevState.dataChart,
                        labels: this.getXAxes(),
                        datasets: [{
                            data: this.getYAxes(response.data),
                            backgroundColor: [
                                "#ed1d24",
                                "#000000",
                                "#00ff00"
                            ],
                        }],
                    }
                }));
            }).catch(error => {
                console.log(error);
            });
        }
    }


    render() {
        const options = {
            legend: {
                position: 'right'
            },
            responsive: true,
        };
        return (
            <Panel header={this.props.title} className="chart-content">
                {this.state.dataChart.labels != null ?
                    <Chart type='doughnut' data={this.state.dataChart} options={options} /> : <CustomProgress type='spinner' />
                }
            </Panel>
        );
    }
}
export default CovidDoughnutChart;
