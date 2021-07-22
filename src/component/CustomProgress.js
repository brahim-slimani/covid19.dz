import React from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import {ProgressBar} from "primereact/progressbar";

function CustomProgress(props) {
    return (
        <div>
            {props.type === 'spinner' ?
                <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="7"
                                 animationDuration=".5s"/> : <ProgressBar mode="indeterminate" style={{height: '4px'}}/>
            }
        </div>
    );
}

export {CustomProgress}
