import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import ProductRating from '@components/ProductRating';
import Loading from '@components/Loading';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {usePriceFormat} from '@hooks/usePriceFormat';

const ProductDetail = () => {
    const {productId} = useParams();
    const [productDetail,setProductDetail] = React.useState(null);
    const [selectedImage,setSelectedImage] = React.useState(null);
    const API = `${process.env.BASE_URL}/items/${productId}`;

    React.useEffect(()=>{
        axios.get(API)
            .then(res => {
                setProductDetail(res.data);
                setSelectedImage(res.data.pictures[0].secure_url);
                document.title = `${res.data.title} | Mercado Libre`;
                console.log(res.data);
            })
            .catch(err => console.log('error productDetail'))
    },[]);

    const hoverImage = (e) =>{
        setSelectedImage(e.target.src);
        e.target.classList.add('selected');
        const selecteds = document.querySelectorAll('.selected');
        selecteds.length > 1 && selecteds.forEach(selected => {
            selected != e.target && selected.classList.remove('selected');
        });
    }

    return ( 
        <>
            {window.innerWidth > 976 ?
                <Navigation/> 
                : 
                <NavigationResponsive/>
            }

            <main >
                {productDetail ?
                    <section className='productDetail'>
                        <aside className="images">
                            {productDetail.pictures.map((image,i) => (
                                <div key={i}>
                                    <img key={i} className={`image ${i == 0 ? 'selected' : ""}`} src={image.secure_url} alt="" onMouseOver={hoverImage} id={image.id}/>
                                </div>
                            ))}
                        </aside>
                        <figure className='selectedImage'>
                            <img src={selectedImage} alt="" />   
                        </figure>
                        <section className='productDescription'>
                                <p className='new'>{productDetail?.condition == 'new' && "Nuevo | "}{productDetail.sold_quantity + " vendidos"}</p>
                                <h1>{productDetail.title}</h1>
                                <ProductRating id={productId}/>
                                <span className='price'>$ {usePriceFormat(productDetail.price)}</span>
                        </section>
                        <article className='paymentMethod'>

                        </article>
                    </section>
                    :

                    <Loading/>
                }
            </main>
            
        </>
     );
}
 
export default ProductDetail;