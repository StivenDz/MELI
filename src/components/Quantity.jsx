import React from 'react';

const Quantity = ({avilable,quantitySelected}) => {

    return ( 
        <section className='quantities'>
            {[1,2,3,4,5,6].map(num => (
                num === quantitySelected ?
                <div key={num} className='quantitySelected'>{num} {num > 1 ? "unidades" : "unidad"}</div>
                :
                <div key={num}>{num} {num > 1 ? "unidades" : "unidad"}</div>
            ))}
        </section>
     );
}
 
export default Quantity;