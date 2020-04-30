import React, {useEffect, useState} from "react";
import {Chart} from "primereact/chart";
import {CustomProgress} from "../component/CustomProgress";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";


function CustomMesauresChart(props) {
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

    useEffect(() => {
        const fetchData = async () => {
            CovidService.getHistoricalCovid(props.perimeter).then(response => {
                let customResponse = props.perimeter == 'Algeria' ? response.data.timeline : response.data;
                setCases(getYAxes(customResponse.cases));
                setDeaths(getYAxes(customResponse.deaths));
                setRecovers(getYAxes(customResponse.recovered));
                setDays(getXAxes(customResponse.cases));
            }).catch(error => {
                console.log(error);
            });
        };
        fetchData();
    }, []);

    const getXAxes = (data) => {
        // let result = Object.entries(data).map(( [k, v] ) => (k));
        let result = Object.entries(data).map(([k, v]) => {
            if (v != 0) {
                return k;
            }
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });
        return result;
    }

    const getYAxes = (data) => {
        //let result = Object.entries(data).map(( [k, v] ) => ({ [k]: v }));
        let result = Object.entries(data).map(([k, v]) => {
            if (v != 0) {
                return v;
            }
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });

        return result;
    }


    return (
        <Panel header={props.title} className="chart-content">
            {cases?.length ? <Chart type="line" data={dataChart}/> : <CustomProgress type='spinner'/>}
        </Panel>

    );
}

export {CustomMesauresChart}