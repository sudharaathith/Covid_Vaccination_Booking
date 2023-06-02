import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children})=>{

    const navigator = useNavigate();

    let [user, setUser] = useState(() =>localStorage.getItem('authToken')?jwt_decode(localStorage.getItem('authToken')):null);
    let [authToken, setAuthToken] = useState(()=>localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null);
    let [loading, setLoading] = useState(true);

    let loginUser = async (e )=>{

        e.preventDefault();
        let responce = await fetch('/api/token/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:e.target.username.value,password:e.target.password.value})
        });
        let data = await responce.json();
        console.log(data);
        if(responce.status === 200){
            setAuthToken(data);
            setUser(jwt_decode(data.access));
            let u = jwt_decode(data.access)
            localStorage.setItem('authToken', JSON.stringify(data));
            
            navigator((u.is_superuser)?'/editor':'/')
        }else{
            alert("something went wrong")
        }
        }
    
        let logoutUser = () => {
            setAuthToken(null);
            setUser(null);
            
            localStorage.removeItem('authToken');
            navigator('/login')
        }

        let updateToken = async () => {
            console.log("updateToken")
            let responce = await fetch('/api/token/refresh/', {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({refresh:authToken.refresh})
            });
            let data = await responce.json();
            if(responce.status === 200){
                setAuthToken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authToken', JSON.stringify(data));

            }else{
                logoutUser()
            }
        }

    let contextdata = {
        user:user,
        authToken:authToken,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
        let forminutes = 1000 * 60 * 2;
        let interval = setInterval(()=>{
            if(authToken){
                updateToken();
            }
        }, forminutes)
        return () => clearInterval(interval)
    },[authToken, loading])

    return(
        <AuthContext.Provider value={contextdata}>
            {children}
        </AuthContext.Provider>
    )

}