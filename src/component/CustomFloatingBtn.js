import React from "react";
import FloatingButton, {Item} from "react-floating-button";
import deathIcon from "../assets/img/death-icon.png";

export const CustomFloatingBtn = (props) => {
    return(
        <div className="floating-btn">
            <FloatingButton top={true} right={false}>
                <Item imgSrc={deathIcon}
                      onClick={()=>{window.location.href= '#home'}}/>
                <Item imgSrc={deathIcon}
                      onClick={()=>{alert("salam")}}/>
                <Item imgSrc={deathIcon}
                      onClick={()=>{alert("salam")}}/>
            </FloatingButton>
        </div>

    );
}