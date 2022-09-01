import React from 'react';
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';
import { usePriceFormat } from '@hooks/usePriceFormat';
/**
 * 
 * @param {object} item 
 * @returns {JSX.Element}
 */

const CartItem = ({item}) => {
    const {removeFromCart} = React.useContext(AppContext);

    return ( 
        <motion.section className='cartItem'>
            <FontAwesomeIcon 
                className='deleteItem'
                icon="fa-solid fa-xmark"
                onClick={() => removeFromCart(item)}
             />
            <img src={(item.thumbnail).replace('I.jpg','F.jpg')} alt={item.title} title={item.title} id={item.id} />
            <div>
                <h4>{item.title}</h4>
                <span>${usePriceFormat(item.price)}</span>
            </div>
        </motion.section>
     );
}
 
export default CartItem;