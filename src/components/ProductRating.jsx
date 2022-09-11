import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const ProductRating = ({id}) => {
    const [rating,setRating] = React.useState(null);
    const API = `${process.env.BASE_URL}/reviews/item/${id}`;
    React.useEffect(()=>{
        axios.get(API)
            .then(res => {
                setRating(res.data);
            })
            .catch(err => console.log('error productRating'))
    },[]);

    return (
        <section className='ratingContainer'>
            <div className='stars'>
                {rating ?
                    rating.rating_average >= 4.5 ?
                        <>
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            {rating.rating_average >= 4.5 && rating.rating_average < 5 ? 
                                <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                :
                                <FontAwesomeIcon icon="fa-solid fa-star" />
                            }
                        </>
                        : rating.rating_average >= 4 && rating.rating_average < 4.5 ?
                        <>
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                        </>
                        : rating.rating_average >= 3 && rating.rating_average < 4 ?
                        <>
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />

                            {rating.rating_average >= 3.5 && rating.rating_average < 4 ? 
                                <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                :
                                <FontAwesomeIcon icon="fa-regular fa-star" />
                            }
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                        </>
                        : rating.rating_average >= 2 && rating.rating_average < 3 ?
                        <>
                            <FontAwesomeIcon icon="fa-solid fa-star" />
                            <FontAwesomeIcon icon="fa-solid fa-star" />

                            {rating.rating_average >= 2.5 && rating.rating_average < 3 ? 
                                <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                :
                                <FontAwesomeIcon icon="fa-regular fa-star" />
                            }
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                        </>
                        : rating.rating_average >=1 && rating.rating_average < 2 ?
                        <>
                            <FontAwesomeIcon icon="fa-solid fa-star" />

                            {rating.rating_average >= 1.5 && rating.rating_average < 2 ? 
                                <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                :
                                <FontAwesomeIcon icon="fa-regular fa-star" />
                            }
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                        </>
                        : 
                        <>
                            {rating.rating_average >= 0.5 && rating.rating_average < 1 ? 
                                <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                :
                                <FontAwesomeIcon icon="fa-regular fa-star" />
                            }
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                            <FontAwesomeIcon icon="fa-regular fa-star" />
                        </>
                    
                    : <></>
                }
            </div>
            <span>{rating && rating.reviews?.length > 0 ? rating.reviews.length : 0} opiniones</span>
        </section>
    );
}

export default ProductRating;