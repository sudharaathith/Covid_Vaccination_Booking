import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const TABS = [
  {
    label: "Name",
    value: "center_name",
  },
  {
    label: "StartDate",
    value: "starting_date",
  },
  {
    label: "EndDate",
    value: "end_date",
  },
];
 
const TABLE_HEAD = ["Name", "StartDate", "EndDate", "Creater", ""];
// ['center_name', 'starting_date', 'end_date', 'created_by' , 'creater_name']
 
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
 
export default function Table() {
    let [table, setTable]= useState(null);
    let [search, setSearch]= useState("");
    let [order, setOrder]= useState("center_name");
    let navigate = useNavigate();
    
    let updateTable = async ()=>{
        let responce = await fetch('/api/centers/search/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
            body: JSON.stringify({search:search, order:order})
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
       
    },[search,order]);

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
          <Tabs value="center_name" className="w-full md:w-max">
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
          <div className="w-full md:w-72">
            <Input label="Search" onChange={(e)=>{
                setSearch(e.currentTarget.value)
            }} icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
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
            {table&&table.map(({ img, center_name, starting_date, creater_name, end_date, date }, index) => {
              const isLast = index === table.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
              return (
                
                <tr key={center_name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {center_name}
                        </Typography>
                       
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {starting_date}
                      </Typography>
                      
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      {end_date}
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {creater_name}
                    </Typography>
                  </td>
                  
                  <td className={classes}>
                    <Tooltip content="Book Slot">
                      <IconButton variant="text" onClick={()=>{navigate('/booking?center="'+center_name+'"')}} color="blue-gray">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>

                      </IconButton>
                    </Tooltip>
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