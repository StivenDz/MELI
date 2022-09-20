import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';
import { motion } from 'framer-motion';
import { usePriceFormat } from '@hooks/usePriceFormat';
import ProductRating from '@components/ProductRating';

const ProductItem = ({ props }) => {
    const { state, addToCart, removeFromCart } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState("fa-regular fa-heart");
    const [isAddedToCart, setIsAddedToCart] = React.useState(

        localStorage.getItem('cart') ? (JSON.stringify(state.cart)).includes(JSON.stringify(props)) : false
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

    const productUrl = `/product=${(props.title).replace(/[^a-zA-Z0-9 ]/g, "")}/${props.id}`;

    return (
        <motion.div className='productItem'>

            <FontAwesomeIcon
                className="favorite"
                icon={isFavorite}
                onClick={() => isFavoriteFunction()}
            />
            <Link to={productUrl}>
                <motion.img src={(props.thumbnail).replace('I.jpg', 'F.jpg')} alt="" />
            </Link>
            <motion.div className='content'>
                <Link to={productUrl}>
                    <motion.p>{props.title}</motion.p>
                </Link>
                <Link to={productUrl}>
                    <div>
                        <motion.span>$ {usePriceFormat(props.price)}</motion.span>
                        <ProductRating id={props.id} />
                    </div>
                </Link>

                {isAddedToCart && state.cart.includes(props) ?

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
                }
            </motion.div>
        </motion.div>
    );
}

export default ProductItem;