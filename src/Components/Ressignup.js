// import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Ressignup() {

  const navigate = useNavigate()
  const [ressignup, setressignup] = useState({
    name: '',
    email: '',
    passward: '',
    phone:'',
    Gender:'',
    age: '',
    salary:''
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/ressignup', {
      method: 'POST',
      body: JSON.stringify(
        ressignup),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) =>{console.log(data , "user registered")})
    navigate('/reslogin')
    alert('Resceptionist is signup successfully..👩‍🏭');
  };
  const handleform = (e) => {
    setressignup({
      ...ressignup,
      [e.target.name]: e.target.value
    });
  };
  return (
    <form id='signup' onSubmit={handlesubmit}>
      <div style={{marginLeft:"52%"}}>
        <h2>Signup</h2>
        <br />
        <span>name</span>
        <input type="text" placeholder='name' name='name' onChange={handleform} />
        <br />

        <span>email</span>
        <input type="email" placeholder='email' name="email" id="email" onChange={handleform} />
        <br />

        <span>password</span>
        <input type="password" placeholder='password' name="passward" id="password" onChange={handleform} />

        <br />
       

        <span>Gender</span>
        <input type="text" placeholder='Gender' name="Gender" id="Gender" onChange={handleform} />
        <br />

        <span>phone</span>
        <input type="number" placeholder='phone' name="phone" id="phone" onChange={handleform} />
        <br />


        <span>age</span>
        <input type="number" placeholder='age' name="age" id="age" onChange={handleform} />
        <br />
        
        <span>salary</span>
        <input type="number" placeholder='salary' name="salary" id="salary" onChange={handleform} />
        <br />
        <button type='submit' style={{width:"100%" , border:"green 2px solid" , backgroundColor:"green" , color:"white"}}>Signup</button>
        <br />
        <Link to="/reslogin"><button style={{width:"100%" }}>login</button></Link>

      </div>
    </form>
  )
}

export default Ressignup;
