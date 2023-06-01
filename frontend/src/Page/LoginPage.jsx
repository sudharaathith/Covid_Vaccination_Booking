import React, { useContext, useRef } from 'react'
import AuthContext from '../Contex/AuthContex'
import NavBar from '../Components/NavBar';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext);
  const formRef = useRef(null);
  return (

    <div className='w-screen h-screen overflow-hidden'>
      <NavBar />
        {/* <form onSubmit={loginUser}>
            <input type="text" name='username' placeholder='Enter Your UserName'/>
            <input type="password" name='password' placeholder='Enter Your Passwrod'/>
            <input type='submit' />
        </form> */}
        <div className='flex justify-items-center h-full'>
          <div className='m-auto'>
        <Card color="transparent mx-auto" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your username and password to login
      </Typography>
      <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={loginUser}>
        <div className="mb-4 flex flex-col gap-6">
          <Input name="username" size="lg" label="Username" />
          <Input name='password' type="password" size="lg" label="Password" />
          <Button onClick={()=>{formRef.current.click()}}><input ref={formRef} value={"Login"} type='submit' /></Button>
        </div>
        
        <Typography color="gray" className="mt-4 text-center font-normal">
          Create a New Account {" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
    </div>
    </div>
    </div>
  )
}

export default LoginPage