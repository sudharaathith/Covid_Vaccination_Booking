import { Navigate, Route } from "react-router-dom"


const PriviteRoute = ({children , ...rest})=>{
    const isAuthenticated = false
    return ((isAuthenticated)?children: <Navigate to='/login' /> )
}

export default PriviteRoute