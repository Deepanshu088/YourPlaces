import { useCallback, useEffect, useRef, useState } from "react";

const useHttp = ()=>{
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback( async (url, method, body, headers)=>{
        let responseData;
        setIsLoading(true);
        setError(null);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try{
            const response = await fetch(url, {
                method: method || 'GET',
                body: body || JSON.stringify(),
                headers: headers || {
                    'Content-Type' : 'application/json'
                },
                signal: httpAbortCtrl.signal
            });
            responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl )

            if(!response.ok){
                throw new Error(responseData.message || 'Something Went Wrong, Some unknown error');
            }
            setIsLoading(false);
            return responseData;
        }catch(e){
            setIsLoading(false);
            setError(e.message||'Something Went Wrong, Some unknown error');
            throw e;
        }
    }, [])

    const clearError = useCallback(()=>{
        setError(null);
    }, [])

    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach(abortCtrl=> abortCtrl.abort())
        }
    },[])

    return({
        isLoading,
        error,
        sendRequest,
        clearError
    })
};

export default useHttp;