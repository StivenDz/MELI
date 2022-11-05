import React from 'react';
import { Link } from 'react-router-dom';

const FooterInfoItem = ({props}) => {
    return ( 
        <div className='footerInfoItem'>
            <img src={props.img} alt="" />
            <h4>{props.title}</h4>
            <p>{props.content}</p>
            <Link to={"#"}>{props.link}</Link>
        </div>
     );
}
 
export default FooterInfoItem;