import React from 'react';
import img1 from "@icons/CreditCard.svg";
import img2 from "@icons/BoxGift.svg";
import img3 from "@icons/Security.svg";
import FooterInfoItem from '../components/FooterInfoItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterInfoContainer = () => {
    const items = [
        {
            img:img1,
            title:"Paga con tarjeta o en efectivo",
            content:"Con Mercado Pago, paga en cuotas y aprovecha la comodidad de financiación que te da tu banco, o hazlo con efectivo en puntos de pago. ¡Y siempre es seguro!",
            link:"Cómo pagar con Mercado Pago"
        },
        {
            img:img2,
            title:"Envío gratis desde $ 70.000",
            content:"Con solo estar registrado en Mercado Libre, tienes envíos gratis en miles de productos seleccionados.",
            link:"Conoce más sobre este beneficio"
        },
        {
            img:img3,
            title:"Seguridad, de principio a fin",
            content:"¿No te gusta? ¡Devuélvelo! En Mercado Libre, no hay nada que no puedas hacer, porque estás siempre protegido.",
            link:"Cómo te protegemos"
        }
    ]
    return ( 
        <section className='FooterInfoContainer'>
            <div>
                {items.map((item,i) => (
                    <FooterInfoItem
                        key={i}
                        props={item}
                    />
                ))}
            </div>
            <figure>
                <Link to={"#"}>Más información <FontAwesomeIcon icon="fa-solid fa-angle-right" /></Link>
            </figure>
        </section>
     );
}
 
export default FooterInfoContainer;