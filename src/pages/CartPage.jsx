import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import CartPageItem from '@components/CartPageItem';

import AppContext from '@context/AppContext';
import { usePriceFormat } from '@hooks/usePriceFormat';


const CartPage = () => {
    const { state } = React.useContext(AppContext);

    return (

        <>
            {window.innerWidth > 976 ?
                <Navigation />
                :
                <NavigationResponsive />
            }

            <main className='cartPage'>
                <div className="cartOrSaved">
                    <div>
                        <Link to={"/cart"}>Carrito {`(${state.cart.length})`}</Link>
                    </div>
                    <div>
                        <Link className='saved' to={"/cart"}>Guardados {`(${state.favorites.length})`}</Link>
                    </div>
                </div>
                {state.cart.map(product => (
                    <CartPageItem key={product.id} product={product} />
                ))}
                {state.cart.length > 0 ?
                    <>
                        <section className="totalContainer">
                            <div>
                                <p>Envío a Santa Marta</p>
                                <h2>Total con envío</h2>
                            </div>
                            <div>
                                <p>Gratis</p>
                                <span>$ {usePriceFormat(state.total)}</span>
                            </div>
                        </section>
                        <div className="continueShopping">
                            <button>
                                Continuar compra
                            </button>
                        </div>
                    </>
                    :
                    <div className="vacio">
                        <h2>Tu carrito está vacío</h2>
                        <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
                    </div>
                }
            </main>
        </>
    );
}

export default CartPage;