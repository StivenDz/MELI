import React from 'react';
import logo from '@logos/nav_logo.png';
import iconNotFound from '@icons/notFound.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
    document.title = "Not Found - Error 404 | Mercado Libre";
    return ( 
        <>
            <header className='notFoundNav'>
                <Link to={'/'}>
                    <img src={logo} alt="" />
                </Link>
            </header>
            <main className='notFoundMain'>
                <img src={iconNotFound} alt="" />
                <h4>Parece que esta página no existe</h4>
                <Link to={'/'}>Ir a la página principal</Link>
            </main>
        </>
     );
}
 
export default NotFound;