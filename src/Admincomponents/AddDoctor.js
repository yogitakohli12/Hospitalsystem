
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function AddDoctor() {
  const [doctor, setdoctor] = useState({

    name: '',
    email: '',
    passward: '',
    special: '',
    phone: '',
    Address: '',
    Gender: '',
    experienced: '',
    age: ''
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/doctorsignup', {
      method: 'POST',
      body: JSON.stringify(
        doctor),
      headers: {
        'Content-Type': 'application/json',

      },
    }).then((response) => response.json())
      .then((data) => { console.log(data, "user registered") })
    alert('Doctor successfully added...👩‍⚕️');

  };

  const handleform = (e) => {
    setdoctor({
      ...doctor,
      [e.target.name]: e.target.value
    });
  };

  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/AddDoctor', {
      method: 'GET',
    });
    console.log(response);
  };

  useEffect(() => {
    getUsers();
  }, []);



  return (
    <>
      <Dashboard />
      <div id='dashcontain'>

        <Adminheader />
        <div id='head'>
          <Link to="/doctors"><button>Doctors</button></Link>
          <Link to="/adddoctor"><button>Add Doctor</button></Link>

        </div>
        <br />
        <br />

        <form onSubmit={handlesubmit} id='addform' >
          <div id='col1'>
            <span>name</span>
            <span>email</span>
            <span>phone</span>
            <span>Gender</span>
            
          </div>
          <div id='col2'>
            <input type="text" name='name' onChange={handleform} />
            <input type="email" name="email" id="email" onChange={handleform} />
            <input type="number" name="phone" id="phone" onChange={handleform} />
            <input type="text" name='Gender' onChange={handleform} />
            
           
          </div>
          <div id='col3'>
            <span>passward</span>
            <span>Speciality</span>
            <span>age</span>
            <span>Address</span>
            
          </div>
          <div id='col4'>
            <input type="password" name="passward" id="passward" onChange={handleform} />
            <input type="text" name="special" id="special" onChange={handleform} />
            <input type="number" name="age" id="age" onChange={handleform} />
            <input type="text" name='Address' onChange={handleform} />
          </div >
          
          <div id='col5'>
          <span>Experienced</span>
          <input type="text" name='experienced' style={{width:"52vh" , position:"absolute" , marginLeft:"12%" , marginTop:"0.5%"}} onChange={handleform} />
          </div>
        <button type='submit' id='formsubmit' >Add Doctor</button>
        </form>
       
      </div>
    </>
  )
}

export default AddDoctor
