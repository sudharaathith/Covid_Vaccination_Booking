import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children})=>{

    const navigator = useNavigate();

    let [user, setUser] = useState(() =>localStorage.getItem('authToken')?jwt_decode(localStorage.getItem('authToken')):null);
    let [authToken, setAuthToken] = useState(()=>localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null);

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
            localStorage.setItem('authToken', JSON.stringify(data));
            navigator('/')
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

    let contextdata = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextdata}>
            {children}
        </AuthContext.Provider>
    )

}