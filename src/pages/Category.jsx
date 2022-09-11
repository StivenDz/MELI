import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import ProductList from '@containers/ProductList';
import { useParams } from 'react-router';

const Category = () => {
    let {categoryId,categoryName} = useParams();
    document.title = categoryName + " | Mercado Libre";
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
 
export default Category;