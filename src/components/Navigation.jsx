import React from "react";
import logo from '@logos/nav_logo.png';
import add from '@logos/nav_ads.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartContainer from "@containers/CartContainer";

const Navigation = () => {
    const [showCart,setShowCart] = React.useState(false);
    const productList = [
        {
            img : "https://http2.mlstatic.com/D_NQ_NP_749586-MLA46247316376_062021-V.webp",
            title : "Silla Gamer",
            name : "Silla Gamer Reclinable Roja",
            price : "800.000",
            id : 1,
        },
        {
            img : "https://http2.mlstatic.com/D_NQ_NP_826731-MCO51164758653_082022-V.webp",
            title : "PC",
            name : "PC core 7 128gb",
            price : "2,000.000",
            id : 2,
        },
        {
            img : "https://http2.mlstatic.com/D_NQ_NP_745312-MLA46504064560_062021-V.webp",
            title : "Teclado Mecanico",
            name : "Teclado Mecanico RGB",
            price : "160.000",
            id : 3,
        }
    ]

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
                        <a href="">Categorias</a>
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
                        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" onClick={()=>{setShowCart(!showCart)}} />
                    </div>
                </section>
            </header>
            {showCart ? 
             <CartContainer products={productList} showOrHideContainer={showCart}/> 
             : 
             <CartContainer products={productList} showOrHideContainer={showCart}/>
            }
        </>
    );
}

export default Navigation;