import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { CustomProgress } from "../component/CustomProgress";
import { Panel } from "primereact/panel";
import CovidService from "../service/CovidService";


function CustomAnalyticChart(props) {
    const [cases, setCases] = useState(null);
    const [deaths, setDeaths] = useState(null);
    const [recovers, setRecovers] = useState(null);
    const [days, setDays] = useState(null);

    const dataChart = {
        labels: days,
        datasets: [{
            label: 'Cases',
            data: cases,
            backgroundColor: "#e50018",
            borderColor: "#e50018",
            fill: false,
        }, {
            label: 'Deaths',
            data: deaths,
            backgroundColor: "#0a0a0a",
            borderColor: "#0a0a0a",
            fill: false,
        }, {
            label: 'Recovers',
            data: recovers,
            backgroundColor: "#00ff00",
            borderColor: "#00ff00",
            fill: false,
        }]
    }


    useEffect(() => {
        //GET THE PIC VALUE FROM THE YAXES SET
        const getYAxesPicValue = (data) => {
            let pic;
            let temp = Object.entries(data).map(([k, v]) => {
                return v;
            });
            temp.forEach((item) => {
                if (item !== 0) {
                    pic = item;
                }
            });
            return pic;
        }
        
        const getYAxes = (data) => {
            //let result = Object.entries(data).map(( [k, v] ) => ({ [k]: v }));
            let result = Object.entries(data).map(([k, v]) => {
                return v !== 0 ? v : getYAxesPicValue(data);
            });
            result = result.filter(function (x) {
                return x !== undefined;
            });
            return result;
        }

        const getXAxes = (data) => {
            // let result = Object.entries(data).map(( [k, v] ) => (k));
            let result = Object.entries(data).map(([k, v]) => {
                return k;
            });
            result = result.filter(function (x) {
                return x !== undefined;
            });
            result.shift();
            return result;
        }


        const fetchData = async () => {
            CovidService.getHistoricalCovid(props.perimeter).then(response => {
                let customResponse = props.perimeter === 'Algeria' ? response.data.timeline : response.data;
                setCases(getYAxes(customResponse.cases));
                setDeaths(getYAxes(customResponse.deaths));
                setRecovers(getYAxes(customResponse.recovered));
                setDays(getXAxes(customResponse.cases));
            }).catch(error => {
                alert(error);
            });
        };
        fetchData();
    }, [props.perimeter]);

    return (
        <Panel header={props.title} className="chart-content">
            {cases?.length ? <Chart type="line" data={dataChart} /> : <CustomProgress type='spinner' />}
        </Panel>

    );
}

export { CustomAnalyticChart }