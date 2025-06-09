import {useState, useEffect} from "react";

/**
 * useFetch custom hook fetches data from the JSON Server
 * returns the fetched data, a setData function, a loading status, and an error (if present)
 * @author Earl Lontok
 */
function useFetch(urlEndpoint){

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetches data from the JSON Server using the urlEndpoint
    useEffect(() => {
        const abort = new AbortController();
        setTimeout(() => {
            fetch(urlEndpoint, {signal: abort.signal})
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
                .catch(error => {
                    if(error.name !== "AbortError"){
                        setIsLoading(false);
                        setError(error.message);
                    }
                });
        }, 500);
        return () => abort.abort();
    }, [urlEndpoint]);

    return {data, setData, isLoading, error};
}

export default useFetch;