import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../Contex/AuthContex'

const NavBar = () => {
  let {name} = useContext(AuthContext);
  return (
    <div>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>

        <p>{name}</p>
    </div>
  )
}

export default NavBar