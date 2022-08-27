import React from 'react';
import {motion} from 'framer-motion';
/**
 * 
 * @param {object} item 
 * @returns {JSX.Element}
 */

const CartItem = ({item}) => {
    return ( 
        <motion.section className='cartItem'>
            <img src={item.img} alt={item.title} title={item.title} id={item.id} />
            <div>
                <h4>{item.name}</h4>
                <span>${item.price}</span>
            </div>
        </motion.section>
     );
}
 
export default CartItem;