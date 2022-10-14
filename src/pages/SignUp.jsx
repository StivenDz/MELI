import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateCode } from '@hooks/useNumCodeGenerator'
import { getSpecificUserByEmail, insertNewUser } from '@service/firebase';
import { useCapitalize } from '@hooks/useCapitalize';

import AppContext from '@context/AppContext';
import EmailValidation from '@components/SignUp/EmailValidation';
import UsernameValidation from '@components/SignUp/UsernameValidation';
import PhoneValidation from '@components/SignUp/PhoneValidation';
import PasswordValidation from '@components/SignUp/PasswordValidation';
import Congrats from '@components/SignUp/Congrats';

import logo from '@logos/nav_logo.png';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const SignUp = () => {
    const form = React.useRef(null);
    const navigate = useNavigate();
    const { codehashed } = useParams();
    const { state, isValidating, isSubmitted, errorInSignUp, addEmail, addUsername, addPhone, addPassword, Auth } = React.useContext(AppContext);
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
        //console.log(code); //testing
        const data = new FormData(form.current);
        getSpecificUserByEmail(data.get("email").toLowerCase())
            .then(res => {
                res ?
                    errorInSignUp(true)
                    :
                    axios.post("https://mercado-libre-server.vercel.app/api/v1/sendcode", {
                        email: data.get("email").toLowerCase(),
                        code: code
                    })
                        .then(res => {
                            bcrypt.hash(code, 13, (err, hash) => {
                                localStorage.setItem("c", hash);
                                setUserData({
                                    ...userData,
                                    email: data.get("email").toLowerCase()
                                })
                                isSubmitted(false);
                                navigate(`/signup/email-validation/${encodeURIComponent(hash.replaceAll(".", ""))}`)
                            })
                        })
                        .catch(err => console.log(err))
            })
            .catch(err => console.log("err executing getSpecificUserByEmail"));
    }

    React.useEffect(() => {
        userData.email && addEmail(userData.email)
    }, [userData.email])

    const handleSubmitEmailValidation = async (e) => {
        e.preventDefault();
        isSubmitted(true, "emailValidation");
        const data = new FormData(form.current);
        let code = `${data.get("num1")}${data.get("num2")}${data.get("num3")}${data.get("num4")}`;
        setTimeout(() => {
            bcrypt.compareSync(code, localStorage.getItem('c')) ?
                (isValidating(true, true), navigate("/signup/email-validation/validated=true"))
                :
                errorInSignUp(true, "emailValidation");
        }, 1500)
    }
    const handleSubmitUsername = (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        let name = useCapitalize(data.get("name").trim());
        let lastname = useCapitalize(data.get("lastname").trim());
        setUserData({
            ...userData,
            username: {
                name: name,
                lastname: lastname
            }
        });
        isValidating(true, true, "username");
        navigate("/signup/username-validation/validated=true")
    }
    React.useEffect(() => {
        userData.username && addUsername(userData.username);
    }, [userData.username])

    const handleSubmitPhone = (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        let phone_code = data.get('phone_code');
        let phone_number = data.get("phone");
        setUserData({
            ...userData,
            phone: `+${phone_code} ${phone_number}`
        })
        isValidating(true, true, "phone");
        navigate("/signup/phone-validation/validated=true");
    }

    React.useEffect(() => {
        userData.phone && addPhone(userData.phone);
    }, [userData.phone])

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        let pass = data.get('password');
        let passC = data.get("Cpassword");

        pass != passC ?
            errorInSignUp(true, "password")
            :
            bcrypt.hash(pass, 13, (err, hash) => {
                err ?
                    console.log("error hashing password")
                    :
                    setUserData({
                        ...userData,
                        password: hash
                    });
                isValidating(true, true, "password");
                navigate("/signup/password-validation/validated=true");
            })
    }
    React.useEffect(() => {
        userData.password && addPassword(userData.password)
    }, [userData.password])

    const createNewUser = async () => {
        await insertNewUser(userData);
        await axios.post("http://localhost:9001/api/v1/welcome", {
            email: userData.email,
            name: userData.username.name
        })
        Auth(true,{ ...userData, id: localStorage.getItem("uid") },false,[],[]);
        navigate("/signup/registered=true/congrats")
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


                {!state.signup.showCongratsView &&
                    <form ref={form}
                        className={
                            state.signup.vEmail.isValidating ?
                                "isValidating" : state.signup.vUsername.isValidating ?
                                "isValidatingUsername" : state.signup.vPhone.isValidating ?
                                "isValidatingPhone" : state.signup.vPassword.isValidating ?
                                "isValidatingPassword" :
                                "formRegistration"
                        }
                        onSubmit={
                            !codehashed && state.signup.vEmail.isValidating ?
                                handleSubmitEmail : codehashed ?
                                handleSubmitEmailValidation : state.signup.vUsername.isValidating ?
                                handleSubmitUsername : state.signup.vPhone.isValidating ?
                                handleSubmitPhone :
                                handleSubmitPassword
                        }>
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
                                            <p>{!state.signup.vEmail.validated ? "Validar e-mail" : "E-mail validado"}</p>
                                            <span>{!state.signup.vEmail.validated ? "Lo usarás para recuperar tu cuenta." : userData.email}</span>
                                        </section>
                                        {state.signup.vEmail.current &&
                                            <button type='button'
                                                onClick={() => {
                                                    isValidating(true);
                                                    navigate("/signup/email-validation")
                                                }}>
                                                Validar
                                            </button>}
                                    </div>
                                </section>
                                <section className={state.signup.vUsername.current ? "current" : "validateName"} >
                                    <div>
                                        <div>
                                            <FontAwesomeIcon icon="fa-regular fa-id-badge" />
                                            {state.signup.vUsername.validated && <FontAwesomeIcon className='validatedIcon' icon="fa-solid fa-circle-check" />}
                                        </div>
                                        <section>
                                            <p>{!state.signup.vUsername.validated ? "Completar nombre" : "Nombre completado"}</p>
                                            <span>{!state.signup.vUsername.validated ?
                                                "Elige cómo quieres que te llamemos." :
                                                userData.username.name + " " + userData.username.lastname}
                                            </span>
                                        </section>
                                        {state.signup.vUsername.current &&
                                            <button type='button'
                                                onClick={() => {
                                                    isValidating(true, false, "username");
                                                    navigate("/signup/username-validation")
                                                }}>Completar
                                            </button>}
                                    </div>
                                </section>
                                <section className={state.signup.vPhone.current ? "current" : "validatePhone"}>
                                    <div>
                                        <div>
                                            <FontAwesomeIcon icon="fa-solid fa-mobile-screen" />
                                            {state.signup.vPhone.validated && <FontAwesomeIcon className='validatedIcon' icon="fa-solid fa-circle-check" />}
                                        </div>
                                        <section>
                                            <p>{!state.signup.vPhone.validated ? "Validar teléfono" : "Teléfono validado"}</p>
                                            <span>{!state.signup.vPhone.validated ? "Servirá para ingresar a tu cuenta." : userData.phone}</span>
                                        </section>
                                        {state.signup.vPhone.current &&
                                            <button type='button'
                                                onClick={() => {
                                                    isValidating(true, false, "phone");
                                                    navigate("/signup/phone-validation")
                                                }}>Validar
                                            </button>}
                                    </div>
                                </section>
                                <section className={state.signup.vPassword.current ? "current" : "validatePassword"} >
                                    <div>
                                        <div>
                                            <FontAwesomeIcon icon="fa-solid fa-lock" />
                                            {state.signup.vPassword.validated && <FontAwesomeIcon className='validatedIcon' icon="fa-solid fa-circle-check" />}
                                        </div>
                                        <section>
                                            <p>{!state.signup.vPassword.validated ? "Crear contraseña" : "Contraseña creada"}</p>
                                            <span>{!state.signup.vPassword.validated ? "Servirá para ingresar a tu cuenta." : "************"}</span>
                                        </section>
                                        {state.signup.vPassword.current &&
                                            <button type='button'
                                                onClick={() => {
                                                    isValidating(true, false, "password");
                                                    navigate("/signup/password-validation")
                                                }}>Crear
                                            </button>}
                                    </div>
                                </section>
                                {state.signup.allValidated && <button type='button'
                                    onClick={() => {
                                        createNewUser()
                                    }}>Continuar</button>}
                            </>
                        }
                        {state.signup.vEmail.isValidating && !codehashed && !state.signup.vEmail.validated &&
                            <EmailValidation props={state.signup.vEmail.props}
                            />}
                        {state.signup.vEmail.isValidating && !state.signup.vEmail.validated && codehashed &&
                            <EmailValidation props={{
                                ...state.signup.vEmail.validation_props,
                                email: userData.email
                            }}
                            />}
                        {state.signup.vEmail.isValidating && state.signup.vEmail.validated &&
                            <EmailValidation props={{
                                ...state.signup.vEmail.congrats,
                                email: userData.email,
                                validated: state.signup.vEmail.validated
                            }}
                            />}

                        {state.signup.vUsername.isValidating && !state.signup.vUsername.validated &&
                            <UsernameValidation props={{
                                ...state.signup.vUsername.props,
                                validated: state.signup.vUsername.validated
                            }}
                            />}
                        {state.signup.vUsername.isValidating && state.signup.vUsername.validated &&
                            <UsernameValidation props={{
                                ...state.signup.vUsername.props,
                                validated: state.signup.vUsername.validated,
                                name: userData.username.name,
                                lastname: userData.username.lastname
                            }}
                            />}
                        {state.signup.vPhone.isValidating && !state.signup.vPhone.validated &&
                            <PhoneValidation props={{
                                ...state.signup.vPhone.props,
                                validated: state.signup.vPhone.validated
                            }} />
                        }
                        {state.signup.vPhone.isValidating && state.signup.vPhone.validated &&
                            <PhoneValidation props={{
                                ...state.signup.vPhone.props,
                                validated: state.signup.vPhone.validated,
                                phone: userData.phone
                            }} />
                        }
                        {state.signup.vPassword.isValidating && !state.signup.vPassword.validated &&
                            <PasswordValidation props={{
                                ...state.signup.vPassword.props,
                                validated: state.signup.vPassword.validated,
                                name: userData.username.name,
                                lastname: userData.username.lastname,
                                email: userData.email
                            }} />
                        }
                        {state.signup.vPassword.isValidating && state.signup.vPassword.validated &&
                            <PasswordValidation props={{
                                ...state.signup.vPassword.props,
                                validated: state.signup.vPassword.validated,
                                password: userData.password
                            }} />
                        }

                    </form>}
                {state.signup.showCongratsView && <Congrats name={userData.username.name} />}

            </main>
        </>
    )
}

export default SignUp;