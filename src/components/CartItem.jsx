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
    const {removeFromCart,state} = React.useContext(AppContext);
    const [quantity,setQuantity] = React.useState(state.quantitySelected.filter(quantity => quantity.id === item.id)[0]);
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
                <p>{quantity.selected === 1 ? `${quantity.selected} Unidad` : `${quantity.selected} Unidades`}</p>
                <span>${usePriceFormat(item.price * quantity.selected)}</span>
            </div>
        </motion.section>
     );
}
 
export default CartItem;