import React from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navigation from '@containers/Navigation';
import ProductRating from '@components/ProductRating';
import NavigationResponsive from '@containers/NavigationResponsive';
import Loading from '@components/Loading';
import Quantity from '@components/Quantity';
import Footer from "@containers/Footer";
import checked from "@icons/Checked.svg";
import Efecty from "@icons/Efecty.svg";
import MasterCard from "@icons/MasterCard.svg";
import Visa from "@icons/Visa.svg";
import Diners from "@icons/Diners.svg";
import AX from "@icons/AmericanExpress.svg";
import CarouselProductList from '../containers/CarouselProductList';

import { usePriceFormat } from '@hooks/usePriceFormat';
import AppContext from "@context/AppContext";
import OffersDay from '@components/OffersDay';


const ProductDetail = () => {
    const { state, addToCart, removeFromCart } = React.useContext(AppContext);
    const navigate = useNavigate();
    const initialState = {
        num:
            state.quantity.filter(q => (q.id === productId)).length > 0 ?
                state.quantity.filter(q => (q.id === productId))[0].quantitySelected
                :
                1,
        clickedQuantity: false
    }
    const { productId, categoryId, available_quantity } = useParams();
    const [productDetail, setProductDetail] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [seller, setSeller] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [quantitySelected, setQuantitySelected] = React.useState(initialState);
    const [isAddedToCartBtn, setIsAddedToCartBtn] = React.useState(
        (state.cart).filter(item => item.id === productId).length === 0 ? false : true
    );
    const API = `${process.env.BASE_URL}/items/${productId}`;
    React.useEffect(() => {
        axios.get(API)
            .then(res => {
                setProductDetail(res.data);
                setSelectedImage(res.data.pictures[0].secure_url);
                document.title = `${res.data.title} | Mercado Libre`;
            })
            .catch(err => console.log('error productDetail API'));
    }, []);

    React.useEffect(() => {
        productDetail &&
            axios.get(`${process.env.BASE_URL_COLSITE}/search?seller_id=${productDetail.seller_id}`)
                .then(res => {
                    setSeller(res.data);
                })
                .catch(err => console.log("error productDetail seller_id"));
    }, [productDetail]);

    // see attrubites test
    React.useEffect(() => {
        productDetail?.attributes.map(attr => {
            console.log(attr.name, attr?.value_name);
            console.log(productDetail);
        })
    }, [productDetail])

    // see description test
    React.useEffect(() => {
        axios.get(`${process.env.BASE_URL}/items/${productId}/description`)
            .then(res => setDescription(res.data))
    }, [])

    React.useEffect(() => {
        axios.get(`https://api.mercadolibre.com/categories/${categoryId}`)
            .then(res => console.log(res.data))
    }, [])

    React.useEffect(() => {
        setIsAddedToCartBtn((state.cart).filter(item => item.id === productId).length === 0 ? false : true);
    }, [state.cart]);

    React.useEffect(() => {
        setQuantitySelected({
            ...quantitySelected,
            num:
                state.quantity.filter(q => (q.id === productId)).length > 0 ?
                    state.quantity.filter(q => (q.id === productId))[0].quantitySelected
                    :
                    1,
        }

        )
    }, [state.quantity]);

    const hoverImage = (e) => {
        setSelectedImage(e.target.src);
        e.target.classList.add('selected');
        const selecteds = document.querySelectorAll('.selected');
        selecteds.length > 1 && selecteds.forEach(selected => {
            selected != e.target && selected.classList.remove('selected');
        });
    }

    const alterQuantity = (out = false) => {
        setQuantitySelected({
            ...quantitySelected,
            clickedQuantity: out ? false : !(quantitySelected.clickedQuantity)
        });
    }

    const handleAddOrRemoveFromCart = (type, product) => {
        if (!state.isLogged) {
            navigate('/login');
            return
        }

        type === 'remove' ?
            (
                removeFromCart(product),
                setIsAddedToCartBtn(false)
            )
            :
            (
                addToCart(product, quantitySelected.num, available_quantity),
                setIsAddedToCartBtn(true)
            )
    }

    const handleUnclickQuantity = (e) => {
        !(document.getElementById('quantity').contains(e.target)) &&
            setQuantitySelected({
                ...quantitySelected,
                clickedQuantity: false
            });
    }
    window.scrollTo({
        top:"0",
        behavior:"smooth"
    })
    return (
        <>
            {window.innerWidth > 976 ?
                <Navigation />
                :
                <NavigationResponsive />
            }

            <main onClick={handleUnclickQuantity}>
                {productDetail ?
                    <section className='productDetail'>
                        <section>
                            <div>
                                <aside className="images">
                                    {productDetail.pictures.map((image, i) => (
                                        <div key={i}>
                                            <img key={i} className={`image ${i == 0 ? 'selected' : ""}`} src={image.secure_url} alt="" onMouseOver={hoverImage} id={image.id} />
                                        </div>
                                    ))}
                                </aside>
                                <figure className='selectedImage'>
                                    <img src={selectedImage} alt="" />
                                </figure>
                                <section className='productDescription'>
                                    <p className='new'>{productDetail?.condition == 'new' && "Nuevo | "}{productDetail.sold_quantity + " vendidos"}</p>
                                    <h1>{productDetail.title}</h1>
                                    <ProductRating id={productId} />
                                    <span className='price'>$ {usePriceFormat(productDetail.price)}</span>

                                    <section className='moreDescription'>
                                        <h4>Lo que tienes que saber de este producto</h4>
                                        <ul>
                                            {productDetail.attributes.map((attr, i) => (
                                                i <= 6 &&
                                                <li key={attr.id}>
                                                    {attr.name} {attr.value_name}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link to={"#"} title="Ver características">Ver características</Link>
                                    </section>
                                </section>
                            </div>
                            <span className='hr'></span>
                            <section className='productsSuggestions'>
                                <CarouselProductList
                                    category={productDetail.category_id}
                                    title={"Quienes vieron este producto también compraron"}
                                    quantityScroll={3}
                                />
                            </section>
                            <span className='hr'></span>
                            <section className='caracteristicsContainer'>
                                <h2>Características de {(productDetail.attributes.filter(attr => (attr.id == "BRAND")))[0].value_name} {(productDetail.attributes.filter(attr => (attr.id == "MODEL")))[0].value_name}
                                </h2>
                                <div className='caracteristics'>
                                    <div>
                                        {productDetail.attributes.map((attr, i) => (
                                            i > 6 && i < 10 &&
                                            <div key={attr.id}>
                                                <figure>
                                                    <img src={checked} alt="" />
                                                </figure>
                                                <p>
                                                    {attr.name} <span>{attr.value_name}</span>
                                                </p>
                                            </div>

                                        ))}
                                    </div>
                                    <div>
                                        {productDetail.attributes.map((attr, i) => (
                                            i >= 10 && i < 12 &&
                                            <div key={attr.id}>
                                                <figure>
                                                    <img src={checked} alt="" />
                                                </figure>
                                                <p>
                                                    {attr.name} <span>{attr.value_name}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Link to={"#"} title="Ver más características">
                                    Ver más características
                                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                </Link>
                                {/* {console.log(productDetail)} */}
                            </section>
                            <span className='hr'></span>
                            <section className='description'>
                                <h2>Descripción</h2>
                                <p>{description && description?.plain_text}</p>
                            </section>
                            <span className='hr'></span>
                        </section>
                        <aside>
                            <article className='paymentMethod'>
                                <p>Hasta 48 cuotas</p>
                                <div className='methods'>
                                    <div className='visa' alt=""></div>
                                    <div className='' alt=""></div>
                                    <div className='mastercadr' alt=""></div>
                                </div>
                                <Link className='infomation' to="#">Más información</Link>
                                <div className='shipments'>
                                    <FontAwesomeIcon icon="fa-solid fa-truck" />
                                    <div>
                                        <p>Envío gratis a nivel nacional</p>
                                        <p>Conoce los tiempos y las formas de envío.</p>
                                        <Link to="#">
                                            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                            Calcular cuándo llega
                                        </Link>
                                    </div>
                                </div>
                                <p className='sellerBy'>Vendido Por <Link className='seller' to={'#'}>{seller && seller.seller.nickname}</Link></p>
                                <p className='sold'>MercadoLíder | {seller && usePriceFormat(seller.seller.seller_reputation.metrics.sales.completed)} Ventas</p>

                                <h4 className='available'>Stock disponible</h4>
                                <div className='quantity-container'>
                                    <div className='quantity' id='quantity' onClick={() => alterQuantity()} onAuxClick={() => alterQuantity(true)}>
                                        <h4 className=''>Cantidad:</h4>
                                        <p>{quantitySelected.num} {quantitySelected.num > 1 ? "unidades" : "unidad"}</p>
                                        <FontAwesomeIcon className={quantitySelected.clickedQuantity ? "rotate" : "keep"} icon="fa-solid fa-angle-down" />
                                        {
                                            quantitySelected.clickedQuantity &&
                                            <Quantity
                                                avilable={available_quantity && available_quantity}
                                                quantity={quantitySelected.num}
                                                productId={productId}
                                            />
                                        }
                                    </div>
                                    <p>({available_quantity && available_quantity >= 100 ? "+99" : available_quantity} disponibles)</p>
                                </div>

                                <button className='buyNowButton'>Comprar ahora</button>
                                {isAddedToCartBtn ?

                                    <button className='deleteFromCartButton' onClick={() => handleAddOrRemoveFromCart('remove', productDetail)}>Eliminar del carrito</button>
                                    :
                                    <button className='addToCartButton' onClick={() => handleAddOrRemoveFromCart('add', productDetail)}>Agregar al carrito</button>

                                }
                                <section className='benefits'>
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
                                        <p><Link to={"#"}>Devolución gratis</Link>. Tienes 30 días desde que lo recibes.</p>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-shield" />
                                        <p><Link to={"#"}>Compra Protegida</Link>, Se abrirá en una nueva ventana, recibe el producto que esperabas o te devolvemos tu dinero.</p>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-trophy" />
                                        <p><Link to={"#"}>Mercado Puntos</Link>, Se abrirá en una nueva ventana. Sumas 342 puntos.</p>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-medal" />
                                        <p>12 meses de garantía de fábrica.</p>
                                    </div>
                                </section>
                            </article>
                            <article className='sellerInformation'>
                                <h3>
                                    Información sobre el vendedor
                                </h3>
                                <div className='location'>
                                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                    <p>
                                        Ubicación
                                        <span>
                                            Chapinero, Bogotá D.C.
                                            {/* {seller && 
                                                // (seller.filter(info => info.name == "Location"))
                                            } */}
                                        </span>
                                    </p>
                                </div>
                                <div className='leader'>
                                    <FontAwesomeIcon icon="fa-solid fa-medal" />
                                    <p>
                                        MercadoLíder Platinum
                                        <span>
                                            ¡Es uno de los mejores del sitio!
                                        </span>
                                    </p>
                                </div>
                                <ul className='levels'>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <section className='sellerStatus'>
                                    <div>
                                        <span>{seller && seller.seller.seller_reputation.metrics.sales.completed}</span>
                                        <p>Ventas en los últimos 60 días</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 24"><g fill="none"><path d="m6.747 21.511 4.538-3.518h8.238c1.032 0 1.868-.98 1.868-2.19V3.21c0-1.21-.836-2.19-1.868-2.19H3.173c-1.032 0-1.869.98-1.869 2.19v14.077c0 .39.316.706.706.706h3.6v2.96a.706.706 0 0 0 1.138.558z" stroke="#333" /><g transform="translate(14 9)"><circle cx="7.5" cy="7.5" r="7.5" fill="#39B54A" /><path d="m3.75 7.5 2.445 2.445m.055-.055L11.14 5" stroke="#FFF" /></g></g></svg>
                                        <p>Brinda buena atención</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 26"><g fill="none"><g transform="translate(1 .02)" stroke="#333"><ellipse cx="10.5" cy="13.714" rx="10.5" ry="10.286" /><path d="M19.107 13.714h-1.59m-14.097 0H1.83m8.67-8.571v1.59m.063 13.838v1.59M10.5.857v2.484M8.75.857h3.637m-2.074 7.944v4.944H5.24" /></g><g transform="translate(15 10.02)"><circle cx="7.5" cy="7.5" r="7.5" fill="#39B54A" /><path d="m3.75 7.5 2.445 2.445m.055-.055L11.14 5" stroke="#FFF" /></g></g></svg>
                                        <p>Entrega sus productos a tiempo</p>
                                    </div>
                                </section>
                                <Link to={"#"}>Ver más datos de este vendedor</Link>
                            </article>
                            <article className='paymentMethod2'>
                                <h3>
                                    Medios de pago
                                </h3>
                                <div>
                                    <p>Tarjetas de crédito</p>
                                    <span>¡Paga en hasta 48 cuotas!</span>
                                    <figure>
                                        <img src={MasterCard} alt="" />
                                        <img src={AX} alt="" />
                                        <img src={Visa} alt="" />
                                        <img src={Diners} alt="" />
                                    </figure>
                                </div>
                                <div>
                                    <p>Tarjetas de débito</p>
                                    <figure>
                                        <img src={Visa} alt="" />
                                        <img src={MasterCard} alt="" />
                                    </figure>
                                </div>
                                <div>
                                    <p>Efectivo</p>
                                    <figure>
                                        <img src={Efecty} alt="" />
                                    </figure>
                                </div>
                                <Link to="#">Conoce otros medios de pago</Link>
                            </article>
                        </aside>
                    </section>
                    :

                    <Loading />
                }
            </main>
            <OffersDay />
            <Footer />
        </>
    );
}

export default ProductDetail;