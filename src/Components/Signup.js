// import axios from 'axios';
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate()
  const [signup, setsignup] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    Gender: '',
    
  });


  const handlesubmit = async (e) => {
    e.preventDefault();
   
     await fetch('http://localhost:8000/signup', {
      
      
    method: 'POST',
    body: JSON.stringify(
      signup),
    headers: {
      'Content-Type': 'application/json',
    },
    }).then((response) => response.json())
    .then((data) =>{console.log(data , "user registered")})
    navigate('/login')
    alert('Admin signup successfully..👩‍💻😎');
    return false
  };

  

  const handleform = (e) => {
    setsignup({
      ...signup,
      [e.target.name]: e.target.value
    });
  };
  return (
    <form id='signup' onSubmit={handlesubmit} >
      <div style={{marginLeft:"50%" }}>
        <h2>Signup</h2>
        <br />
        <span>name</span>
        <input type="text" placeholder='name' name='name' onChange={handleform} />
        <br />

        <span>email</span>
        <input type="email" placeholder='email' name="email" id="email" onChange={handleform} />
        <br />

        {/* <span>Image</span>
        <input value={images} id='photoimage' placeholder='imagepath' onChange={onChangeImages} /> */}
        
<br />
        <span>password</span>
        <input type="password" placeholder='password' name="password" id="password" onChange={handleform} />

        <br />
        <span>phone</span>
        <input type="number" placeholder='phone' name="phone" id="number" onChange={handleform} />
        <br />

        <span>Gender</span>
        <input type="text" placeholder='Gender' name="Gender" id="Gender" onChange={handleform} />
        <br />
        <button  type='submit' style={{width:"100%" , backgroundColor:"green" , border:"none"}}>Signup</button>
        <br />
        <Link to="/login"><button style={{width:"100%"}}>login</button></Link>


      </div>
    </form>
  )
}

export default Signup
