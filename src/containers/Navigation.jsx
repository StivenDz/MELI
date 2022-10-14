import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useNavigate } from "react-router-dom";

import logo from '@logos/nav_logo.png';
import add from '@logos/nav_ads.webp';

import CartContainer from "@containers/CartContainer";
import CategoriesContainer from "@containers/CategoriesContainer";
import ProfileOptions from "@components/ProfileOptions";
import AppContext from '@context/AppContext';

const Navigation = () => {
    const {state} = React.useContext(AppContext);
    const [showCart,setShowCart] = React.useState(false);
    const [showCategories,setShowCategories] = React.useState(false);
    const [showProfileOptions,setShowProfileOptions] = React.useState(false);
    const navigate = useNavigate();
    return (
        <>
            <header className="navigation">
                <div>
                    <section>
                        <Link to="/" >
                            <img src={logo} alt="Logo de Mercado Libre" />
                        </Link>
                        <section>
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                            <div>
                                <p>Enviar a {state.isLogged && state.userData.username.name}</p>
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
                                <Link to="/categories" >Categorias</Link>
                                <FontAwesomeIcon className="moreThanReverse" icon="fa-solid fa-angle-right"/>
                            </section>
                            <Link to="#">Ofertas</Link>
                            <Link to="#">Historial</Link>
                            <Link to="#">Supermercado</Link>
                            <Link to="#">Moda</Link>
                            <Link to="#">Vender</Link>
                            <Link to="#">Ayuda / PQR</Link>
                        </div>
                    </section>
                    <section>
                        <img src={add} alt="" title="COMBO LOYALTV L6" />
                        <div>
                            {!state.isLogged ?
                            <>
                                <Link to="/signup">Crear tu cuenta</Link>
                                <Link to="/login">Ingresa</Link>
                                <Link to="#">Mis compras</Link>
                            </>
                            :
                            <>
                                <Link className="userOptions" to={"#"}
                                    onMouseOver={()=> setShowProfileOptions(true)}
                                    onMouseLeave={()=> setShowProfileOptions(false)}
                                >
                                    <FontAwesomeIcon className="userIcon" icon="fa-regular fa-circle-user" />
                                    {state.userData.username.name}
                                    <FontAwesomeIcon icon="fa-solid fa-angle-right"/>
                                </Link>
                                <ProfileOptions 
                                    showOrHide={showProfileOptions} 
                                    name={state.userData.username.name}
                                />
                                <Link to="#">Mis compras</Link>
                                <Link to="#">Favoritos <FontAwesomeIcon className="moreThanReverse" icon="fa-solid fa-angle-right"/></Link>
                                <FontAwesomeIcon icon="fa-regular fa-bell" />
                            </>
                            }
                            <div className="cart">
                                {state?.cart && state.cart.length > 0 && <span>{state.cart.length}</span>}   
                                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" onClick={()=>{!state.isLogged ? navigate("/login") : setShowCart(!showCart)}} />
                            </div>
                        </div>
                    </section>
                </div>
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