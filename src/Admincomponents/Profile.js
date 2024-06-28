import React, { useState, useEffect } from 'react'
import admin from "../images/admin.png"
import { Link } from 'react-router-dom'
import Dashboard from '../Components/Dashboard'
import Adminheader from '../Components/Adminheader'
function Profile() {
  const [setdata, setadmindata] = useState({
    data: ""
  })
  function fetchdataadmin() {
    fetch("http://localhost:8000/admindata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setadmindata({ data: data.data })
      })
  }
  useEffect(() => {
    fetchdataadmin();
    
  }, []);

  return (
    <>
     <Dashboard/>
      <div id='dashcontain'>
      <Adminheader/>
        <div id='information'>
       
          <img src={admin} alt="" width={100} height={100}  />

        <div id='data'>
          <div id='info'>
            <p>Id</p>
            <br />
            <p>Name</p>
            <br />
            <p>Email</p>
            <br />
            <p>Password: </p>
            <br />
            <p>Phone</p>
            <br />
            <p>Gender</p>
            <br />
            <Link to="/" id='logoutt' ><button >Logout</button></Link>
           
          </div>

          <div id='info2'>
            <p>{setdata.data._id}</p>
            <br />
            <p>{setdata.data.name}</p>
            <br />
            <p>{setdata.data.email}</p>
            <br />
            <p>{setdata.data.password}</p>
            <br />
            <p>{setdata.data.phone}</p>
            <br />
            <p>{setdata.data.Gender}</p>
            
          </div>
          {/* <Link to={`/updateProfile/${setdata.data._id}/${setdata.data.email}/${setdata.data.name}/${setdata.data.phone}/${setdata.data.Gender}`}>
              <button>update</button></Link> */}
           
             
          </div>
          
        </div>
        
      </div>
    </>
  )
}

export default Profile
