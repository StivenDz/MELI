import { useEffect, useState } from "react";
import axios from "axios";

const useExecuteAPI = (API) =>{
    const [response,setResponse] = useState(null);

    useEffect(() => {
        const execute = async () =>{
            await axios.get(API)
            .then(async (res) => setResponse(res.data))
            .catch((err) => console.log(err.status))
        }
        execute();
    },[])

    return (response);
}
;export {useExecuteAPI};