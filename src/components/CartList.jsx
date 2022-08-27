import React from 'react';
import CartItem from '@components/CartItem';
import { motion } from 'framer-motion';

/**
 * 
 * @param {Array<object>} listItems 
 * @param {boolean} showOrHideList 
 * @returns {JSX.Element}
 */
const CartList = ({listItems,showOrHideList}) => {
    return ( 
        <motion.aside 
            className='cartList'
            animate={{x: showOrHideList ? 0 : 400}}
            initial={{x: !showOrHideList && 400}}
            transition={{duration:.7}}
            >

            {listItems.map((product) => (
                <CartItem item={product} key={product.id} />  
            ))}
        </motion.aside>
     );
}
 
export default CartList;