import { useContext } from "react"
import { Navigate, Route } from "react-router-dom"
import AuthContext from "../Contex/AuthContex"


const PriviteRoute = ({children , ...rest})=>{
    let {user} = useContext(AuthContext);
    return ((user)?children: <Navigate to='/login' /> )
}

export default PriviteRoute