import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';
import { motion } from 'framer-motion';
import { usePriceFormat } from '@hooks/usePriceFormat';
import ProductRating from '@components/ProductRating';

const ProductItem = ({ props,category }) => {
    const { state, addToCart, removeFromCart } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState("fa-regular fa-heart");
    const [isAddedToCart, setIsAddedToCart] = React.useState(
        (state.cart).filter(item => item.id === props.id).length === 0 ? false : true
        // localStorage.getItem('cart') ? (JSON.stringify(state.cart)).includes(JSON.stringify(props)) : false
    );

    const isFavoriteFunction = () => {
        (isFavorite == "fa-regular fa-heart") ?
            setIsFavorite("fa-solid fa-heart")
            :
            setIsFavorite("fa-regular fa-heart")
    }

    const handleAddOrRemoveFromCart = (type, product) => {
        type === 'remove' ?
            (
                removeFromCart(product),
                setIsAddedToCart(false)
            )
            :
            (
                addToCart(product),
                setIsAddedToCart(true)
            )
    }

    React.useEffect(()=>{
        setIsAddedToCart((state.cart).filter(item => item.id === props.id).length === 0 ? false : true);
    },[state.cart])

    const productUrl = `/product=${(props.title).replace(/[^a-zA-Z0-9 ]/g, "")}/aq=${props.available_quantity}/c=${category}/${props.id}`;

    return (
        <motion.div className='productItem'>

            <FontAwesomeIcon
                className="favorite"
                icon={isFavorite}
                onClick={() => isFavoriteFunction()}
            />
            <Link to={productUrl}>
                <motion.img src={(props.thumbnail).replace('I.jpg', 'F.jpg')} title={props.title} alt={props.title} />
            </Link>
            <motion.div className='content'>
                <Link to={productUrl}>
                    <motion.p>{props.title}</motion.p>
                </Link>
                <Link to={productUrl}>
                    {props?.original_price && <figure className='old_price'>$ {usePriceFormat(props.original_price)}</figure>}
                    <div>
                        <motion.span>$ {usePriceFormat(props.price)} {props?.original_price && <p>{100 - (props.price * 100 / props.original_price).toFixed()} % OFF</p>}</motion.span>
                        <ProductRating id={props.id} />
                    </div>
                    <span>
                        {props?.installments && `en ${props.installments.quantity}x  $ ${usePriceFormat(props.installments.amount)}`}
                    </span>
                    {props?.shipping.free_shipping &&
                        <p className='shipping'>Envío gratis
                        {props.shipping.logistic_type === "fulfillment" && <span><FontAwesomeIcon icon="fa-solid fa-bolt"/>FULL</span>}
                    </p>}
                </Link>
                {/* {isAddedToCart ?

                    <motion.button
                        className='removeFromCart'
                        onClick={() => { handleAddOrRemoveFromCart("remove", props) }}
                    >
                        Eliminar del carrito
                    </motion.button>
                    :
                    <motion.button
                        className='addToCart'
                        onClick={() => { handleAddOrRemoveFromCart("add", props) }}
                    >
                        Agregar al carrito
                    </motion.button>
                } */}
            </motion.div>
        </motion.div>
    );
}

export default ProductItem;