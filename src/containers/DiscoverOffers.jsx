import React from 'react';
import img1 from "@img/gamesOffers.webp";
import img2 from "@img/gamesOffers2.webp";
import img3 from "@img/camera.webp";
import img4 from "@img/phones.webp";
import DiscoverOfferItem from '../components/DiscoverOfferItem';

const DiscoverOffers = ({change=false}) => {
    const offers = [
        {
            img:!change ? img1 : img3,
            txt1:!change ? "PREPARA TUS REGALOS " : "Captura momentos",
            txt2:!change ? "JUGUETES Y MÁS":"CÁMARAS Y DRONES",
            txt3:!change ? "HASTA 40% OFF" :"HASTA 40% OFF"
        },
        {
            img:!change ? img2 : img4,
            txt1:!change ? "MUNDO GAMING":"LO MEJOR EN",
            txt2:!change ? "CONSOLAS Y MÁS":"CELULARES Y MÁS",
            txt3:!change ? "HASTA 25% OFF":"HASTA 30% OFF"
        }
    ]
    return ( 
        <section className='discoverOffersContainer'>
            <div>
                <h2>Descubre</h2>
            </div>
            <section>
                {offers.map((offer,i) => (
                    <DiscoverOfferItem key={i} props={offer}/>
                ))}
            </section>
        </section>
     );
}
 
export default DiscoverOffers;