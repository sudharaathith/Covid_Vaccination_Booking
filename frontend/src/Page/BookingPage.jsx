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
 


const BookingPage = () => {
  const [type, setType] = React.useState("card");
  const [slot, setSlot] = React.useState({lodaing:"lodaing"});
  const [date, setDate] = React.useState("");
  const [searchParams] = useSearchParams();
  const {authToken} = useContext(AuthContext);
  const [s, setS] = useState("")
  const [open, setOpen] = useState(false);
  let center = searchParams.get('center').replace('"', '').replace('"', '');
  let navigator = useNavigate();


  let updateSlot = async ()=>{
    console.log('Updating');
    let responce = await fetch('/api/centers/slot/avilable/', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
    'Content-Type': 'application/json'
        },
        body: JSON.stringify({center_name:center})
    });
    console.log(center)
    let data = await responce.json();
    console.log(data);
    if(responce.status === 200){
       setSlot(data);
    }else{
        alert("something went wrong")
    }
}

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
      updateSlot();
    
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
  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
</svg>


</div>
<Typography variant="h4" color="white">
Book Yout Slot
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
<Typography>{center}</Typography>
</div>
 
                <div className="my-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Slot Details
                  </Typography>
                  <Select  onChange={(e)=>{
                    setDate(e);
                    
                  }} label="Date" menuProps={{ className: "h-48" }}>
                    {Object.keys(slot).map((d) => (
                      <Option key={d} value={d}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                  <div className='mt-3'>
                  {
                    date&&<Select onChange={(e)=>{setS(e)}}  label='Slot' className='' mt menuProps={{ className: "h-48" }} >
                        {slot[date].map((d) => (
                            <Option key={d} value={d}>
                            {d}
                          </Option>
                        ))}
                    </Select>
                  }
                  </div>
                </div>
                <Button size="lg" onClick={bookSlot}>Book Now</Button>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                  secure and encrypted
                </Typography>
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

export default BookingPage