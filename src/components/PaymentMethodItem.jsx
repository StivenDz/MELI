import React from 'react';

const PaymentMethodItem = ({props}) => {
    return ( 
        <div className='paymentMehotdItem'>
            <img src={props.img} alt="" />
            <div>
                <p>{props.text}</p>
                <a href={props.link}>Ver más</a>
            </div>
        </div>
     );
}
 
export default PaymentMethodItem;