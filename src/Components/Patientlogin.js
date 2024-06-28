import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import patimage from '../images/patient.png';
import back from '../images/back.png';
function Patientlogin() {

  const [patientemail, setpatientemail] = useState()
  const [patientpassward, setpatientpassward] = useState()

  const navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/patientlogin', { patientemail, patientpassward })
      .then(result => {
        if (result.data.status=="ok") {
          window.localStorage.setItem("token",result.data.data);
          navigate('/patienthome' )
          alert('patient login successfully..🧑‍🔧');
        }
        else {
          alert('Please insert all correct cradentials ');
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <>
      <form id='login' onSubmit={handlesubmit}>

        <div id='loginpage'>
          <img src={patimage} alt="p" style={{ background: "none", width: "25px", height: "25px", borderRadius: "100px" ,mixBlendMode:"darken" }} />
          <p style={{ marginTop: "3px" }}>Patient</p>
          {/* <Link to='/' ><img src={back} alt='back'style={{width:"30px" , height:"30px" , display:"flex"  , marginLeft:"193px" , position:"absolute" , borderRadius:"50%"}}  /></Link> */}
          <div id='logininfo'>
            <h2>Login Page</h2>
            <br />
            <br />
            <span>email</span>
            <input type="email" placeholder='email' name="patientemail" id="email" onChange={(e) => setpatientemail(e.target.value)} />
            <br />

            <span>password</span>
            <input type="password" placeholder='password' name="patientpassward" id="password" onChange={(e) => setpatientpassward(e.target.value)} />
            <br />
            <br />

            <button type='submit'>Login</button>
            <br />
          <button style={{backgroundColor:"grey"}} > <Link to="/patientsignup" style={{color:"white"}}>Signup</Link></button>
          </div>
         
          
        </div>
      </form>

    </>
  )
}

export default Patientlogin
