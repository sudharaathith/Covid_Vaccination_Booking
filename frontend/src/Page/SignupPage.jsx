import React, { useContext, useRef } from 'react'
import AuthContext from '../Contex/AuthContex'
import NavBar from '../Components/NavBar';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const SignupPage = () => {
  let {loginUser} = useContext(AuthContext);
  let signup = async (e )=>{

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
        Signup
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
      Enter your details to register.
      </Typography>
      <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={loginUser}>
        <div className="mb-4 flex flex-col gap-6">
          <Input name="username" size="lg" label="Username" />
          <Input name="email" size="lg" label="Email" />
          <Input name='password' type="password" size="lg" label="Password" />
          <Button onClick={()=>{formRef.current.click()}}><input ref={formRef} value={"SignUp"} type='submit' /></Button>
        </div>
        
        <Typography color="gray" className="mt-4 text-center font-normal">
          I Already have a account {" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Login
          </a>
        </Typography>
      </form>
    </Card>
    </div>
    </div>
    </div>
  )
}

export default SignupPage