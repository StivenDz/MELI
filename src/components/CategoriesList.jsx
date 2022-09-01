import React from 'react';
import axios from 'axios';

const idCol = 'MCO';
const API = `https://api.mercadolibre.com/sites/${idCol}/categories`;
const CategoriesList = () => {

    const [response,setResponse] = React.useState([]);

    React.useEffect(() => {
        const execute = async () =>{
            await axios.get(API)
            .then(async (res) => setResponse(res.data))
            .catch((err) => console.log(err.status))
        }
        execute();
    },[]);
    return ( 
        <article className='categoriesList'>
                {response.length > 0 &&
                response.map(categorie=>(
                <div key={categorie.id} id={categorie.id}>{categorie.name}</div> ))}
        </article>
     );
}
 
export default CategoriesList;