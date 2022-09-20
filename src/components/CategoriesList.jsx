import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CategoriesList = () => {
    const API = `${process.env.BASE_URL_COLSITE}/categories`;

    const [categories, setCategories] = React.useState(null);
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
            {categories &&
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