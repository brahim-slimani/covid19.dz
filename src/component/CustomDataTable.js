import React, {useState} from "react";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {CustomInputFilter} from "./CustomInputFilter";
import {Button} from "primereact/button";


function CustomDataTable (props) {

    const [filter, setFilter] = useState(null);

    let dynamicColumns = props.columns.map((col) => {
        return <Column sortable={col.field == 'flag' ? false : true} key={col.field} field={col.field} header={col.header} headerStyle={{overflowWrap:'break-word'}}/>;
    });

    const header =
        <div className="header-table">
            <div className="header-title-table"><>{props.title}</></div>
            <div className="input-group search-area  col-md-4" style={{marginLeft:'-15px'}}>
                <div className="p-inputgroup" style={{width:'100%'}}>
                    <Button icon="pi pi-search" className="form-control p-button-success icon-button" />
                    <InputText type="text" className="filter-inputtext" onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
                </div>

            </div>
        </div>;


    return(
        <DataTable value={props.data} responsive
                   header={header} globalFilter={filter}
                   paginator={true} rows={props.row} rowsPerPageOptions={[5,10,30,50]}
                   emptyMessage="No records found"
                   rowHover
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
            {dynamicColumns}
        </DataTable>
    );
}export default CustomDataTable;