import React from 'react';
import congratsIcon from '@icons/validation.svg';
import congratsUsernameIcon from '@icons/UsernameValidation.svg';
import congratsPhone from '@icons/PhoneValidation.svg';
import congratsPass from '@icons/PassValidation.svg';

let Cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let QuantitySelected = localStorage.getItem('quantitySelected') ? JSON.parse(localStorage.getItem('quantitySelected')) : [];

const initialState = {
    signup: {
        validating: false,
        allValidated:false,
        showCongratsView:false,
        vEmail: {
            current: true,
            isValidating: false,
            validated: false,
            congrats: {
                image: congratsIcon,
                title: "Validamos tu e-mail",
                text: "Usaremos este e-mail si necesitas recuperar el acceso a tu cuenta y para informarte sobre temas de seguridad.",
                buttonText: "Continuar"
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
            validated: false,
            props: {
                image: congratsUsernameIcon,
                title: "Elige cómo quieres que te llamemos",
                text: "Verán el nombre que elijas todas las personas que interactúen contigo en Mercado Libre y Mercado Pago.",
                buttonText: "Continuar",
                errorInput1: false,
                errorInput2: false,
                username: null
            },

        },
        vPhone: {
            current: false,
            isValidating: false,
            validated: false,
            props: {
                image: congratsPhone,
                error: false,
                phone: null,
                title: "Ingresa tu teléfono",
                text: "Te enviaremos un código por SMS para confirmarlo. Con este teléfono podrás entrar a tu cuenta.",
                text2: "Código de área + número.",
                buttonText: "Enviar código por SMS"
            }
        },
        vPassword: {
            current: false,
            isValidating: false,
            validated: false,
            props: {
                error: false,
                password: null,
                errorText:"Las contraseñas no coinciden",
                title:"Crea tu contraseña",
                text:"Ingresa una contraseña segura que no uses en otras plataformas.",
                buttonText:"Continuar",
                label1:"Ingresa tu contraseña",
                label2:"Confirma tu contraseña",
                v1:"Mínimo 8 caracteres con letras y números.",
                v2:"Mínimo 1 signo o símbolo como ?-!*$#.",
                v3:"No incluyas tu nombre o apellido.",
                v4:"Sin secuencias como 1234 o ABCD.",
                v5:"Sin caracteres repetidos consecutivos como aa.",
                v6:"Sin tu e-mail, ni “mercadolibre” o “mercadopago”.",
                v7:"No incluyas la fecha de hoy.",
                image:congratsPass
            }
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
    const addEmail = (email) => {
        setState({
            ...state,
            signup: {
                ...state.signup,
                vEmail: {
                    ...state.signup.vEmail,
                    validation_props: {
                        ...state.signup.vEmail.validation_props,
                        email: email
                    }
                }
            }
        })
    }
    const addUsername = (username) => {
        setState({
            ...state,
            signup: {
                ...state.signup,
                vUsername: {
                    ...state.signup.vUsername,
                    props: {
                        ...state.signup.vUsername.props,
                        username: username
                    }
                }
            }
        })
    }
    const addPhone = (phone) =>{
        setState({
            ...state,
            signup: {
                ...state.signup,
                vPhone: {
                    ...state.signup.vPhone,
                    props: {
                        ...state.signup.vPhone.props,
                        phone: phone
                    }
                }
            }
        })
    }
    const addPassword = (pass) =>{
        setState({
            ...state,
            signup: {
                ...state.signup,
                vPassword: {
                    ...state.signup.vPassword,
                    props: {
                        ...state.signup.vPassword.props,
                        password: pass
                    }
                }
            }
        })
    }
    const allValidated = (bool) =>{
        setState({
            ...state,
            signup:{
                ...state.signup,
                allValidated:bool,
                validating:false,

                vPassword:{
                    ...state.signup.vPassword,
                    validated:true,
                    isValidating:false,
                    current:false
                }
            }
        })
    }
    const errorInSignUp = (bool, type = "email", inputNum = 1) => {
        setState({
            ...state,
            signup: {
                ...state.signup,
                vEmail: {
                    ...state.signup.vEmail,
                    props: {
                        ...state.signup.vEmail.props,
                        error: type === "email" ? bool : false,
                        isSubmitted: false
                    },
                    validation_props: {
                        ...state.signup.vEmail.validation_props,
                        error: type === "emailValidation" ? bool : false,
                        isSubmitted: false
                    }
                },
                vUsername: {
                    ...state.signup.vUsername,
                    props: {
                        ...state.signup.vUsername.props,
                        errorInput1: (type === "username" && (inputNum === 1 || inputNum === 3)) ? bool : false,
                        errorInput2: (type === "username" && (inputNum === 2 || inputNum === 3)) ? bool : false
                    }
                },
                vPhone: {
                    ...state.signup.vPhone,
                    props: {
                        ...state.signup.vPhone.props,
                        error: type === "phone" ? bool : false
                    }
                },
                vPassword: {
                    ...state.signup.vPassword,
                    props: {
                        ...state.signup.vPassword.props,
                        error: type === "password" ? bool : false
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

    const current = (type = "username") => {
        setState({
            ...state,
            signup: {
                ...state.signup,
                validating: false,
                vEmail: {
                    ...state.signup.vEmail,
                    isValidating: false,
                    validated: true,
                    current: false
                },
                vUsername: {
                    ...state.signup.vUsername,
                    current: type === "username" ? true : false,
                    isValidating: (type === "phone" || type === "password") ? false : state.signup.vUsername.isValidating
                },
                vPhone: {
                    ...state.signup.vPhone,
                    current: type === "phone" ? true : false,
                    isValidating: (type === "password") ? false : state.signup.vPhone.isValidating
                },
                vPassword: {
                    ...state.signup.vPassword,
                    current: type === "password" ? true : false
                }
            }
        })
    }
    const isValidating = (bool, validated = false, type = "email") => {
        setState({
            ...state,
            signup: {
                ...state.signup,
                validating: bool,
                vEmail: {
                    ...state.signup.vEmail,
                    isValidating: type === "email" ? bool : false,
                    validated: type === "email" ? validated : true
                },
                vUsername: {
                    ...state.signup.vUsername,
                    isValidating: type === "username" ? bool : false,
                    validated: (type === "phone" || type === "password") ? true : (type === "email") ? false : validated
                },
                vPhone: {
                    ...state.signup.vPhone,
                    isValidating: type === "phone" ? bool : false,
                    validated: (type === "password") ? true : (type === "email" || type === "username") ? false : validated
                },
                vPassword: {
                    ...state.signup.vPassword,
                    isValidating: type === "password" ? bool : false,
                    validated: (type === "email" || type === "username" || type === "phone") ? false : validated
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
            userData: isAuth ? { ...userData } : null,
            signup:{
                ...state.signup,
                showCongratsView:true
            }
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
        addEmail,
        current,
        addUsername,
        addPhone,
        addPassword,
        allValidated
    }
}

export default useInitialState;