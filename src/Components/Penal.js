import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import call from "../images/call.png"
import telegram from "../images/telegram.png"
import mail from "../images/mail.png"
import hos from "../images/hos.png"
function Penal() {
  
  const[departmentt , settdepartment]=useState()

  function departmentment(){
    fetch("http://localhost:8000/department").then((res)=>res.json()).then(settdepartment).catch((err)=>{console.log("error",err)
  })
  }
  
  useEffect(() => {
    departmentment();
  },[])


  return (
    <div id='penal'>
      <nav>
        <h1>e<span>Hospital</span></h1>
        <div>
          
        <Link to="/about" ><button>About</button></Link>
          <Link to="/login" ><button>Admin</button></Link>
          <Link to="/patientlogin" ><button>Patient</button></Link>
          <Link to="/doctorlogin" ><button>Doctor</button></Link>
          <Link to="/reslogin" ><button>Receptionist</button></Link>
        </div>

      </nav>
<div id='content'>
  <div id="row1">
  <img src={hos} alt="" />
  <p>welcom to<h1>eHospital | </h1><h2>Your Trusted Healthcare Provider</h2> <br />
  <br />Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores delectus porro doloribus iste, beatae iusto blanditiis optio sequi vel facilis repellendus laudantium? Eum ut nemo rerum delectus doloremque? Voluptates, quis?
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem est error voluptates ratione tempora placeat odit, pariatur perspiciatis, repudiandae hic fuga voluptate, deserunt doloribus harum porro magnam iste explicabo vel!
  </p>
  
  </div>
<div id="row2">
  <p>Biography
    <h1>Who We Are</h1>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut harum quaerat esse facere aliquid reiciendis perspiciatis nulla totam dolor? Quis exercitationem corrupti, temporibus esse nam nihil quae officia aperiam tempore. Eligendi sequi obcaecati esse repellat ex vel fugit dicta quas quae, minima beatae, deserunt reiciendis veniam et natus rem pariatur!
  </p>
  <img src="https://t3.ftcdn.net/jpg/02/16/47/22/360_F_216472247_cT66WDoS0fp1s3wC7eaykMJNDGVbOBPq.jpg" alt="" />
</div>

<div id="row3">
  <h1>
    Department
  </h1>
  <br />
  <br />
  <div id='card'>
     {departmentt?.map((dep)=>{
return <>
    <table id='item' >
      

      <tr>
        <td>{dep.sno}st department</td>
        <br />
        <td>{dep.department}</td>
        {/* <img src={del} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%",cursor:"pointer"}} onClick={() => deletedep(dep.sno)} /> */}
      </tr>
     
    </table>
</>
            })}
  </div>
</div>
<br />
<br />


</div>

<footer>
  <h1>eHospital</h1>
  <div >
    <h2>Quik Links</h2>
    <br />
    <div id='links'>
    <Link >home</Link>
    <Link to="">Appoinment</Link>
    <Link to="/about">About</Link>
    </div>
    
  </div>
  <div >
    <h2>Hours</h2>
    <br />
    <div id='daystime'>
    <div >
      <p>Monday</p>
      <p>Tuesday</p>
      <p>Wednesday</p>
      <p>Thursday</p>
      <p>Friday</p>
      <p>Saturday</p>
      <p>Sunday</p>
    </div>
    <div id='times'>
      <p>9:00 AM - 11:00 PM</p>
      <p>12:00 PM - 12:00 AM</p>
      <p>10:00 AM - 10:00 PM</p>
      <p>9:00 AM - 9:00 PM</p>
      <p>3:00 AM - 3:00 PM</p>
      <p>9:00 AM - 3:00 PM</p>
      <p>3:00 AM - 9:00 PM</p>
    </div>
    </div>
  </div>

  <div>
    <h2>Contact</h2>
    <br />
    <div id="contact">
    <div id='img'>
      <img src={call} alt="1"  />
      <img src={mail} alt="2" />
      <img src={telegram} alt="3" />
    </div>
    <div id='detail'>
      <p>9999-45-4444</p>
      <p>ABC@gmail.com</p>
      <p>telegram</p>
    </div>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Penal
