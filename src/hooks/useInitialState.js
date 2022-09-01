import React from 'react';

const initialState = {
    cart:[],
    favorites: []
}

const useInitialState = () =>{
    const [state,setState] = React.useState(initialState);

    const addToCart = (product) =>{
        setState({
            ...state,
            cart:!((state.cart).includes(product)) ? [...state.cart, product] : [...state.cart]
        })
    }
    const removeFromCart = (product) =>{
        setState({
            ...state,
            cart: state.cart.filter(prod => prod.id != product.id)
        })
    }

    return {
        state,
        addToCart,
        removeFromCart
    }
}

export default useInitialState;