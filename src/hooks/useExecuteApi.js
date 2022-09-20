import React from 'react';
import axios from 'axios';

export const useExecuteApi = async (API) => {
    const [response,setResponse] = React.useState(null);

    React.useEffect(()=>{
        axios.get(API)
            .then(res =>setResponse(res.data))
            .catch(err => console.log(`- error in useExecuteApi \nfetching : \n- ${API}\n- ${err}`))
    },[]);

    return response && response;
}