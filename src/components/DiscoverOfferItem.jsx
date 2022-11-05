import React from 'react';

const DiscoverOfferItem = ({props}) => {
    return ( 
        <div className='discoverOfferItem'>
            <section>
                <span>{props.txt1}</span>
                <p>{props.txt2}</p>
                <p>{props.txt3}</p>
                <button>Ver más</button>
            </section>
            <img src={props.img} alt="" />
        </div>
     );
}
 
export default DiscoverOfferItem;