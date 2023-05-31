import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../Contex/AuthContex'

const NavBar = () => {
  let {user, logoutUser} = useContext(AuthContext);
  return (
    <div>
        <Link to='/'>Home</Link>
        <span> | </span>
        {(user)?<p onClick={logoutUser}>logout</p>:<Link to='/login'>Login</Link>}

        {user &&<p>{user.username}</p>}
    </div>
  )
}

export default NavBar