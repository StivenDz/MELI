import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '@logos/nav_logo.png';

const Login = () => {
    const year = new Date().getFullYear();
    return (
        <>
            <header className='navLogin'>
                <Link to={'/'}>
                    <img src={logo} alt="" />
                </Link>
            </header>
            <main className='loginMain'>
                <div className="backYellow"></div>
                <form action="" method="post">
                    <h1>¡Hola! Para seguir, ingresa tu teléfono, e‑mail o usuario</h1>
                    <p>Teléfono, e-mail o usuario</p>
                    <input type="email" name='email'/>
                    <button type="submit">Continuar</button>
                    <Link to="/signup">Crear cuenta</Link>
                </form>
                <Link className='problemToAccess' to="#">Necesito ayuda para ingresar</Link>
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