import React from "react";

const CustomCard = (props) => {
    return(
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 card-dashboard">
            <div className="info-box blue-bg subcard-dashboard">
                <span className='icon-card'>
                    <i className={props.icon}></i>
                    <img src={props.img} height={55}/>
                </span>

                <div className='contentCard'>
                    <strong className='countCard'>{props.count}</strong>
                    <div className='title'>{props.title}</div>
                </div>
            </div>
        </div>
    );
}
export {CustomCard}
