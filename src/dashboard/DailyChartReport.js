import React, { useEffect, useState } from 'react';
import { Chart } from "primereact/chart";
import { CustomProgress } from "../component/CustomProgress";
import { Panel } from "primereact/panel";
import CovidService from "../service/CovidService";

export default function DailyChartReport(props) {

    const [xAxes, setXAxes] = useState(null);
    const [yAxes, setYAxes] = useState(null);

    const dataChart = {
        labels: xAxes,
        datasets: [{
            label: props.label,
            data: yAxes,
            backgroundColor: props.color,
            fill: false,
            borderColor: props.color,
        }]
    }

    useEffect(() => {
        const fetchData = async () => {
            CovidService.getHistoricalCovid(props.country).then(response => {
                let customResponse = props.country == 'all' ? response.data : response.data.timeline;
                switch (props.type) {
                    case 'cases':
                        setXAxes(getDays(customResponse.cases));
                        setYAxes(getValues(customResponse.cases));
                        break;
                    case 'deaths':
                        setXAxes(getDays(customResponse.deaths));
                        setYAxes(getValues(customResponse.deaths));
                        break;
                    case 'recovered':
                        setXAxes(getDays(customResponse.recovered));
                        setYAxes(getValues(customResponse.recovered));
                        break;
                }

            }).catch(error => {
                console.log(error);
            });
        };
        fetchData();
    }, []);

    let getDays = (data) => {
        let result = Object.entries(data).map(([k, v]) => {
            if (v !== 0) {
                return k;
            }
        });
        result = result.filter(function (x) {
            return x !== undefined;
        });
        return result;
    };

    let getValues = (data) => {
        let tempResult = Object.entries(data).map(([k, v]) => {
            if (v !== 0) {
                return v;
            }
        });
        tempResult = tempResult.filter(function (x) {
            return x !== undefined;
        });

        let result = [];
        let i = 0;
        while (i < tempResult.length) {
            if ((i - 1) > -1) {
                tempResult[i] - tempResult[i - 1] < 0 ? result.push(0) 
                :  result.push(tempResult[i] - tempResult[i - 1]);
            }
            i++;
        }

        return result;

    }

    return (
        <Panel header={props.title} className="chart-content">
            {yAxes?.length ? <Chart type='line' data={dataChart} />
                : <CustomProgress type="spinner" />}
        </Panel>
    );
}