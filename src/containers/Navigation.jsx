import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '@logos/nav_logo.png';
import add from '@logos/nav_ads.webp';

import CartContainer from "@containers/CartContainer";
import CategoriesContainer from "@containers/CategoriesContainer";
import AppContext from '@context/AppContext';

const Navigation = () => {
    const [showCart,setShowCart] = React.useState(false);
    const [showCategories,setShowCategories] = React.useState(false);
    const {state} = React.useContext(AppContext);
    return (
        <>
            <header className="navigation">
                <section>
                    <img src={logo} alt="Logo de Mercado Libre" />
                    <section>
                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                        <div>
                            <p>Enviar a</p>
                            <p>Santa Marta</p>
                        </div>
                    </section>
                </section>
                <section>
                    <div>
                        <input type="text" placeholder="Buscar productos, marcas y más..."/>
                        <hr />
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </div>
                    <div>
                        <section className="dropDown"
                            onMouseOver={()=> setShowCategories(true)}
                            onMouseLeave={()=> setShowCategories(false)}
                        >
                            <a href="" >Categorias</a>
                            <FontAwesomeIcon className="moreThanReverse" icon="fa-solid fa-angle-right"/>
                        </section>
                        <a href="">Ofertas</a>
                        <a href="">Historial</a>
                        <a href="">Supermercado</a>
                        <a href="">Moda</a>
                        <a href="">Vender</a>
                        <a href="">Ayuda / PQR</a>
                    </div>
                </section>
                <section>
                    <img src={add} alt="" title="COMBO LOYALTV L6" />
                    <div>
                        <a href="">Crear tu cuenta</a>
                        <a href="">Ingresa</a>
                        <a href="">Mis compras</a>
                        <div className="cart">
                            {state.cart.length > 0 && <span>{state.cart.length}</span>}   
                            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" onClick={()=>{setShowCart(!showCart)}} />
                        </div>
                    </div>
                </section>
            </header>
            {showCart ? 
             <CartContainer showOrHideContainer={showCart}/> 
             : 
             <CartContainer showOrHideContainer={showCart}/>
            }
            <CategoriesContainer  showOrHide={showCategories}/>
        </>
    );
}

export default Navigation;