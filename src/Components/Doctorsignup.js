import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Doctorsignup() {

  const navigate = useNavigate()
  const [doctorsignup, setdoctorsignup] = useState({
    name: '',
    email: '',
    passward: '',
    special:'',
    Gender:'',
    experienced:'',
    age: '',
    
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/doctorsignup', {
      method: 'POST',
      body: JSON.stringify(
        doctorsignup),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) =>{console.log(data , "user registered")})
    navigate('/doctorlogin')
    alert('Doctor signup successfully..👩‍⚕️');
  };
  const handleform = (e) => {
    setdoctorsignup({
      ...doctorsignup,
      [e.target.name]: e.target.value
    });
  };
  return (
    <form id='signup' onSubmit={handlesubmit}>
      <div style={{width:"150vh" , marginLeft:"52%"}}>
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

        <span>special</span>
        <input type="text" placeholder='special' name="special" id="special" onChange={handleform} />
        <br />

        <span>experienced</span>
        <input type="text" placeholder='experienced' name="experienced" id="experienced" onChange={handleform} />
        <br />


        <span>age</span>
        <input type="number" placeholder='age' name="age" id="age" onChange={handleform} />
        <br />


        <button type='submit' style={{width:"100%" , backgroundColor:"blue" , height:"50px", color:"white"}}>Signup</button>
        <br />
        <Link to="/doctorlogin"><button style={{width:"100%" ,  backgroundColor:"grey" , height:"40px" , border:"none", color:"black"}}>login</button></Link>

      </div>
    </form>
  )
}

export default Doctorsignup;
