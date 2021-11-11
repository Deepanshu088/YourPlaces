import { createContext, useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = createContext({
    token: null,
    isLoggedIn: false,
    userId: null,
    login: ()=>{},
    logout: ()=>{}
})

export const AuthContextProvider = (props) =>{
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const login = useCallback((uid, token, expirationDate)=>{
        setUserId(uid);
        setToken(token);
        const tokenExpirationDate = expirationDate || new Date( new Date().getTime() + 1000*60*60);
        setExpirationDate(tokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() }))
    }, []);
    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
        setExpirationDate(null);
    }, []);
    
    useEffect(()=>{
        const localData = JSON.parse(localStorage.getItem('userData'));
        if(localData && localData.token && new Date(localData.expiration) > new Date() ){
            login(localData.userId, localData.token, new Date(localData.expiration));
        }
    }, [login]);

    useEffect(()=>{
        if(token && expirationDate){
            const remainigTime = expirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout( logout, remainigTime)
        }else{
            clearTimeout(logoutTimer);
        }
    }, [expirationDate, logout, token])

    return(
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            login: login,
            logout: logout,
            userId: userId  
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;