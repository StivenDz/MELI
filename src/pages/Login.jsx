import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '@logos/nav_logo.png';

import { getSpecificUserByEmail, comparePasswords,getUser } from '@service/firebase';
import AppContext from '@context/AppContext';

const Login = () => {
    const { Auth } = React.useContext(AppContext);
    const navigate = useNavigate();
    const year = new Date().getFullYear();
    const form = React.useRef(null);
    const [availableToSearch, setAvailableToSearch] = React.useState(false);
    const [error, setError] = React.useState({
        emailErrorMsg: null,
        passwordErrorMsg: null
    })
    const [user, setUser] = React.useState({
        id: null,
        email: null,
        username: null
    });
    const errorInForm = (inputId, textId, emailOrPassword = "email", revertChanges = false) => {
        if (!revertChanges) {
            document.getElementById(inputId).classList.add('invalidInput');
            document.getElementById(textId).classList.add('invalidText');
            setError({
                emailErrorMsg: emailOrPassword === "email" ? "Revisa tu e-mail o usuario." : null,
                passwordErrorMsg: emailOrPassword === "pass" ? "Revisa tu contraseña." : null
            })
        } else {
            if (!error.emailErrorMsg && !error.passwordErrorMsg) return

            document.getElementById(inputId).classList.remove('invalidInput');
            document.getElementById(textId).classList.remove('invalidText');
            setError({
                emailErrorMsg: null,
                passwordErrorMsg: null
            })
        }
    }
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        e.target.emailButton.setAttribute("disabled", "true");
        setAvailableToSearch(true);
        document.getElementById('emailButton').classList.add('loadingBackground');

        const data = new FormData(form.current);
        getSpecificUserByEmail(data.get("email").toLowerCase())
            .then(res => {
                res ?
                    (setUser({
                        id: res.id,
                        email: res.email,
                        username: res.username
                    }),
                        setAvailableToSearch(false)
                    )
                    : (
                        setAvailableToSearch(false),
                        e.target.emailButton.removeAttribute("disabled"),
                        e.target.emailButton.removeAttribute("class"),
                        document.getElementById('emailButton').classList.remove('loadingBackground'),
                        errorInForm("email", "textEmail")
                    );
            })
            .catch(err => console.log("err executing getSpecificUserByEmail"));
    }
    const handleSumbitPassword = (e) => {
        e.preventDefault();

        e.target.passButton.setAttribute("disabled", "true");
        setAvailableToSearch(true);
        document.getElementById('passButton').classList.add('loadingBackground');

        const data = new FormData(form.current);
        comparePasswords(user.id, data.get("password"))
            .then(async (res) => {
                if (res) {
                    await getUser(user.id)
                        .then(async(res) =>{
                            let cart = await res?.cart ? res.cart : [];
                            let quantitySelected = await res?.quantitySelected ? res.quantitySelected : [];
                            localStorage.setItem('quantitySelected', JSON.stringify(quantitySelected));
                            localStorage.setItem('cart', JSON.stringify(cart));
                            Auth(res,user,true,cart,quantitySelected);
                        })
                    return navigate('/');
                }

                setAvailableToSearch(false);
                e.target.passButton.removeAttribute("disabled");
                e.target.passButton.removeAttribute("class");
                document.getElementById('passButton').classList.remove('loadingBackground');
                errorInForm("pass", "textPass", "pass");
            })
            .catch(err => console.log("err executing comparePasswords"))
    }

    const resetLogin = () =>{
        setUser({ ...user, email: null });
        setError({
            emailErrorMsg: null,
            passwordErrorMsg: null
        })
    }

    return (
        <>
            <header className='navLogin'>
                <Link to={'/'}>
                    <img src={logo} alt="" />
                </Link>
            </header>
            <main className='loginMain'>
                <div className="backYellow"></div>
                {user.email === null ?
                    <form ref={form} onSubmit={handleSubmitEmail}>
                        <h1>¡Hola! Para seguir, ingresa tu teléfono, e-mail o usuario</h1>
                        <p id='textEmail'>Teléfono, e-mail o usuario</p>
                        <input type="email" name='email' id='email' required onClick={() => errorInForm("email", "textEmail", "email", true)} />
                        {error.emailErrorMsg && <span><FontAwesomeIcon icon="fa-solid fa-circle-exclamation" /> {error.emailErrorMsg}</span>}
                        <button id='emailButton' name="emailButton" type="submit">
                            Continuar {availableToSearch && <FontAwesomeIcon icon="fa-solid fa-spinner" className='spinner' />}
                        </button>
                        <Link to="/signup">Crear cuenta</Link>
                    </form>
                    :
                    <form ref={form} onSubmit={handleSumbitPassword}>
                        <h1>Ahora, tu contraseña de Mercado Libre</h1>
                        <div>
                            <FontAwesomeIcon icon="fa-regular fa-user" />
                            <p>
                                {user.email}
                            </p>
                            <Link to={"/login"} onClick={resetLogin}>x</Link>
                        </div>
                        <p id='textPass'>Contraseña</p>
                        <input id='pass' type="password" name='password' required onClick={() => errorInForm("pass", "textPass", "pass", true)} />
                        {error.passwordErrorMsg && <span><FontAwesomeIcon icon="fa-solid fa-circle-exclamation" /> {error.passwordErrorMsg}</span>}
                        <button id='passButton' name='passButton' type="submit">
                            Ingresar {availableToSearch && <FontAwesomeIcon icon="fa-solid fa-spinner" className='spinner' />}
                        </button>
                        <Link to="/signup" className='forgotPassword'>¿Olvidaste tu contraseña?</Link>
                    </form>
                }
                {!user.email && <Link className='problemToAccess' to="#">Necesito ayuda para ingresar</Link>}
                <div className="report">
                    <span>Reportar un problema</span>
                    <section>
                        <div>
                            <FontAwesomeIcon icon="fa-solid fa-mobile-screen-button" />
                            <p>Robo o pérdida de teléfono</p>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                    </section>
                    <section>
                        <div>
                            <FontAwesomeIcon icon="fa-regular fa-user" />
                            <p>Robo de cuenta</p>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                    </section>
                </div>
            </main>
            <footer className='loginFooter'>
                <h4>Cómo cuidamos tu privacidad</h4>
                <p>Copyright © 1999-{year} MercadoLibre Colombia LTDA.</p>
            </footer>
        </>

    );
}

export default Login;