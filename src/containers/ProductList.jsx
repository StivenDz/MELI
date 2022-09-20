import React from 'react';
import axios from 'axios';

import ProductItem from '@components/Productitem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@components/Loading';


const ProductList = ({category}) => {
    const comp = "MCO1648";
    const API = `${process.env.BASE_URL_COLSITE}/search?category=${category || comp}`;
    
    const [products, setProducts] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState({
        id:null,
        productItem:null
    });

    React.useEffect(() => {
        axios.get(API)
            .then(res => setProducts(res.data.results))
            .catch(err => console.log(err.status));
    }, [category]);

    
        return (
        <article className='productList'>
            {products ?
                products.map(product => (
                    <motion.div 
                        key={product.id}
                        layoutId={product.id}
                            // onClick={() => setSelectedId({
                            //     id:product.id,
                            //     productItem:product
                            // })}
                        >

                        <ProductItem
                           key={product.id} props={product}
                        />

                    </motion.div>
                    
                ))
                :
                <Loading/>
            }
            <AnimatePresence>
                {selectedId.id != null && (
                    <motion.div className='product'
                        layout='position'
                        layoutId={selectedId.id}
                        animate={{
                            position:'fixed',
                            zIndex:'600'
                        }}
                        >
                        <ProductItem props={selectedId.productItem}/>

                        <motion.div onClick={() => setSelectedId({
                            id:null,
                            productItem:null})}
                            >
                            <FontAwesomeIcon 
                                className='deleteItem'
                                icon="fa-solid fa-xmark"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    );
    
}

export default ProductList;