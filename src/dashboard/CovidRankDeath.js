import React, {Component} from "react";
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
        {header: 'Country Flag', field: 'flag'},
        {header: 'Country Name', field: 'country'},
        {header: 'Deaths Ratio %', field: 'deathPercent'}
    ]

    dealRankingData = (data) => {
        let result = [];
        data.map((item) => {
            var deathReport = (item.deaths / item.cases) * 100;
            result.push(
                {
                    rank: 0,
                    flag : <img src={item.countryInfo.flag} height={30} style={{borderRadius: 7}} alt="flag"/>,
                    country: item.country,
                    deathPercent: deathReport.toFixed(2)
                }
            );
            return deathReport;
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
        return (
            <div className='rank-container mb-5'>
                {this.state.data != null ?
                    <CustomDataTable title='Ranking of countries by rate of deaths'
                                     columns={this.columnsDataTable}
                                     row={30}
                                     data={this.dealRankingData(this.state.data)}/>
                    : <CustomProgress type='bar'/>
                }
            </div>
        );
    }
}

export default CovidRankDeath;