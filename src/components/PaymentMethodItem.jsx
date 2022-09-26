import React from 'react';
import { Link } from 'react-router-dom';

const PaymentMethodItem = ({props}) => {
    return ( 
        <div className='paymentMehotdItem'>
            <img src={props.img} alt="" />
            <div>
                <p>{props.text}</p>
                <Link to={props.link}>Ver más</Link>
            </div>
        </div>
     );
}
 
export default PaymentMethodItem;