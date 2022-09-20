import React from 'react';

let Cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
Cart == [] ? console.log("vacio") : console.log(Cart);

const initialState = {
    cart: Cart,
    favorites: []
}

const useInitialState = () =>{
    const [state,setState] = React.useState(initialState);

    const addToCart = (product) =>{
        setState({
            ...state,
            cart:!((state.cart).includes(product)) ? 
            (localStorage.setItem('cart',JSON.stringify([...state.cart,product])),
            [...state.cart, product]) : [...state.cart]
        })
    }
    const removeFromCart = (product) =>{
        setState({
            ...state,
            cart: state.cart.filter(prod => prod.id != product.id)
        })
        localStorage.setItem('cart',JSON.stringify(state.cart.filter(prod => prod.id != product.id)));
    }

    return {
        state,
        addToCart,
        removeFromCart
    }
}

export default useInitialState;