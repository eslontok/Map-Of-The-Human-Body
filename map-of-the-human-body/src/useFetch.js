import {useState, useEffect} from "react";

function useFetch(urlEndpoint){

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(urlEndpoint)
                .then(response => {
                    if(!response.ok){
                        throw Error("ERROR: Server reached but could not fetch data!");
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error =>{
                    setIsLoading(false);
                    setError(error.message);
                });
        }, 1000);
    }, [urlEndpoint]);

    return {data, isLoading, error};
}

export default useFetch;