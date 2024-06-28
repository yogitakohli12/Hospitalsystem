import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate , Link } from 'react-router-dom';
import admin from '../images/admin.png';
import back from '../images/back.png';
function Login() {


const [email , setemail] = useState()
const [password , setpassword] = useState()

const navigate = useNavigate()

const handlesubmit =async(e)=>{
e.preventDefault();

axios.post('http://localhost:8000/login',{ email , password 
  ,method:'POST'
})
.then(result => {
  
  if(result.data.status ==="ok"){
    window.localStorage.setItem("token",result.data.data);
    navigate('/home' )
    alert('Admin login successfully... 👩‍💻');

  } 
   else{
    alert('Please insert all correct cradentials ');
  }
})
.catch(err =>console.log(err));
};

  return (
    <>
    <form  id='login' onSubmit={handlesubmit} >
      
    <div id='loginpage'>
      <img src={admin} alt=""  style={{background:"none" , width:"25px" , height:"25px" , borderRadius:"100px" ,mixBlendMode:"darken" }}/>
    <p style={{ marginTop:"3px"}}>Admin</p>
    {/* <Link to='/' ><img src={back} alt='back'style={{width:"30px" , height:"30px" , display:"flex"  , marginLeft:"38%" , position:"absolute" , borderRadius:"50%"}}  /></Link> */}
    <div id='logininfo'>
    <h2>Login Page</h2>
    <br />
    <br />
      <span>email</span>
      
      <input type="email" placeholder='email' name="patientemail" id="email" onChange={(e) => setemail(e.target.value)}  />
      <br />
      
      <span>password</span>
      
      <input type="password" placeholder='password' name="patientpassward" id="password" onChange={(e) => setpassword(e.target.value)} />
      <br />
      <br />
    
      <button type='submit' >Login</button> 
      <br />
      <Link to="/signup"><button style={{backgroundColor:"green"}}>Signup</button></Link>
     
      </div>
    </div>
    </form>
    
    </>
  )
}

export default Login
