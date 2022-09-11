import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const idCol = 'MCO';
const API = `https://api.mercadolibre.com/sites/${idCol}/categories`;
const CategoriesList = () => {

    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const execute = async () => {
            await axios.get(API)
                .then(async (res) => setCategories(res.data))
                .catch((err) => console.log(err.status))
        }
        execute();
    }, []);
    return (
        <article className='categoriesList'>
            {categories.length > 0 &&
                categories.map(category => (
                    <Link to={`/category=${category.name}/${category.id}`} key={category.id}>
                        <div key={category.id} id={category.id}>
                            {category.name}
                        </div>
                    </Link>
                ))}
        </article>
    );
}

export default CategoriesList;