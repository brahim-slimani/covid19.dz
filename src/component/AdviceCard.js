import React from 'react';
import maskIcon from '../assets/img/wearmask.png';
import handWash from '../assets/img/washhand.png';
import hashtag from '../assets/img/hashtag.png';
import stopsign from '../assets/img/stop.png';
import besafe from '../assets/img/safe.png';

export default function AdviseCard(props) {

    function closeModalAdvice() {
        document.getElementById('modal_advice').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('modal_advice').style.display = 'none';
        }, 1000);
        
    }

    return (
        <div className='advice-card' id='modal_advice'>
            <a class="close-btn" onClick={()=>closeModalAdvice()}>&times;</a>
            <div className='hashtag'>
                <img src={hashtag} height={30} />
                &nbsp;LET'S SAVE LIVES AND STOP THIS THREAT TOGETHER
            </div>
            <div className="advice-content">
                <span className="advice-avatar"><img src={maskIcon} className="icon-advice" /> <i>wear mask</i></span>
                <span className="advice-avatar"><img src={handWash} className="icon-advice" /> <i>wash hands</i></span>
                <span className="advice-avatar"><img src={stopsign} className="icon-advice" /> <i>stay home</i></span>
                <span className="advice-avatar"><img src={besafe} className="icon-advice" /> <i>be safe</i></span>
            </div>
        </div>
    );
}