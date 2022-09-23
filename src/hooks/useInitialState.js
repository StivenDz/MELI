import React from 'react';

let Cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let QuantitySelected = localStorage.getItem('quantitySelected') ? JSON.parse(localStorage.getItem('quantitySelected')) : [];

const initialState = {
    cart: Cart,
    quantitySelected: QuantitySelected,
    favorites: [],
    quantity: [],
    total:0
}

const useInitialState = () => {
    const [state, setState] = React.useState(initialState);


    const quantitySelected = (productId, quantity) => {
        setState({
            ...state,
            quantity:
                !((state.quantity.filter(q => q.id === productId)).length > 0) ?
                    [
                        ...state.quantity,
                        {
                            id: productId,
                            quantitySelected: quantity
                        }
                    ]
                    :
                    state.quantity.map(selected => (
                        selected.id === productId ? { id: productId, quantitySelected: quantity } : selected
                    ))
        })
    }

    // localStorage.setItem('quantitySelected', JSON.stringify(state.quantity.map(selected => (
    //     selected.id === product.id ? [{ id: product.id, selected: quantity }] : [selected]
    // ))))

    const addToCart = (product, quantity = 1) => {
        setState({
            ...state,
            cart: !((state.cart).includes(product)) ?
                    (localStorage.setItem('cart', JSON.stringify([...state.cart, product])),
                    [...state.cart, product]) : [...state.cart],
            quantitySelected: 
                [...state.quantitySelected, { id: product.id, selected: quantity }]
        });
        localStorage.setItem('quantitySelected', JSON.stringify([...state.quantitySelected, {
            id: product.id,
            selected: quantity
        }]))
    }
    const removeFromCart = (product) => {
        setState({
            ...state,
            cart: state.cart.filter(prod => prod.id != product.id),
            quantity: state.quantity.filter(prod => prod.id != product.id),
            quantitySelected: state.quantitySelected.filter(prod => prod.id != product.id)
        })
        localStorage.setItem('cart', JSON.stringify(state.cart.filter(prod => prod.id != product.id)));
        localStorage.setItem('quantitySelected', JSON.stringify(state.quantitySelected.filter(prod => prod.id != product.id)))
    }

    React.useEffect(()=>{
        state.cart.length > 0 &
            setState({
                ...state,
                total: state.cart.map(product => (
                    state.quantitySelected.filter(q => (
                        product.id === q.id
                    ))[0].selected * product.price
                )).reduce((previousValue, currentValue) => previousValue + currentValue,0)
            })
    },[state.cart])

    return {
        state,
        addToCart,
        removeFromCart,
        quantitySelected
    }
}

export default useInitialState;