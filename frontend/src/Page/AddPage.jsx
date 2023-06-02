import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AuthContext from '../Contex/AuthContex';
import Success from '../Components/Sucess';
import DatePicker from '../Components/DatePicker';
 


const AddPage = () => {
  const [type, setType] = React.useState("card");
  const [slot, setSlot] = React.useState({lodaing:"lodaing"});
  const [date, setDate] = React.useState("");
  const [searchParams] = useSearchParams();
  const {authToken} = useContext(AuthContext);
  const [s, setS] = useState("")
  const [open, setOpen] = useState(false);
  let center = 'anna'
  let navigator = useNavigate();




let bookSlot = async ()=>{
    console.log('Updating');
    let responce = await fetch('/api/centers/slot/book/', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+String(authToken.access)
},
body: JSON.stringify({center_name:center, slot:s, date:date})
});
console.log(`Bearer ${String(authToken.access)}`);
    if(responce.status === 200){
       setOpen(true);
       navigator('/centers')
    }else{
        alert("something went wrong")
    }
}

useEffect(()=>{
  },[])

  return (
    <div className='w-screen h-screen overflow-hidden'><NavBar />
    <Success open={open} handleopen={setOpen} />
    <div className='w-full h-full flex '>
    <div className='m-auto'>
    <Card className="w-full ">
<CardHeader
        color="blue"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
      >
<div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
  <path fill-rule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clip-rule="evenodd" />
</svg>



</div>
<Typography variant="h4" color="white">
Add Center
</Typography>
</CardHeader>
<CardBody>
<Tabs value={type} className="overflow-visible">
<TabsBody
className="!overflow-x-hidden !overflow-y-visible"
animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }} >
<TabPanel value="card" className="p-0">
<form className="mt-12 flex flex-col gap-4">
<div>
<Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
Center Name
</Typography>
<Input label='Center Name'/>
</div>
 
                <div className="my-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Date
                  </Typography>
                  <DatePicker label="Start date" />
                  <DatePicker label="End date" className="mt-3" />
                  
                </div>
                <Button size="lg" onClick={bookSlot}>Save</Button>
                
              </form>
            </TabPanel>
            
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
    </div>
    </div>
    </div>
  )
}

export default AddPage
