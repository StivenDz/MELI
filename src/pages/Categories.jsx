import React from 'react';
import Navigation from '@containers/Navigation';
import NavigationResponsive from '@containers/NavigationResponsive';
import { useExecuteApi } from '@hooks/useExecuteApi';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    window.scrollTo({
        top:"0",
        behavior:"smooth"
    })

    let response = [];
    const API = `${process.env.BASE_URL_COLSITE}/categories`;
    const [categories, setCategories] = React.useState(null);
    const [childrenCategories, setChildrenCategories] = React.useState({content: response,full:false});
    const navigate = useNavigate();

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

    // React.useEffect(()=>{
    //     childrenCategories.full && console.log(childrenCategories);
    //     childrenCategories.full && console.log(categories);
    // },[childrenCategories])

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
                    {childrenCategories.full && 
                        categories.map(category => (
                            <div key={category.id}>
                                <h2
                                    onClick={() => 
                                    navigate(`/category=${category.name}/${category.id}`)}>{category.name}
                                </h2>
                                <div>
                                    {
                                        (
                                            (childrenCategories.content.filter(childrenCategory => childrenCategory.id === category.id)[0].children_categories).map(childrenCategoryItem => 
                                                (<Link 
                                                    to={`/category=${childrenCategoryItem.name}/${childrenCategoryItem.id}`} 
                                                    key={childrenCategoryItem.id}
                                                    >

                                                    {childrenCategoryItem.name}
                                                </Link>))
                                        )
                                        
                                    }
                                </div>
                            </div>    
                        ))
                    
                    }
                </section>
            </main>
        </>
    );
}

export default Categories;