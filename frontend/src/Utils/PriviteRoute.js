import { useContext } from "react"
import { Navigate, Route } from "react-router-dom"
import AuthContext from "../Contex/AuthContex"


const PriviteRoute = ({children , ...rest})=>{
    let {user} = useContext(AuthContext);
    return ((user)?children: <Navigate to='/login' /> )
}

export const AdminRoute = ({children, ...rest})=>{
    let {user} = useContext(AuthContext);
    return <PriviteRoute>{(user.is_superuser)?children:<Navigate to='/' />}</PriviteRoute>
}

export default PriviteRoute