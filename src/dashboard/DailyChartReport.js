import React, {useEffect, useState} from 'react';
import {Chart} from "primereact/chart";
import {CustomProgress} from "../component/CustomProgress";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";

export default function DailyChartReport(props){

    const[xAxes, setXAxes] = useState(null);
    const[yAxes, setYAxes] = useState(null);

    const dataChart = {
        labels: xAxes,
        datasets: [{
            label: props.label,
            data: yAxes,
            backgroundColor: props.color,
        }]
    }

    useEffect(()=>{
        const fetchData = async () => {
            CovidService.getDailyReport(props.status).then(response => {
                setXAxes(getDays(response.data));
                setYAxes(getCases(response.data));
            }).catch(error =>{
               console.log(error);
            });
        };
        fetchData();
    }, []);

    let getDays = (data) => {
        var axes = [];
        data.map(object => {
            axes.push(object.Date.substr(0,9));
        });
        return axes;
    };

    let getCases = (data) => {
        var axes = [];
        data.map(object => {
           axes.push(object.Cases);
        });
        return axes;
    }

    return(
        <Panel header={props.title} className="chart-content">
            {yAxes?.length ? <Chart type='bar' data={dataChart} />
                : <CustomProgress type="spinner"/>}
        </Panel>
    );
}