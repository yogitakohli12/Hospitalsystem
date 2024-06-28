import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Addemployees() {

  const [Employee, setemployee] = useState({
    name: '',
    email: '',
    age:'',
    phone: '',
    position: '',
    Address: '',
    Gender: '',
    
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/AddEmployee', {
      method: 'POST',
      body: JSON.stringify(Employee),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    alert('Employee...🧑‍🔧successfully added');
    console.log(data);
  };

  const handleform = (e) => {
    setemployee({
      ...Employee,
      [e.target.name]: e.target.value
    });
  };

  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/AddEmployee', {
      method: 'GET'
    });
    console.log(response);
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <>
     <Dashboard/>
    <div id='dashcontain'>
      <Adminheader/>
      <div id='head'>
        <Link to="/employee"><button>Employees</button></Link>
        <Link to="/addemployee"><button>Add Employee</button></Link>

      </div>
      <br />
      <br />
      <form onSubmit={handlesubmit} id='addform' >
        <div id="col1">
        <span>name</span>
        <span>Age</span>
        <span>Gender</span>
        </div>

       <div id="col2">
       <input type="text" name='name' onChange={handleform} />
          <input type="number" name="age" id="age" onChange={handleform} />
        <input type="text" name='Gender' onChange={handleform} />
       </div>
           
        <div id="col3">
        <span>email</span>
        <span>phone</span>
        <span>Position</span>
        </div>

       <div id="col4">
       <input type="number" name="phone" id="number" onChange={handleform} />
        <input type="email" name="email" id="email" onChange={handleform} />
        <input type="text" name='position' onChange={handleform} />
       </div>
        
       <div id='col5'>
        <span>Address</span>
        <input type="text" style={{width:"52vh" , position:"absolute" , marginLeft:"12%" , marginTop:"0.5%"}} name='Address' onChange={handleform} />
        </div>
      <button type='submit' id='formsubmit'>Add Employee</button>
      </form>
        
    </div>
    </>
  )
}

export default Addemployees
