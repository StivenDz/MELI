import React from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateCode } from '@hooks/useNumCodeGenerator'
import { getSpecificUserByEmail } from '@service/firebase';

import AppContext from '@context/AppContext';
import Registration from '@components/Registration';

import logo from '@logos/nav_logo.png';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const SignUp = () => {
    const form = React.useRef(null);
    const navigate = useNavigate();
    const {codehashed} = useParams();
    const {state,isValidating,isSubmitted,errorInSignUp,addEmail} = React.useContext(AppContext);
    const [userData, setUserData] = React.useState({
        email: null,
        username: null,
        phone: null,
        password: null
    })
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        isSubmitted(true);
        let code = generateCode();
        const data = new FormData(form.current);
        getSpecificUserByEmail(data.get("email").toLowerCase())
            .then(res => {
                res ?
                    errorInSignUp(true)
                    :
                    axios.post("http://localhost:9001/api/v1/sendcode", {
                        email: data.get("email").toLowerCase(),
                        code: code
                    })
                        .then(res => {
                            bcrypt.hash(code,13,(err,hash)=>{
                                localStorage.setItem("c",hash);
                                setUserData({
                                    ...userData,
                                    email:data.get("email").toLowerCase()
                                })
                                isSubmitted(false);
                                navigate(`/signup/email-validation/${encodeURIComponent(hash.replaceAll(".",""))}`)
                            })
                        })
                        .catch(err => console.log(err))
                        })
            .catch(err => console.log("err executing getSpecificUserByEmail"));
    }

    React.useEffect(()=>{
        userData.email && addEmail(userData.email)
    },[userData.email])

    const handleSubmitEmailValidation = async (e) =>{
        e.preventDefault();
        isSubmitted(true,"emailValidation");
        const data = new FormData(form.current);
        let code = `${data.get("num1")}${data.get("num2")}${data.get("num3")}${data.get("num4")}`;
        setTimeout(()=>{
            bcrypt.compareSync(code,localStorage.getItem('c')) ?
                (isValidating(true,true),navigate("/signup/email-validation/validated=true"))
                :
                errorInSignUp(true,"emailValidation");
        },1500)
    }

    return (
        <>
            <header className='signUpLogin'>
                <Link to={'/'}>
                    <img src={logo} alt="" />
                </Link>
            </header>
            {codehashed && !state.signup.vEmail.validated && <div className="yellowBack"></div>}
            <main className='signUpMain'>

            
                <form ref={form} className={state.signup.validating ? "isValidating" : "formRegistration"} onSubmit={!codehashed ? handleSubmitEmail : handleSubmitEmailValidation}>
                {
                    !state.signup.validating && !codehashed &&
                    <>
                        <h1>Tus datos</h1>
                        <p>Valida tus datos para que nadie pueda ingresar o crear una cuenta a tu nombre.</p>

                        <section className={state.signup.vEmail.current ? "current" : "validateEmail"} >
                            <div>
                                <div>
                                    <FontAwesomeIcon icon="fa-regular fa-envelope" />
                                    {state.signup.vEmail.validated && <FontAwesomeIcon className='validatedIcon' icon="fa-solid fa-circle-check" />}
                                </div>
                                <section>
                                    <p>Validar e-mail</p>
                                    <span>Lo usarás para recuperar tu cuenta.</span>
                                </section>
                                {state.signup.vEmail.current &&
                                    <button onClick={()=>isValidating(true)}>
                                        Validar
                                    </button>}
                            </div>
                        </section>
                        <section className={state.signup.vUsername.current ? "current" : "validateName"} >
                            <div>
                                <div>
                                    <FontAwesomeIcon icon="fa-regular fa-id-badge" />
                                </div>
                                <section>
                                    <p>Completar nombre</p>
                                    <span>Elige cómo quieres que te llamemos.</span>
                                </section>
                                {state.signup.vUsername.current && <button>Validar</button>}
                            </div>
                        </section>
                        <section className={state.signup.vPhone.current ? "current" : "validatePhone"} >
                            <div>
                                <div>
                                    <FontAwesomeIcon icon="fa-solid fa-mobile-screen" />
                                </div>
                                <section>
                                    <p>Validar teléfono</p>
                                    <span>Servirá para ingresar a tu cuenta.</span>
                                </section>
                                {state.signup.vPhone.current && <button>Validar</button>}
                            </div>
                        </section>
                        <section className={state.signup.vPassword.current ? "current" : "validatePassword"} >
                            <div>
                                <div>
                                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                                </div>
                                <section>
                                    <p>Crear contraseña</p>
                                    <span>Servirá para ingresar a tu cuenta.</span>
                                </section>
                                {state.signup.vPassword.current && <button>Validar</button>}
                            </div>
                        </section>
                    </>
                }
                {state.signup.vEmail.isValidating && !codehashed && !state.signup.vEmail.validated && <Registration props={state.signup.vEmail.props} />}
                {state.signup.vEmail.isValidating && !state.signup.vEmail.validated && codehashed && <Registration props={{...state.signup.vEmail.validation_props,email:userData.email}} />}
                {state.signup.validating && state.signup.vEmail.validated && <Registration props={{...state.signup.vEmail.congrats,email:userData.email,validated:state.signup.vEmail.validated}} />}
                </form>
                

            </main>
        </>
    )
}

export default SignUp;