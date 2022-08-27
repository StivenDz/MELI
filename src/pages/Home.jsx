import React,{useState,useEffect} from 'react';
import Navigation from '@components/navigation';
import {Carousel} from '@containers/Carousel';
// import {useExecuteAPI} from '@hooks/useExecuteAPI';
import axios from 'axios';

const Home =  () => {
    const idCol = 'MCO';
    const API = `https://api.mercadolibre.com/sites/${idCol}/categories`;

    const [response,setResponse] = useState([]);

    useEffect(() => {
        const execute = async () =>{
            await axios.get(API)
            .then(async (res) => setResponse(res.data))
            .catch((err) => console.log(err.status))
        }
        execute();
    },[])
    // console.log(response);
    return ( 
        <>
            <Navigation/>
            <Carousel/>
            <select>
                {response.length > 0 &&
                response.map(categorie=>(
                <option key={categorie.id} id={categorie.id}>{categorie.name}</option> ))}
            </select>
        </>
     );
};
 
export default Home;