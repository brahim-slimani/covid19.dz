import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import deathIcon from "../style/img/death-icon.png";
import {DataView} from "primereact/dataview";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";

class GridWilayas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wilayasCovid: null,
            wilayaFilter: null,
            widthScreen: 0,
        }

    }


    componentDidMount() {
        CovidService.getWilayasCovid().then(response => {
            this.setState({wilayasCovid: response.data, wilayaFilter: response.data})
        }).catch(error => {
            console.log(error);
        });
    }

    getXAxes = (data) => {
        let result = Object.entries(data).map(( [k, v] ) => k);
        return result;
    }

    getYAxes = (data) => {
        let result = Object.entries(data).map(( [k, v] ) => v);
        return result;
    }


    itemTemplate = (item) => {
        return (
            <div className="p-col-3 card-country">
                {item != null &&
                <Panel header={item.fr+' '+item.ar} style={{textAlign: 'center'}}>
                    <div><i className="fa fa-certificate"/>&nbsp;Confirmed Cases : {item.confirmed}</div>
                    <div><i className="fa fa-mars"/>&nbsp;Male : {item.males} &nbsp;<i className="fa fa-venus"/> &nbsp;Female : {item.females} </div>
                    <div><i className="fa fa-heartbeat"/>&nbsp;Recovered : {item.recovers}</div>
                    <div><i className="fa fa-eye"/>&nbsp;New Cases :  {item.new_cases}</div>
                    <div><img src={deathIcon} height={15}/>&nbsp;Deaths : {item.deaths}</div>
                    {/*<div className="col-12 gender-report-content">*/}
                    {/*    <Accordion>*/}
                    {/*        <AccordionTab header="Gender report">*/}
                    {/*            <CustomDoughnutChart labels={['Male', 'Female']} data={[item.males, item.females]} />*/}
                    {/*        </AccordionTab>*/}
                    {/*    </Accordion>*/}
                    {/*</div>*/}
                </Panel>
                }
            </div>
        );
    }


    handleSearch = (event) => {
        let wilayas = this.state.wilayaFilter;
        let searchedWilayas = wilayas.filter(wilaya =>
            wilaya.fr.toLowerCase().includes(event.target.value.toLowerCase())
            || wilaya.ar.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({wilayasCovid: searchedWilayas});
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
                            <InputText placeholder="Search wilaya" onChange={this.handleSearch} className="filter-inputtext"/>
                        </div>
                    </div>
                </div>

                {this.state.wilayasCovid != null ?
                    <DataView value={this.state.wilayasCovid}
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

export default GridWilayas;
