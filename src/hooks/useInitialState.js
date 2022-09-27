import React from 'react';
import congratsIcon from '@icons/validation.svg'

let Cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let QuantitySelected = localStorage.getItem('quantitySelected') ? JSON.parse(localStorage.getItem('quantitySelected')) : [];

const initialState = {
    signup: {
        validating: false,
        vEmail: {
            current: true,
            isValidating: false,
            validated: false,
            congrats:{
                image:congratsIcon,
                title:"Validamos tu e-mail",
                text:"Usaremos este e-mail si necesitas recuperar el acceso a tu cuenta y para informarte sobre temas de seguridad.",
                buttonText:"Continuar"
            },
            props: {
                title: "Ingresa tu e-mail",
                text: "Te enviaremos un mensaje para confirmarlo.",
                inputType: "email",
                inputName: "email",
                buttonText: "Enviar e-mail de confirmación",
                error: false,
                errorText: "Ya tienes una cuenta con este e-mail.",
                isSubmitted: false
            },
            validation_props: {
                title: "Ingresa el código que te enviamos por e-mail",
                email: null,
                text: "Si no lo encuentras revisa el correo no deseado.",
                inputType: "number",
                numOfInputs: [1, 2, 3, 4],
                inputName: "email-validation",
                buttonText: "Confirmar código",
                error: false,
                errorText: "El código es incorrecto.",
                validation_code: true,
                isSubmitted: false
            }
        },
        vUsername: {
            current: false,
            isValidating: false,
            validated: false
        },
        vPhone: {
            current: false,
            isValidating: false,
            validated: false
        },
        vPassword: {
            current: false,
            isValidating: false,
            validated: false
        },
    },
    cart: [], // Cart
    quantitySelected: [], // QuantitySelected
    favorites: [],
    quantity: [],
    total: 0,
    isLogged: false,
    userData: null
    // isLogged:true,
    // userData:{username:null}
}

const useInitialState = () => {
    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        !state.isLogged ?
            setState({
                ...state,
                cart: [],
                quantitySelected: []
            })
            :
            setState({
                ...state,
                cart: Cart,
                quantitySelected: QuantitySelected
            })
    }, [state.isLogged])
    const addEmail = (email) =>{
        setState({
            ...state,
            signup: {
                ...state.signup,
                vEmail: {
                    ...state.signup.vEmail,
                    validation_props: {
                        ...state.signup.vEmail.validation_props,
                        email:email
                    }
                }
            }
        })
    }
    const errorInSignUp = (bool, type = "email") => {
        type === "email" ?
            setState({
                ...state,
                signup: {
                    ...state.signup,
                    vEmail: {
                        ...state.signup.vEmail,
                        props: {
                            ...state.signup.vEmail.props,
                            error: bool,
                            isSubmitted: false
                        }
                    }
                }
            })
            :
            setState({
                ...state,
                signup: {
                    ...state.signup,
                    vEmail: {
                        ...state.signup.vEmail,
                        validation_props: {
                            ...state.signup.vEmail.validation_props,
                            error: bool,
                            isSubmitted: false
                        }
                    }
                }
            })
    }

    const isSubmitted = (bool, type = "email") => {
        type === "email" ?
            setState({
                ...state,
                signup: {
                    ...state.signup,
                    vEmail: {
                        ...state.signup.vEmail,
                        props: {
                            ...state.signup.vEmail.props,
                            isSubmitted: bool
                        }
                    }
                }
            })
            :
            setState({
                ...state,
                signup: {
                    ...state.signup,
                    vEmail: {
                        ...state.signup.vEmail,
                        validation_props: {
                            ...state.signup.vEmail.validation_props,
                            isSubmitted: bool
                        }
                    }
                }
            })
    }
    const isValidating = (bool,validated = false) => {
        setState({
            ...state,
            signup: {
                ...state.signup,
                validating: bool,
                vEmail: {
                    ...state.signup.vEmail,
                    isValidating: bool,
                    validated:validated
                }
            }
        })
    }

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

    const increaseOrDecreaseQuantity = (type, available, id) => { //testing function
        let quantitySelected = (state.quantitySelected.filter(q => q.id === id))[0].selected
        type === "+" ?
            (
                console.log("increase", quantitySelected),
                quantitySelected < available ?
                    (
                        console.log("available to increase"),
                        setState({
                            ...state,
                            quantitySelected: state.quantitySelected.map(quantity => (
                                quantity.id === id ? { id: id, selected: quantity.selected + 1 } : quantity
                            ))
                        })
                    ) : console.log("unavailable to increase")

            )
            :
            (
                console.log("decrease", quantitySelected),
                quantitySelected === 1 ?
                    console.log("unavailable to decrease")
                    :
                    (
                        console.log("available to decrease"),
                        setState({
                            ...state,
                            quantitySelected: state.quantitySelected.map(quantity => (
                                quantity.id === id ? { id: id, selected: quantity.selected - 1 } : quantity
                            ))
                        })
                    )
            )
    }

    const addToCart = (product, quantity = 1, available_quantity = product.available_quantity) => {
        setState({
            ...state,
            cart: !((state.cart).includes(product)) ?
                (localStorage.setItem('cart', JSON.stringify([...state.cart, { ...product, available_quantity: available_quantity }])),
                    [...state.cart, { ...product, available_quantity: available_quantity }]) : [...state.cart],
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

    React.useEffect(() => {
        state.cart.length > 0 &
            setState({
                ...state,
                total: state.cart.map(product => (
                    state.quantitySelected.filter(q => (
                        product.id === q.id
                    ))[0].selected * product.price
                )).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
            })
    }, [state.quantitySelected, state.cart])


    React.useEffect(() => {
        state.quantitySelected.length > 0 && localStorage.setItem('quantitySelected', JSON.stringify(state.quantitySelected))
    }, [state.quantitySelected])

    const Auth = (isAuth, userData) => {
        setState({
            ...state,
            isLogged: isAuth,
            userData: isAuth ? { ...userData } : null
        })
    }

    return {
        state,
        addToCart,
        removeFromCart,
        quantitySelected,
        increaseOrDecreaseQuantity,
        Auth,
        isValidating,
        isSubmitted,
        errorInSignUp,
        addEmail
    }
}

export default useInitialState;