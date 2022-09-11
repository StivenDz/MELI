import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import {Carousel} from '@containers/Carousel';
import ProductList from '@containers/ProductList';
import PaymentMethodContainer from '@containers/PaymentMethodContainer';


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
                <ProductList/>
            </main>
        </>
     );
};
 
export default Home;