import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../Contex/AuthContex";
 
const TABS = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Slot",
    value: "slotNumber",
  },
];
 
const TABLE_HEAD = ["User", "Date", "Slot", ];
// [ 'date', 'slotNumber', 'user']
 
const TABLE_ROWS = [
  {
    center_name: "John Michael",
    starting_date: "1-1-2003",
    job: "Manager",
    org: "Organization",
    creater_name: "admin",
    end_date: "23/04/18",
  },
  
  
];
 
export default function Table2() {
    let [table, setTable]= useState(null);
    let [order, setOrder]= useState("date");
    const [searchParams] = useSearchParams();
    let navigate = useNavigate();
    let center = searchParams.get('center').replace('"', '').replace('"', '');
    
  const {authToken} = useContext(AuthContext);
    
    let updateTable = async ()=>{
        let responce = await fetch('/api/centers/slot/booked/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
        'Content-Type': 'application/json',
        
    'Authorization': 'Bearer '+String(authToken.access)
            },
            body: JSON.stringify({center_name:center, order:order})
        });
        let data = await responce.json();
        console.log(data);
        if(responce.status === 200){
            setTable(data);
        }else{
            alert("something went wrong")
        }
    }
    useEffect(()=>{
       updateTable();
       
    },[order]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Centers list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Centers
            </Typography>
          </div>
          
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="date" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} onClick={(e)=>{TABS.map(({label, value})=>{
                    console.log(label)
                    if (label===e.target.innerText.trim()){
                        setOrder(value);
                    }
                })}} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
         
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table&&table.map(({  date, slotNumber, user }, index) => {
              const isLast = index === table.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
              return (
                
                <tr key={user}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {user}
                        </Typography>
                       
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {date}
                      </Typography>
                      
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      {slotNumber}
                    </div>
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
     
    </Card>
  );
}