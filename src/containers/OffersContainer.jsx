import React from 'react';
import axios from 'axios';

const OffersContainer = () => {

    React.useEffect(()=>{
        axios.get("https://api.mercadolibre.com/seller-promotions/users/631366846",{
            headers:{
                Authorization: "Bearer APP_USR-6294545171348285-101512-a8caace4f9f730ad7a87361c349d5633-698739115",
                origin:"http://localhost:8080"
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    },[])
    return ( 
        <article>


        </article>
     );
}
 
export default OffersContainer;