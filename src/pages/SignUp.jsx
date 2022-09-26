import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@logos/nav_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Registration from '@components/Registration';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const SignUp = () => {
    const form = React.useRef(null)
    const [isValidating, setIsValidating] = React.useState({
        validating: false,
        vEmail: {
            current: true,
            isValidating:false,
            validated:false,
            props:{
                title:"e-mail",
                text:"Te enviaremos un mensaje para confirmarlo.",
                inputType:"email",
                inputName:"email",
                buttonText:"Enviar e-mail de confirmación"
            }
        },
        vUsername: {
            current: false,
            isValidating:false,
            validated:false
        },
        vPhone: {
            current: false,
            isValidating:false,
            validated:false
        },
        vPassword: {
            current: false,
            isValidating:false,
            validated:false
        }
    })
    const [userData, setUserData] = React.useState({
        email: null,
        username: null,
        phone: null,
        password: null
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        let email = e.target.email.value;
        bcrypt.hash(email, 13, (err, hash)=> {
            console.log(hash);
            console.log(bcrypt.compareSync(email,hash))
        });
        // axios.post("http://localhost:9001",{
        //     email:email
        // })
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))
    }
    return (
        <>
            <header className='signUpLogin'>
                <Link to={'/'}>
                    <img src={logo} alt="" />
                </Link>
            </header>
            <main className='signUpMain'>

                <form ref={form} className={isValidating.validating ? "isValidating" : "formRegistration"}  onSubmit={handleSubmit}>
                    {
                        !isValidating.validating &&
                        <>
                            <h1>Tus datos</h1>
                            <p>Valida tus datos para que nadie pueda ingresar o crear una cuenta a tu nombre.</p>

                            <section className={isValidating.vEmail.current ? "current" : "validateEmail"} >
                                <div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-regular fa-envelope" />
                                    </div>
                                    <section>
                                        <p>Validar e-mail</p>
                                        <span>Lo usarás para recuperar tu cuenta.</span>
                                    </section>
                                    {isValidating.vEmail.current && 
                                        <button onClick={()=> setIsValidating(
                                                {
                                                    ...isValidating,
                                                    validating:true,
                                                    vEmail:{...isValidating.vEmail,isValidating:true}
                                                })
                                            }>
                                            Validar
                                        </button>}
                                </div>
                            </section>
                            <section className={isValidating.vUsername.current ? "current" : "validateName"} >
                                <div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-regular fa-id-badge" />
                                    </div>
                                    <section>
                                        <p>Completar nombre</p>
                                        <span>Elige cómo quieres que te llamemos.</span>
                                    </section>
                                    {isValidating.vUsername.current && <button>Validar</button>}
                                </div>
                            </section>
                            <section className={isValidating.vPhone.current ? "current" : "validatePhone"} >
                                <div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-mobile-screen" />
                                    </div>
                                    <section>
                                        <p>Validar teléfono</p>
                                        <span>Servirá para ingresar a tu cuenta.</span>
                                    </section>
                                    {isValidating.vPhone.current && <button>Validar</button>}
                                </div>
                            </section>
                            <section className={isValidating.vPassword.current ? "current" : "validatePassword"} >
                                <div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                                    </div>
                                    <section>
                                        <p>Crear contraseña</p>
                                        <span>Servirá para ingresar a tu cuenta.</span>
                                    </section>
                                    {isValidating.vPassword.current && <button>Validar</button>}
                                </div>
                            </section>
                        </>
                    }
                    {isValidating.vEmail.isValidating && <Registration props={isValidating.vEmail.props} />}
                </form>

            </main>
        </>
    )
}

export default SignUp;