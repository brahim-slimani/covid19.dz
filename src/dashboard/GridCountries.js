import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import deathIcon from "../style/img/death-icon.png";
import worldIcon from "../style/img/world-icon.png";
import {DataView} from "primereact/dataview";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";
import {CustomInputFilter} from "../component/CustomInputFilter";
import {CustomProgress} from "../component/CustomProgress";

class GridCountries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countriesCovid: null,
            countriesFilter: null,
            widthScreen: 0,
        }

    }

    sortedDataSet = (data) => {
        let result = data;
        result.sort(function (a,b) {
            return (b.cases - a.cases);
        });
        return result;
    }

    componentDidMount() {
        CovidService.getCountriesCovid().then(response => {
            this.setState({countriesCovid: response.data, countriesFilter: response.data});
            //this.sortDataSet(this.state.countriesCovid);
        }).catch(error => {
            console.log(error);
        });
    }


    itemTemplate = (item) => {
        return (
            <div className="p-col-3 card-country">
                {item != null &&
                <Panel header={item.country} style={{textAlign: 'center'}}>
                    {item.country == 'World' ? <img src={worldIcon} height={30}/> :
                        <img src={item.countryInfo.flag} height={30}/>}
                    <br/>
                    <div><i className="fa fa-certificate"/>&nbsp;Confirmed Cases : {item.cases}</div>
                    <div><i className="fa fa-heartbeat"/>&nbsp;Recovered : {item.recovered}</div>
                    <div><img src={deathIcon} height={15}/>&nbsp;Deaths : {item.deaths}</div>
                </Panel>
                }
            </div>
        );
    }


    handleSearch = (event) => {
        let countries = this.state.countriesFilter;
        let searchedCountries = countries.filter(country =>
            country.country.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({countriesCovid: searchedCountries});
    }


    render() {
        return (
            <div className="countries-grid-content">
                <br/>
                <div><strong className="title-covid-world">{this.props.title}</strong></div>

                <CustomInputFilter hint='Search country' onChange={this.handleSearch}/>

                {this.state.countriesCovid != null ?
                    <DataView value={this.sortedDataSet(this.state.countriesCovid)}
                              itemTemplate={this.itemTemplate}
                              paginatorPosition={'both'} paginator={true}
                              layout={this.props.viewport == 'desktop' ? 'grid' : 'list'}
                              rows={12}>
                    </DataView>
                : <CustomProgress type='bar'/>}

                <br/>
            </div>
        );
    }
}

export default GridCountries;
