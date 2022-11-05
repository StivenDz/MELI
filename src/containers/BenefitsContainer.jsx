import React from 'react';
import BenefitsItem from '@components/BenefitsItem';
import { Link } from 'react-router-dom';

import img1Background from "@img/programs.jpg";
import img1 from "@img/disney_starPlus.jpg";

import img2Background from "@img/paramount.jpg";
import img2 from "@img/paramount-logo.png";

import img3Background from "@img/HBOMax.webp";
import img3 from "@img/logoSquare.png";

const BenefitsContainer = ({title = "Beneficios de Mercado Puntos"}) => {
    const benefits = [
        {
            img1:img1Background,
            img2:img1,
            text2:"Sin cargo con el nivel 6",
            text3:"Disney+ y Star+"
        },
        {
            img1:img2Background,
            img2:img2,
            text1:"7 DÍAS GRATIS",
            text2:"Hasta 50% OFF",
            text3:"Paramount+"
        },
        {
            img1:img3Background,
            img2:img3,
            text1:"7 DÍAS GRATIS",
            text2:"Hasta 50% OFF",
            text3:"HBO Max",
        }
    ]
    return ( 
        <section className='benefitsContainer'>
            <div>
                <h2>{title}</h2>
                <Link to={"#"}>Ver todos los beneficios</Link>
            </div>
            <section>
                {benefits.map((benefit,i) =>
                    <BenefitsItem
                    key={i}
                    props={benefit}
                    />
                )}
            </section>
        </section>
     );
}
 
export default BenefitsContainer;