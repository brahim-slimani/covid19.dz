import React from "react";
import {CustomProgress} from "./CustomProgress";

const CustomCard = (props) => {
    return(
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 card-dashboard" style={{color:props.color}}>
            <div className="info-box blue-bg subcard-dashboard">
                <span className='icon-card'>
                    <i className={props.icon}></i>
                    <img src={props.img} height={55}/>
                </span>

                <div className='contentCard'>
                    <div style={{display:'inline-flex'}}>
                        {props.count != null ? <strong className='countCard'>{props.count}</strong> : <CustomProgress type="spinner"/>}
                        {props.todayReport != 0 && props.todayReport != null && <span className="new-situation-span" style={{color:props.color}}>+({props.todayReport})</span>}
                    </div>

                    <div className='title'>{props.title}</div>
                </div>
            </div>
        </div>
    );
}
export {CustomCard}
