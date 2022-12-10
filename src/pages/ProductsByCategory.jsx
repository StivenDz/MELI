import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import ProductList from '@containers/ProductList';
import { useParams } from 'react-router';

const ProductsByCategory = () => {
    let {categoryId,categoryName} = useParams();
    document.title = categoryName + " | Mercado Libre";
    window.scrollTo({
        top:"0",
        behavior:"smooth"
    })
    return ( 
        <>
            {window.innerWidth > 976 ?
                <Navigation/> 
                : 
                <NavigationResponsive/>
            }
            <main>
                <ProductList category={categoryId}/>
            </main>
        </>
     );
}
 
export default ProductsByCategory;