import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';

function AddLab() {
  const [Lab, setLab] = useState({
    name: '',
    email: '',
    Honour: '',
    department: '',
    phone: '',

  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/addlab', {
      method: 'POST',
      body: JSON.stringify(Lab),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    alert("lab added successfully")
    console.log(data);
  };

  const handleform = (e) => {
    setLab({
      ...Lab,
      [e.target.name]: e.target.value
    });
  };

  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/addlab', {
      method: 'GET'
    });
    console.log(response);
  };

  const [departmentt, settdepartment] = useState()

  function departmentment() {
    fetch("http://localhost:8000/department").then((res) => res.json()).then(settdepartment).catch((err) => {
      console.log("error", err)
    })
  }

  useEffect(() => {
    getUsers();
    departmentment();
  }, []);



  return (
    <>
      <Dashboard />
      <div id='dashcontain'>


        <Adminheader />
        <div id='head'>
          <Link to="/lab"><button>Laboratories</button></Link>
          <Link to="/addlab"><button>Add Laboratories</button></Link>

        </div>



        <form onSubmit={handlesubmit} id='addform' >
          <div id="col1">
            <span>Name</span>
            <span>Email</span>
            <span>Honour</span>
            <span>phone</span>
          </div>


          <div id="col2">
            <input type="text" name='name' onChange={handleform} />
            <input type="email" name="email" id="email" onChange={handleform} />
            <input type="text" name='Honour' onChange={handleform} />
            <input type="number" name="phone" id="phone" onChange={handleform} />
            
          </div>
<br />
<br />
              <div style={{  display: "flex",width:"37%", position:"absolute"  , marginLeft:"1.5%"  , marginTop:"15%" , gap:"52px" , alignItems:"center"}}>
              <label>Department</label>
              <select type="text" name="department" id="doctor" onChange={handleform}>
              {departmentt?.map((dep) => {
                return <>
                  <option >{dep.department}</option>
                </>
              })}
            </select>
              </div>
              
<button type='submit' style={{ width: "460px", height: "40px" , position:"absolute"  , marginLeft:"1.5%"  , marginTop:"25%" , backgroundColor:"green" , color:"white" }}>Add Laboratories</button>
<br />
              </form>

      </div>
    </>
  )
}

export default AddLab
