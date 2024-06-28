// import React from 'react'
import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import resimage from '../images/reception .png';
import back from '../images/back.png';
function Reslogin() {

  const [email , setemail] = useState()
  const [passward , setpassward] = useState()
  
  const navigate = useNavigate()
  const handlesubmit =async(e)=>{
  e.preventDefault();
  
  axios.post('http://localhost:8000/reslogin',{ email , passward })
  .then(result => {
    if(result.data.status == "ok"){
      window.localStorage.setItem("token",result.data.data);
      navigate('/reshome')
      alert('Successfully Login👩‍🏭');
    } 
     else{
      alert('Please insert all correct cradentials ');
    }
  })
  .catch(err =>console.log(err))
  };
  return (
   <>
   <form  id='login' onSubmit={handlesubmit}>
      
      <div id='loginpage'>
      <img src={resimage} alt=""  style={{background:"none" , width:"25px" , height:"25px" , borderRadius:"100px" ,mixBlendMode:"multiply"}} />
          <p style={{ marginTop:"3px"}}>Reception</p>
          {/* <Link to='/' ><img src={back} alt='back'style={{width:"30px" , height:"30px" , display:"flex"  , marginLeft:"193px" , position:"absolute" , borderRadius:"50%"}}  /></Link> */}
          <div id='logininfo'>
      <h2>Login Page</h2>
      <br />
      <br />
        <span>email</span>
        <input type="email" placeholder='email' name="email" id="email" onChange={(e) => setemail(e.target.value)}  />
        <br />
        
        <span>password</span>
        <input type="password" placeholder='password' name="passward" id="password" onChange={(e) => setpassward(e.target.value)} />
        <br />
        <br />
      
        <button type='submit'>Login</button>
        <br />
        <button ><Link to="/ressignup" style={{color:"white"}}>Signup</Link></button>
       
      </div>
      </div>
      </form>
      
   </>
  )
}

export default Reslogin
