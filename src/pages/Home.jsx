import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import {Carousel} from '@containers/Carousel';
import PaymentMethodContainer from '@containers/PaymentMethodContainer';
import CarouselProductList from '../containers/CarouselProductList';
import LoyaltyContainer from '../containers/LoyaltyContainer';
import BenefitsContainer from '../containers/BenefitsContainer';
import OffersDay from '@components/OffersDay';
import DiscoverOffers from '@containers/DiscoverOffers';
import Footer from '@containers/Footer';

const Home =  () => {
    document.title = "Mercado Libre";
    return ( 
        <>
            {window.innerWidth > 976 ?
                <Navigation/> 
                : 
                <NavigationResponsive/>
            }
            <main>
                <Carousel/>
                <PaymentMethodContainer/>
                <CarouselProductList
                    title={"Relacionado con Computación"}    
                />
                <CarouselProductList
                    category='MCO1051'
                    title={"Relacionado con Celulares Y Teléfonos"}    
                />
                <LoyaltyContainer/>
                <BenefitsContainer/>
                <OffersDay/>
                <DiscoverOffers/>
                <CarouselProductList
                    category='MCO2931'
                    title={"Relacionado con Consolas"}    
                />
                <CarouselProductList
                    category='MCO1000'
                    title={"Relacionado con Electrónica, Audio y Video"}    
                />
                 <DiscoverOffers
                 change={true}
                  />
                <Footer/>
            </main>
        </>
     );
};
 
export default Home;