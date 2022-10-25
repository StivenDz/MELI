import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import {Carousel} from '@containers/Carousel';
import PaymentMethodContainer from '@containers/PaymentMethodContainer';
import OffersContainer from '../containers/OffersContainer';
import ProductList from '@containers/ProductList';


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
                {/* <OffersContainer/> */}
                <ProductList/>
            </main>
        </>
     );
};
 
export default Home;