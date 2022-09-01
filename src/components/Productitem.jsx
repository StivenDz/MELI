import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';
import { motion } from 'framer-motion';
import {usePriceFormat} from '@hooks/usePriceFormat';

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
    return ( 
        <motion.div className='productItem'>
            
            <FontAwesomeIcon
                className="favorite" 
                icon={isFavorite}
                onClick={()=> isFavoriteFunction()}
             />
            
            <motion.img src={(props.thumbnail).replace('I.jpg','F.jpg')} alt="" />
            <motion.div className='content'>
                <motion.p>{props.title}</motion.p>
                <motion.span>$ {usePriceFormat(props.price)}</motion.span>

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