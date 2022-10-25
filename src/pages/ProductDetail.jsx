import React from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navigation from '@containers/Navigation';
import ProductRating from '@components/ProductRating';
import NavigationResponsive from '@containers/NavigationResponsive';
import Loading from '@components/Loading';
import Quantity from '../components/Quantity';

import { usePriceFormat } from '@hooks/usePriceFormat';
import AppContext from "@context/AppContext";


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
    const { productId,categoryId,available_quantity } = useParams();
    const [productDetail, setProductDetail] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [seller, setSeller] = React.useState(null);
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
                    //console.log(res.data);
                })
                .catch(err => console.log("error productDetail seller_id"));
    }, [productDetail]);

    React.useEffect(()=>{
            productDetail?.attributes.map(attr => {
                console.log(attr.name,attr?.value_name);
            })
            // console.log(productDetail);
            // axios.get(`https://api.mercadolibre.com/questions/search?item=${productId}&api_version=4`)
            //     .then(res => console.log(res.data))
    },[productDetail])

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
        if(!state.isLogged){
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
                addToCart(product,quantitySelected.num,available_quantity),
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
                                            {productDetail.attributes.map((attr,i)=>(
                                                i <=6 &&
                                                <li key={attr.id}>
                                                    {attr.name} {attr.value_name}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link to={"#"}>Ver características</Link>
                                    </section>
                                </section>
                            </div>
                            <span className='hr'></span>
                            <section>
                                <h2>Características de {(productDetail.attributes.filter(attr => (attr.id == "BRAND")))[0].value_name} {(productDetail.attributes.filter(attr => (attr.id == "MODEL")))[0].value_name}
                                </h2>   
                                {console.log(productDetail)}
                            </section>
                        </section>
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

                        </article>
                    </section>
                    :

                    <Loading />
                }
            </main>

        </>
    );
}

export default ProductDetail;