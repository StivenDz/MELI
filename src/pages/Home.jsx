import React from 'react';
import Navigation from '../containers/navigation';
import {Carousel} from '../containers/Carousel';
import ProductList from '../containers/ProductList';
import PaymentMethodContainer from '../containers/PaymentMethodContainer';


const Home =  () => {
    return ( 
        <>
            
            <Navigation/>
            <main>
                <Carousel/>
                <PaymentMethodContainer/>
                <ProductList/>
            </main>
        </>
     );
};
 
export default Home;