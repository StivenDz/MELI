import React from 'react';
import AppContext from '@context/AppContext';
import { usePriceFormat } from '@hooks/usePriceFormat';

const CartPageItem = ({product}) => {
    const {state,removeFromCart,increaseOrDecreaseQuantity} = React.useContext(AppContext);
    const [quantitySelected,setQuantitySelected] = React.useState(
        (state.quantitySelected.filter(q => q.id === product.id))[0].selected
    )

    React.useEffect(()=>{
        setQuantitySelected((state.quantitySelected.filter(q => q.id === product.id))[0].selected);
    },[state.quantitySelected])

    return (
        <section className='product' id={product.id}>
            <img src={product.thumbnail} title={product.title} alt={product.title} />
            <div className='titleAndOptions'>
                <h2>{product.title}</h2>
                <p>Envío gratis</p>
                <div className='productOptions'>
                    <button onClick={() => removeFromCart(product)}>Eliminar</button>
                    <p>Más productos del vendedor</p>
                    <p>Comprar ahora</p>
                    <p>Guardar para después</p>
                </div>
            </div>
            <section className='quantitySelectedAndAvailable'>
                <div className='quantitySelector'>
                    <button onClick={() => increaseOrDecreaseQuantity("-", product.available_quantity, product.id)}>-</button>
                    <input type="text" value={quantitySelected} readOnly />
                    <button onClick={() => increaseOrDecreaseQuantity("+", product.available_quantity, product.id)}>+</button>
                </div>
                <p>{product.available_quantity >= 100 ? "+99" : product.available_quantity} disponibles</p>
            </section>
            <span>
                $ {usePriceFormat((state.quantitySelected.filter(q => q.id === product.id))[0].selected * product.price)}
            </span>
        </section>
    );
}

export default CartPageItem;