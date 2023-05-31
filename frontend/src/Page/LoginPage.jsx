import React, { useContext } from 'react'
import AuthContext from '../Contex/AuthContex'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext);
  return (

    <div>
        <form onSubmit={loginUser}>
            <input type="text" name='username' placeholder='Enter Your UserName'/>
            <input type="password" name='password' placeholder='Enter Your Passwrod'/>
            <input type='submit' />
        </form>
    </div>
  )
}

export default LoginPage