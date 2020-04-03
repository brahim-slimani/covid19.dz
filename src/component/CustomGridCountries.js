import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import {DataView} from "primereact/dataview";
import deathIcon from "../style/img/death-icon.png";

class CustomGridCountries extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            countriesCovid: null,
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
                        <img src={item.countryInfo.flag} height={30}/>
                        <br/>
                        <div><i className="fa fa-certificate"/>&nbsp;Confirmed Cases : {item.cases}</div>
                        <div><i className="fa fa-heartbeat"/>&nbsp;Recovered : {item.recovered}</div>
                        <div><img src={deathIcon} height={15}/>&nbsp;Deaths : {item.deaths}</div>
                    </Panel>
                </div>
            );
        }

    }

    render() {
        return(
            <div className="countries-grid-content">
                <br/>
                <div><strong className="title-covid-world">{this.props.title}</strong></div>
                <p/>
                <DataView value={this.state.countriesCovid} layout='grid'
                          itemTemplate={this.itemTemplate}
                          paginatorPosition={'both'} paginator={true}
                          rows={9}>
                </DataView>
                <br/>
            </div>
        );
    }
}
export default CustomGridCountries;
