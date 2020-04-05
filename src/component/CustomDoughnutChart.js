import React from "react";

import {Chart} from "primereact/chart";
import {CustomProgress} from "./CustomProgress";


function CustomDoughnutChart(props){
    const dataChart = {
        labels: props.labels,
        datasets: [{
            data: props.data,
            backgroundColor: [
                "#1ea04c",
                "#ed1d24"
            ],
        }],
    }

 return(
     <div>
         {props.data != null ? <Chart type='pie' data={dataChart} /> :
             <CustomProgress type="spinner"/>}
     </div>

 );
}
export {CustomDoughnutChart}
