import React, { useEffect, useState } from 'react'
import { LineChart, Line, AreaChart, Bar, BarChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Calender from '../Components/Calender';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Main() {


  const [MEDICINEdata, setMEDICINEdata] = useState([])
  function getMEDICINEdata() {
    fetch('http://localhost:8000/medicine').then((res) => res.json())
      .then(setMEDICINEdata)
  }


  useEffect(() => {
    getMEDICINEdata();
  }, []);


  const Blood = [
    {
      name: 'A+',
      quantity: 13,
      fees: 10
    },
    {
      name: 'B+',
      quantity: 15,
      fees: 12
    },
    {
      name: 'AB+',
      quantity: 5,
      fees: 10
    },
    {
      name: 'A-',
      quantity: 10,
      fees: 5
    },
    {
      name: 'B-',
      quantity: 9,
      fees: 4
    },
    {
      name: 'O-',
      quantity: 10,
      fees: 8
    },
    {
      name: 'O+',
      quantity: 10,
      fees: 8
    },
    {
      name: 'AB-',
      quantity: 10,
      fees: 8
    },
  ];



  return (
    <>
   <Dashboard/>
      <div id='dashcontain'>

       <Adminheader/>

          <div id='appoin'>
            <div id='appoin1'>

              <div style={{backgroundColor:"red" , height:"50%" , display:"flex", justifyContent:"center" , alignItems:"center"}}> <h1>2 </h1> <br /> Appoinments </div>

              <div style={{backgroundColor:"green" , height:"50%" , alignItems:"center" , display:"flex" , justifyContent:"center"}}> <h1>30 </h1> <br /> Beds</div>
              
            </div>

            <div id='appoin2' >
              <ResponsiveContainer width="100%" aspect={1.6}>
                <AreaChart data={Blood}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="quantity" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div id='appoin3' >

            <ResponsiveContainer width="100%" aspect={1.6}>
                <AreaChart data={MEDICINEdata}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="quantity" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
              {/* <ResponsiveContainer width="100%" aspect={1.6}>
                <BarChart
                  data={MEDICINEdata}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="name"  />
                  {/* <Bar dataKey="fees" fill="yellow" /> */}
                {/* </BarChart>
              </ResponsiveContainer> */} 
            </div>
          </div>
          <br />
          <h3 style={{ textAlign: "center" }}>Calender</h3>
          
          <br />
          <Calender />
         
        </div>
        
    </>
  )
}

export default Main;
