import React from 'react';
import { usePriceFormat } from "@hooks/usePriceFormat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ProductCart = ({ props,category }) => {
    const [isFavorite, setIsFavorite] = React.useState("fa-regular fa-heart");
    const isFavoriteFunction = () => {
        (isFavorite == "fa-regular fa-heart") ?
            setIsFavorite("fa-solid fa-heart")
            :
            setIsFavorite("fa-regular fa-heart")
    }
    const productUrl = `/product=${(props.title).replace(/[^a-zA-Z0-9 ]/g, "")}/aq=${props.available_quantity}/c=${category}/${props.id}`;
    return (
        <div
            className="productCart"
        >
            <div>
                <FontAwesomeIcon
                    className="favorite"
                    icon={isFavorite}
                    onClick={() => isFavoriteFunction()}
                />
            </div>
            <Link to={productUrl}>
                <img src={((props.thumbnail).replace("http","https")).replace('I.jpg', 'F.jpg')} title={props.title} alt={props.title} />
            </Link>
            <Link to={productUrl}>
                <section>
                    {props?.original_price && <figure className='old_price'>$ {usePriceFormat(props.original_price)}</figure>}
                    <span>$ {usePriceFormat(props.price)} {props?.original_price && <p>{100 - (props.price * 100 / props.original_price).toFixed()} % OFF</p>}</span>
                    {props?.shipping.free_shipping &&
                        <p className='shipping'>Envío gratis
                            {props.shipping.logistic_type === "fulfillment" && <span><FontAwesomeIcon icon="fa-solid fa-bolt" />FULL</span>}
                        </p>}
                    <h5 >
                        {props.title}
                    </h5>
                </section>
            </Link>
        </div>
    );
}

export default ProductCart;