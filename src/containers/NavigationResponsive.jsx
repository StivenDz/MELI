import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logoResponsive from '@logos/nav_logo_responsive.png';

const navigationResponsive = () => {
    const [showBars,setShowBars] = React.useState(false);

    return ( 
        <header className='navigationResponsive'>
            <div>
                <Link to="/">
                    <img src={logoResponsive} alt="" />
                </Link>
                <section className='inputSection'>
                    <input type="text" placeholder="Estoy buscando..."/>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </section>
                <section className='icons'>
                    {!showBars ? 
                        <FontAwesomeIcon icon="fa-solid fa-bars" onClick={()=> setShowBars(!showBars)} />
                        :
                        <FontAwesomeIcon className='closeNav' icon="fa-solid fa-xmark" onClick={()=> setShowBars(!showBars)} />
                    }
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                </section>
            </div>
            <hr />
            <section className='shipments'>
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    <p>Enviar a Santa Marta</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
            </section>
        </header>
     );
}
 
export default navigationResponsive;

