import React from 'react'

const LoginPage = () => {
  return (
    <div>
        <form>
            <input type="text" name='username' placeholder='Enter Your UserName'/>
            <input type="text" name='passwrod' placeholder='Enter Your Passwrod'/>
            <input type='submit' />
        </form>
    </div>
  )
}

export default LoginPage