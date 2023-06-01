import React from 'react'
import {
  Typography,
  Button
} from "@material-tailwind/react";

import vaccimg from '../Static/illustration-humanitarian-help-concept_23-2148502133.webp'
import NavBar from '../Components/NavBar';

const HomePage = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <NavBar />
      <div className='flex sm:flex-row flex-col'>
      <div className=' sm:m-16 w-screen sm:w-2/3'>
      <img
      className="h-full w-full rounded-lg"
      src={vaccimg}
      alt="nature image"
    />
    </div>
    <div className='sm:w-1/3 w-screen  flex flex-col p-6 my-auto'>
      <Typography
       variant="h1"
       className="text-center "
       color="blue">
        VaxNow 
      </Typography>
      <Typography
       className="text-center font-bold text-blue-200" 
       
       >
          Defend your Future🛡️

      </Typography>
      <Button className='mt-40'>Book Your Slot</Button>
    </div>
    </div>
      </div>
  )
}

export default HomePage