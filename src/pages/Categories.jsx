import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';

const Categories = () => {
    return (
        <>
            {window.innerWidth > 976 ?
                <Navigation />
                :
                <NavigationResponsive />
            }
            <main className='categories'>
                <h1>Categorías para comprar y vender</h1>
                <section>
                    
                </section>
            </main>
        </>
    );
}

export default Categories;