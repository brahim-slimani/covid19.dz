import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import deathIcon from "../style/img/death-icon.png";
import worldIcon from "../style/img/world-icon.png";
import {DataView} from "primereact/dataview";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";

class GridCountries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countriesCovid: null,
            countriesFilter: null,
            widthScreen: 0,
        }

    }


    componentDidMount() {
        CovidService.getCountriesCovid().then(response => {
            this.setState({countriesCovid: response.data, countriesFilter: response.data})
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
                <p/>

                <div className="p-grid p-fluid" style={{justifyContent:'center'}}>
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <Button icon="pi pi-search" className="p-button-success icon-button" />
                            <InputText placeholder="Search country" onChange={this.handleSearch} className="filter-inputtext"/>
                        </div>
                    </div>
                </div>

                {this.state.countriesCovid != null ?
                    <DataView value={this.state.countriesCovid}
                              itemTemplate={this.itemTemplate}
                              paginatorPosition={'both'} paginator={true}
                              layout={this.props.viewport == 'desktop' ? 'grid' : 'list'}
                              rows={12}>
                    </DataView>
                : <ProgressBar mode="indeterminate" style={{height: '6px'}}/>}

                <br/>
            </div>
        );
    }
}

export default GridCountries;
