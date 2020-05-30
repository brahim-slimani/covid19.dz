import React, {useEffect, useState} from 'react';
import {Chart} from "primereact/chart";
import {CustomProgress} from "../component/CustomProgress";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";

export default function ComparativeChartReport(props){

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
            backgroundColor: "#1ea04c",
            borderColor: "#1ea04c",
            fill: false,
        }]
    }
    useEffect(()=>{
        const fetchData = async () => {
            CovidService.getTotalAlgeria().then(response => {
                setDays(getXAxes(response.data));
                setCases(getYAxes(response.data, 'confirm'));
                setDeaths(getYAxes(response.data, 'death'));
                setRecovers(getYAxes(response.data, 'recover'));
            }).catch(error =>{
               console.log(error);
            });
        };
        fetchData();
    }, []);

    let getXAxes = (data) => {
        var axes = [];
        data.map(object => {
            axes.push(object.Date.substr(0,10));
        });
        return axes;
    };

    let getYAxes = (data, status) => {
        var axes = [];
        data.map(object => {
            axes.push(status == 'confirm' ? object.Confirmed : status == 'death' ? object.Deaths : status == 'recover' && object.Recovered);
        });
        return axes;
    }

    return(
        <Panel header={props.title} className="chart-content">
            {cases?.length ? <Chart type='line' data={dataChart} />
                : <CustomProgress type="spinner"/>}
        </Panel>
    );
}