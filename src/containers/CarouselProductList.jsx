import React from 'react';
import { Link } from 'react-router-dom'
import ProductCart from '../components/ProductCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import axios from 'axios';

const CarouselProductList = ({ title, category = "MCO1648" }) => {
    const [showRLButtons, setShowRLButtons] = React.useState(false);
    const [products,setProducts] = React.useState(null);

    const paginate = (newDirection) => {
        let container = document.getElementById(`carouselProductListContainer${category}`);
        container.scrollLeft+= newDirection;
    };
    const API = `${process.env.BASE_URL_COLSITE}/search?category=${category}`;

    React.useEffect(() => {
        axios.get(API)
            .then(res => setProducts(res.data.results))
            .catch(err => console.log(err.status));
    }, []);

    return (
        <motion.section className="carouselProductList">
            <div>
                <div>
                    <h2>{title}</h2>
                    <Link to={"#"}>Ver historial</Link>
                </div>

                <section
                    onMouseOver={() => { setShowRLButtons(true) }}
                    onMouseLeave={() => { setShowRLButtons(false) }}
                >
                <motion.section
                    id={`carouselProductListContainer${category}`}>
                    {products && 
                        products.map(product => (
                            <ProductCart 
                            key={product.id} 
                            props={product}
                            category={category}
                            />
                        ))
                    }
                </motion.section>
                <figure>
                    {showRLButtons && (
                        <>
                            <div className="next" onClick={() => paginate(240 * 5)}>
                                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                            </div>
                            <div className="prev" onClick={() => paginate(-240 * 5)}>
                                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                            </div>
                        </>
                    )}
                </figure>

                </section>
            </div>
        </motion.section>
    );
}

export default CarouselProductList;