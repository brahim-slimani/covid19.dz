import React from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";


function CustomInputFilter(props) {
    return(
        <div className="p-grid p-fluid" style={{justifyContent:'center'}}>
            <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                    <Button icon="pi pi-search" className="p-button-success icon-button" />
                    <InputText placeholder={props.hint} onChange={props.onChange} className="filter-inputtext"/>
                </div>
            </div>
        </div>
    );
}
export {CustomInputFilter}