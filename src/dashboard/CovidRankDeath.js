import React, {Component} from "react";
import {DataTable} from "primereact/datatable";
import CustomDataTable from "../component/CustomDataTable";
import CovidService from "../service/CovidService";
import {CustomProgress} from "../component/CustomProgress";

class CovidRankDeath extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    columnsDataTable = [
        {header: 'Rank', field: 'rank'},
        {header: 'Country Name', field: 'country'},
        {header: 'Deaths Percentage %', field: 'deathPercent'}
    ]

    dealRankingData = (data) => {
        let result = new Array();
        data.map((item) => {
            var deathReport = (item.deaths / item.cases) * 100;
            result.push(
                {rank: 0, country:<div style={{display:'inline-flex'}}><span style={{width:70}}><img src={item.countryInfo.flag} height={30}/></span><p>{item.country}</p> </div>, deathPercent: deathReport.toFixed(2)}
            );
        });

        result.sort(function (a, b) {
            return (b.deathPercent - a.deathPercent);
        });

        var i = 0;
        while (i < result.length) {
            result[i].rank = i + 1;
            i++;
        }
        return result;
    }

    componentDidMount() {
        CovidService.getCountriesCovid().then(response => {
            this.setState({data: response.data});
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        {
            console.log(this.state.data)
        }
        return (
            <div className='rank-container'>
                {this.state.data != null ?
                    <CustomDataTable title='Ranking of countries by percentage of deaths' columns={this.columnsDataTable}
                                     data={this.dealRankingData(this.state.data)}/>
                    : <CustomProgress type='bar'/>
                }
            </div>
        );
    }
}

export default CovidRankDeath;