import React from 'react';
import CartList from '@components/CartList';
import { motion } from 'framer-motion';

/**
 * 
 * @param {Array<object>} products
 * @param {boolean} showOrHideContainer 
 * @returns {JSX.Element}
 */
const CartContainer = ({showOrHideContainer}) => {
    return ( 
        <motion.section
            className='cartContainer'
            animate={{
                opacity : showOrHideContainer ? 1 : 0,
                pointerEvents: showOrHideContainer ? 'all' : 'none'
            
            }}
            transition={{delay : !showOrHideContainer && 1, duration : 1}}
         >
            
            {showOrHideContainer ? 
            <CartList showOrHideList={showOrHideContainer}/> 
             : 
             <CartList showOrHideList={showOrHideContainer}/>
            }
        </motion.section>
     );
}
 
export default CartContainer;