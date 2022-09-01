import React from 'react';
import CartItem from '@components/CartItem';
import { motion } from 'framer-motion';
import AppContext from '@context/AppContext';

/**
 * 
 * @param {Array<object>} listItems 
 * @param {boolean} showOrHideList 
 * @returns {JSX.Element}
 */
const CartList = ({showOrHideList}) => {
    const {state} = React.useContext(AppContext);
    return ( 
        <motion.aside 
            className='cartList'
            animate={{x: showOrHideList ? 0 : 400}}
            initial={{x: !showOrHideList && 400}}
            transition={{duration:.7}}
            >

            {state.cart.length > 0 ? state.cart.map((product) => (
                <CartItem item={product} key={product.id} />  
            ))
                :
                <div className="vacio">
                    <h2>Tu carrito está vacío</h2>
                    <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
                </div>
            }
        </motion.aside>
     );
}
 
export default CartList;