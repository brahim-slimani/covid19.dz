import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import deathIcon from "../style/img/death-icon.png";
import worldIcon from "../style/img/world-icon.png";
import {DataView} from "primereact/dataview";

class CustomGridCountries extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            countriesCovid: [],
            widthScreen: 0,
        }

    }


    componentDidMount() {
        CovidService.getCountriesCovid().then(response => {
            this.setState({countriesCovid:response.data})
        }).catch(error =>{
            console.log(error);
        });
    }


    itemTemplate = (item, layout) => {
        if (layout === 'grid') {
            return (
                <div className={this.props.viewport == "desktop" ? "p-col-3 card-country" : "p-col-12 card-country"}>
                    <Panel header={item.country} style={{textAlign: 'center'}}>
                        {item.country == 'World' ? <img src={worldIcon} height={30}/> : <img src={item.countryInfo.flag} height={30}/>}
                        <br/>
                        <div><i className="fa fa-certificate"/>&nbsp;Confirmed Cases : {item.cases}</div>
                        <div><i className="fa fa-heartbeat"/>&nbsp;Recovered : {item.recovered}</div>
                        <div><img src={deathIcon} height={15}/>&nbsp;Deaths : {item.deaths}</div>
                    </Panel>
                </div>
            );
        }

    }

    handleSearch = (event) => {
        let countries = this.state.countriesCovid;
        let searchedCountries = countries.filter(country =>
            country.country.includes(event.target.value));
        console.log(searchedCountries);
        this.setState({countriesCovid:searchedCountries});
    }


    render() {
        return(
            <div className="countries-grid-content">
                <br/>
                <div><strong className="title-covid-world">{this.props.title}</strong></div>
                <p/>

                <input type="text" name="search"
                       id="search-country" className="form-control"
                       onChange={this.handleSearch} placeholder="&#xF002; Filter Countries"/>

                <DataView value={this.state.countriesCovid} layout='grid'
                          itemTemplate={this.itemTemplate}
                          paginatorPosition={'both'} paginator={true}
                          row

                          >
                </DataView>
                <br/>
            </div>
        );
    }
}
export default CustomGridCountries;
