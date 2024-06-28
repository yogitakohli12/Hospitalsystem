import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';

function AddAccountants() {


  const [accountant, setaccountant] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    address: '',
    salary: '',
    department: '',

  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/addAccountant', {
      method: 'POST',
      body: JSON.stringify(accountant),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    alert("Accountant..👩‍🏭 added succesfully")
    console.log(data);
  };

  const handleform = (e) => {
    setaccountant({
      ...accountant,
      [e.target.name]: e.target.value
    });
  };

  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/addAccountant', {
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
          <Link to="/accountants"><button  >Accountant</button></Link>
          <Link to="/addaccountant"><button >Add Accountant</button></Link>

        </div>
        <br />
        <br />


        <form onSubmit={handlesubmit} id='addform' >
          <span>Name</span>
          <input type="text" name='name' onChange={handleform} />
          
          <span>Email</span>
           <input type="email" name="email" id="email" onChange={handleform} />
          
          <span>Age</span>
          <input type="number" name="age" id="age" onChange={handleform} />
          
          <span>phone</span>
          <input type="number" name="phone" id="phone" onChange={handleform} />
          
          <span>Salary</span>
          <input type="text" name='salary' onChange={handleform} />
          
          
          <label>Department</label>
          <select type="text" name="department" id="department" onChange={handleform}>
            {departmentt?.map((dep) => {
              return <>
                <option >{dep.department}</option>
              </>
            })}
          </select>
        
          <button id='formsubmit' type='submit'>Add Accountant</button>
        </form>

      </div>
    </>
  )
}

export default AddAccountants
