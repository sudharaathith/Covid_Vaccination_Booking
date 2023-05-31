import { createContext, useState } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children})=>{

    let [user, setUser] = useState(null);
    let [authToken, setAuthToken] = useState(null);

    let loginUser = async (e)=>{
        let responce = fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Context-Type': 'application/json',
            },
            body: JSON.stringify({username:null,password:null})
        });
        }
    

    let contextdata = {

    }

    return(
        <AuthContext.Provider value={contextdata}>
            {children}
        </AuthContext.Provider>
    )

}