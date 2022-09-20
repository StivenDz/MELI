import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import { useExecuteApi } from '@hooks/useExecuteApi';
import axios from 'axios';

const Categories = () => {
    window.scrollTo({
        top: 0
    })

    let response = [];
    const API = `${process.env.BASE_URL_COLSITE}/categories`;
    const [categories, setCategories] = React.useState(null);
    const [childrenCategories, setChildrenCategories] = React.useState({content: response,full:false});

    useExecuteApi(API).then(data => {
        setCategories(data);
    });
    React.useEffect(() => {
        categories &&
            categories.forEach(async (category) => {
                await axios.get(`${process.env.BASE_URL}/categories/${category.id}`)
                    .then(async (res) => {
                        response.push(await res.data);
                        response.length === categories.length && setChildrenCategories({content: response,full:true});
                    })
                    .catch(err => console.log(`- error in useExecuteMultipleApis \nfetching : \n- ${API}\n- ${err}`))
            });
    }, [categories])
    return (
        <>
            {window.innerWidth > 976 ?
                <Navigation />
                :
                <NavigationResponsive />
            }
            <main className='categories'>
                <h1>Categorías para comprar y vender</h1>
                <section>
                    {childrenCategories.full && <p>ok</p>}
                </section>
            </main>
        </>
    );
}

export default Categories;