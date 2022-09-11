import React from 'react';
import { Link } from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';
import { motion } from 'framer-motion';
import {usePriceFormat} from '@hooks/usePriceFormat';
import ProductRating from '@components/ProductRating';

const ProductItem = ({props}) => {
    const [isFavorite,setIsFavorite] = React.useState("fa-regular fa-heart");
    const [isAddedToCArt,setIsAddedToCArt] = React.useState(false);
    const {addToCart,removeFromCart,state} = React.useContext(AppContext);
    const isFavoriteFunction = () =>{
        if(isFavorite == "fa-regular fa-heart"){
            setIsFavorite("fa-solid fa-heart");
        }else{
            setIsFavorite("fa-regular fa-heart");
        }
    }
    const productUrl = `/product=${(props.title).replace(/[^a-zA-Z0-9 ]/g, "")}/${props.id}`;
    return ( 
        <motion.div className='productItem'>
            
            <FontAwesomeIcon
                className="favorite" 
                icon={isFavorite}
                onClick={()=> isFavoriteFunction()}
             />
            <Link to={productUrl}>
                <motion.img src={(props.thumbnail).replace('I.jpg','F.jpg')} alt="" />
            </Link>
            <motion.div className='content'>
                <Link to={productUrl}>
                    <motion.p>{props.title}</motion.p>
                </Link>
                <Link to={productUrl}>
                    <div>
                        <motion.span>$ {usePriceFormat(props.price)}</motion.span>
                        <ProductRating id={props.id}/>
                    </div>
                </Link>

                {!((state.cart).includes(props)) ? 
                    <button 
                        className='addToCart'
                        onClick={()=> {addToCart(props); setIsAddedToCArt(!isAddedToCArt)}}
                    >
                            Agregar al carrito
                    </button>
                    :
                    <button 
                        className='removeFromCart'
                        onClick={()=> {removeFromCart(props); setIsAddedToCArt(!isAddedToCArt)}}
                    >
                            Eliminar del carrito
                    </button>
                }
            </motion.div>
        </motion.div>
     );
}
 
export default ProductItem;