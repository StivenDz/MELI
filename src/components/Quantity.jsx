import React from 'react';
import AppContext from '@context/AppContext';

const Quantity = ({avilable,quantity,productId}) => {
    const {state,quantitySelected} = React.useContext(AppContext);

    let available_quantity = [];
    for (let i = 1; i <= avilable; i++) {
        available_quantity.push(i);
    }

    return ( 
        <section className='quantities'>
            {avilable >= 6 ?
                [1,2,3,4,5,6].map(num => (
                    num === quantity ?
                    <div key={num} className='quantitySelected' onClick={()=> quantitySelected(productId,num)}>{num} {num > 1 ? "unidades" : "unidad"}</div>
                    :
                    <div key={num} onClick={()=> quantitySelected(productId,num)}> {num} {num > 1 ? "unidades" : "unidad"}</div>
                ))
                :
                available_quantity.map(num => (
                    num === quantity ?
                    <div key={num} className='quantitySelected' onClick={()=> quantitySelected(productId,num)}>{num} {num > 1 ? "unidades" : "unidad"}</div>
                    :
                    <div key={num} onClick={()=> quantitySelected(productId,num)}> {num} {num > 1 ? "unidades" : "unidad"}</div>
                ))
            }
        </section>
     );
}
 
export default Quantity;