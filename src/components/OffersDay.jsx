import React from 'react';
import offerImg from "@img/offersDay.jpg"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OffersDay = () => {
    return ( 
        <article className='offersDay'>
            <div>
                <img src={offerImg} alt="" />
                <section>
                    <div>
                        <span>OFERTAS DEL DÍA</span>
                        <p>APROVECHA LAS</p>
                        <p>MEJORES OFERTAS</p>
                    </div>
                    <Link to={"#"}>Ver más <FontAwesomeIcon icon="fa-solid fa-angle-right"/></Link>
                </section>
            </div>
        </article>
     );
}
 
export default OffersDay;