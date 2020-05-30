import React, {Component} from "react";
import {Panel} from "primereact/panel";
import CovidService from "../service/CovidService";
import deathIcon from "../style/img/death-icon.png";
import {DataView} from "primereact/dataview";
import {CustomInputFilter} from "../component/CustomInputFilter";
import {CustomProgress} from "../component/CustomProgress";

class GridProvinces extends React.Component {

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
            let result = response.data.filter(function (item) {
                return item.fr !== 'National';
            });
            this.setState({wilayasCovid: result, wilayaFilter: result})
        }).catch(error => {
            console.log(error);
        });
    }



    itemTemplate = (item) => {
        return (
            <div className="p-col-3 card-country">
                {item != null &&
                <Panel header={item.fr+' '+item.ar} style={{textAlign: 'center'}}>
                    <div><i className="fa fa-certificate"/>&nbsp;Confirmed Cases : {item.confirmed}</div>
                    {/*<div><i className="fa fa-mars"/>&nbsp;Male : {item.males} &nbsp;<i className="fa fa-venus"/> &nbsp;Female : {item.females} </div>*/}
                    {/*<div><i className="fa fa-heartbeat"/>&nbsp;Recovered : {item.recovers}</div>*/}
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
            || wilaya.ar.toLowerCase().includes(event.target.value.toLowerCase())
            || wilaya.code.toString().toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({wilayasCovid: searchedWilayas});
    }


    render() {
        return (
            <div className="countries-grid-content">
                <br/>
                <div><strong className="title-covid-world">{this.props.title}</strong></div>
                <p/>

                <CustomInputFilter hint='Search province' onChange={this.handleSearch}/>

                {this.state.wilayasCovid != null ?
                    <DataView value={this.state.wilayasCovid}
                              itemTemplate={this.itemTemplate}
                              paginatorPosition={'both'} paginator={true}
                              layout={this.props.viewport == 'desktop' ? 'grid' : 'list'}
                              rows={16}>
                    </DataView>
                : <CustomProgress type='bar'/>}

                <br/>
            </div>
        );
    }
}

export default GridProvinces;
