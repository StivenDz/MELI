import React from 'react';

let Cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let QuantitySelected = localStorage.getItem('quantitySelected') ? JSON.parse(localStorage.getItem('quantitySelected')) : [];

const initialState = {
    cart: Cart,
    quantitySelected: QuantitySelected,
    favorites: [],
    quantity: [],
    total:0,
    isLogged:true  //working on it
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

    const increaseOrDecreaseQuantity = (type,available,id) =>{ //testing function
        let quantitySelected = (state.quantitySelected.filter(q => q.id === id))[0].selected
        type === "+" ? 
            (
                console.log("increase",quantitySelected),
                quantitySelected < available ?
                 (
                    console.log("available to increase"),
                    setState({
                        ...state,
                        quantitySelected: state.quantitySelected.map(quantity => (
                            quantity.id === id ? {id:id,selected: quantity.selected + 1} : quantity
                        ))
                    })
                ) : console.log("unavailable to increase")

            )
            :
            (
                console.log("decrease",quantitySelected),
                quantitySelected === 1 ? 
                    console.log("unavailable to decrease")
                    :
                    (
                        console.log("available to decrease"),
                        setState({
                            ...state,
                            quantitySelected: state.quantitySelected.map(quantity => (
                                quantity.id === id ? {id:id,selected: quantity.selected - 1} : quantity
                            ))
                        })
                    )
            )
    }

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
    },[state.quantitySelected,state.cart ])


    React.useEffect(()=>{
        localStorage.setItem('quantitySelected', JSON.stringify(state.quantitySelected))
    },[state.quantitySelected])

    // const Auth = () =>{
    //     setState({
    //         ...state,
    //         isLogged:true
    //     })
    // }

    return {
        state,
        addToCart,
        removeFromCart,
        quantitySelected,
        increaseOrDecreaseQuantity
    }
}

export default useInitialState;