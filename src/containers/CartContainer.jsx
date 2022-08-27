import React from 'react';
import CartList from '@components/CartList';
import { motion } from 'framer-motion';

/**
 * 
 * @param {Array<object>} products
 * @param {boolean} showOrHideContainer 
 * @returns {JSX.Element}
 */
const CartContainer = ({products,showOrHideContainer}) => {
    return ( 
        <motion.section
            className='cartContainer'
            animate={{opacity : showOrHideContainer ? 1 : 0}}
            transition={{delay : !showOrHideContainer && 1, duration : 1}}
         >
            
            {showOrHideContainer ? 
            <CartList listItems={products} showOrHideList={showOrHideContainer}/> 
             : 
             <CartList listItems={products} showOrHideList={showOrHideContainer}/>
            }
        </motion.section>
     );
}
 
export default CartContainer;