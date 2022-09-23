import React from 'react';
import CartItem from '@components/CartItem';
import { motion } from 'framer-motion';
import AppContext from '@context/AppContext';

import { usePriceFormat } from '@hooks/usePriceFormat';
import { Link } from 'react-router-dom';
;

/**
 * 
 * @param {Array<object>} listItems 
 * @param {boolean} showOrHideList 
 * @returns {JSX.Element}
 */
const CartList = ({ showOrHideList }) => {
    const { state } = React.useContext(AppContext);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        let sum = 0;
        state.cart.map(product => (
            sum += product.price
        ));
        setTotal(sum);
    }, [state.cart]);

    return (
        <motion.aside
            className='cartList'
            animate={{ x: showOrHideList ? 0 : 400 }}
            initial={{ x: !showOrHideList && 400 }}
            transition={{ duration: .2 }}
        >

            {state.cart.length > 0 ?
                <>
                    {state.cart.map((product) => (
                        <CartItem item={product} key={product.id} />
                    ))}
                    <div className='total-checkout'>
                        <figure>
                            <p>Total </p>
                            <span>$ {usePriceFormat(state.total)}</span>
                        </figure>
                        <Link to="#">Continuar Compra</Link>
                    </div>
                </>
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