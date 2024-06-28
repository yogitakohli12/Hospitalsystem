import React, { useState, useEffect } from 'react'
import patimage from '../images/patient.png';
import { Link, useParams } from 'react-router-dom'
import {Carousel} from './Carousel'
function Patienthome() {


  
const[departmentt , settdepartment]=useState()

function departmentment(){
  fetch("http://localhost:8000/department").then((res)=>res.json()).then(settdepartment).catch((err)=>{console.log("error",err)
})
}

const [info , setinfo] = useState({})
const getlogininfo = async () =>{
  try {
    const res = await fetch('/patientlogininfo' , {
      method:"GET",
      headers:{
       
        "Contect-Type":"application/json"
      },
      
    });
    const data = await res.json();
    setinfo(data);
if (!res.status === 200) {
  const error = new Error(res.error);
  throw error;
}

  } catch (error) {
    console.log(error)
  }
}
  const [Doctordata, setDoctordata] = useState()
  const email = useParams()
  function getDoctordata() {
    fetch(`http://localhost:8000/getdoctor/${email}`).then((res) => res.json())
      .then(setDoctordata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  }

  const [Employeedata, setEmployeedata] = useState()
  const emaill = useParams()
  function getEmployeedata() {
    fetch(`http://localhost:8000/AddEmployee/${emaill}`)
      .then((res) => res.json())
      .then(setEmployeedata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  };


  const [Laboratories, setLaboratories] = useState()
  function getLab() {
    fetch('http://localhost:8000/getlab').then((res) => res.json())
      .then(setLaboratories)
  }


  const [Recaptionistdata, setRecaptionistdata] = useState()
  function getRecaptionistdata() {
    fetch('http://localhost:8000/getrecaptionist').then((res) => res.json())
      .then(setRecaptionistdata)
  }

  
  const [setdata, setadmindata] = useState({
    data: ""
  })

  function fetchdataadmin() {
    fetch("http://localhost:8000/patientdata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setadmindata({ data: data.data })
      })
  }

  useEffect(() => {
    getDoctordata();
    getEmployeedata();
    getLab();
    getRecaptionistdata();
    getlogininfo();
    fetchdataadmin();
    departmentment();
  }, []);



  return (
    < div id='patienthome' >
      < div id='dashpatient' >
      <img src={patimage} alt="p" style={{  width: "40px", height: "40px", borderRadius: "100px" }} />
        {/* <img src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt="admin" /> */}
        <h2>Patient ({setdata.data.patientname})</h2>
       <div id='buttons'>
      <Link to="/patientsignup" ><button>Take Appoinments</button></Link>
          {/* <Link to="#doctor"  ><button className='but1'>Doctor</button></Link>
          <Link to="#blood" ><button>Blood Bank</button></Link>
          <Link to="#employee" ><button>Employees</button></Link>
          <Link to="#department" ><button>Departments</button></Link>
          <Link to="#labs" ><button>Laboratories</button></Link>
          <Link to="#reception" ><button>Receptionist</button></Link> */}
          <Link to="/patientlogin" ><button>Exit</button></Link>
        </div>
      </div>



      {/* <div className='carausal' style={{backgroundColor:"pink"}}>
<Carousel/>

      </div> */}

      


      <div className='patientss' id='patient' >
       
        <h1 >Doctors </h1>
<br />
<br />
        <div id="patientpanel-headin">
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Speciality</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Experienced</h4>
         <br />
         <br />
        </div>
        {Doctordata?.map((doctor) => {
          return (
            <div className="Patientpanel-doctor"  >
              {/* <img src={doctor.photo} alt="desktop" /> */}
              <p>{doctor.name}</p>

              <p>{doctor.email}</p>
              <p>{doctor.special}</p>
              <p>{doctor.phone}</p>
              <p>{doctor.Address}</p>
              <p>{doctor.Gender}</p>
              <p>{doctor.experienced}</p>
              <br />
              <br />
            </div>
          )
        })}
       
     
      </div>
      <div id='blood' >
        <h2 style={{ textAlign: "center" }}>Blood Bank</h2>
        <div id='blood' >
          <table id='table' >
            <th>
              <td>#</td>
              <td>Blood Group</td>
              <td>No. of Bags</td>
            </th>
            <tr>
              <td>1</td>
              <td>A+</td>
              <td>12</td>
            </tr>
            <tr>
              <td>2</td>
              <td>A-</td>
              <td>0</td>
            </tr>
            <tr>
              <td>3</td>
              <td>B+</td>
              <td>0</td>
            </tr>
            <tr>
              <td>4</td>
              <td>B-</td>
              <td>2</td>
            </tr>
            <tr>
              <td>5</td>
              <td>O+</td>
              <td>8</td>
            </tr>
            <tr>
              <td>6</td>
              <td>O-</td>
              <td>12</td>
            </tr>
            <tr>
              <td>7</td>
              <td>AB+</td>
              <td>12</td>
            </tr>
            <tr>
              <td>8</td>
              <td>AB-</td>
              <td>6</td>
            </tr>
          </table>
        </div>
      </div>

      <div style={{ backgroundColor: "bisque" }} id='employee'>
        <br />
        <br />
        <br />
        <br />
        <h2 style={{ textAlign: "center" }}>Available Employees</h2>

        <br />
        <br />
        <br />
        <div id='patientheading' style={{ padding: " 20px 40px" }}>
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Position</h4>

          <h4>Options</h4>
          
        </div>
        <br />
        {Employeedata?.map((employee) => {
          return (
            <>
              <div className='Patient' style={{ padding: " 10px 40px" }}>
                {/* <p>emoji</p> */}
                <p>{employee.name}</p>
                <p>{employee.email}</p>
                <p>{employee.age}</p>
                <p>{employee.phone}</p>
                <p>{employee.Address}</p>
                <p>{employee.Gender}</p>
                <p>{employee.position}</p>
                <br />
                <br />
              </div>
            </>
          )
        })}
        <br /><br />
        <br />
        <br />
       <br />
      </div>
      
      <div style={{ backgroundColor: "grey", color:"white" }} >
        <br />
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }} >Departments</h1>
        <br />
        <br />
        <table id='table'>
          <th>
       <td>S.NO</td>
       <td>Department</td>
       
      </th>
          </table>
        {departmentt?.map((dep)=>{
return <>
    <table  id='table' >
      <tr>
        <td>{dep.sno}</td>
        <td>{dep.department}</td>
      </tr>
     
    </table>
</>
            })}

            
      <br />
      <br />
      </div>


      <div style={{ backgroundColor: "pink" }} id='labs' >
        <br />
        <br />
        <br />
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }}>Labss</h1>
        <br />
        <br />
        <br />
        <div id="patientheading" style={{ padding: " 20px 40px" }}>
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Honour</h4>
          <h4>Phone</h4>
          <h4>Department</h4>
          <h4></h4>
          <h4>Options</h4>

        </div>
<br />
        {Laboratories?.map((Lab) => {
          return (
            <div className="Patient" style={{ padding: " 20px 40px" }} >
              {/* <p>emoji</p> */}
              <p>{Lab.name}</p>
              <p>{Lab.email}</p>
              <p>{Lab.Honour}</p>
              <p>{Lab.phone}</p>
              <p>{Lab.department}</p>
              <p>{Lab._id}</p>
              <br />
              <br />
            </div>
          )
        })}
        <br />
        <br />
        <br />
      </div>


      <div style={{ backgroundColor: "green" }} id='reception' >
        <br />
        <br />
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }}>Receptionist</h1>
        <br />
        <br />
        <div id="patientheading" style={{ padding: " 20px 40px" }}>
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>Salary</h4>
          <h4>Department</h4>
          <h4></h4>
          <h4>Options</h4>
        </div>
<br />
        {Recaptionistdata?.map((recaptionist) => {
          return (
            <div className="Patient" style={{ padding: " 20px 40px" }} >
              {/* <p>emoji</p> */}
              <p>{recaptionist.name}</p>
              <p>{recaptionist.email}</p>
              <p>{recaptionist.age}</p>
              <p>{recaptionist.phone}</p>
              <p>{recaptionist.salary}</p>
              <p>{recaptionist.department}</p>
              <br />
            </div>
          )
        })}
        <br />
        <br />
        <br />
      </div>


      <div style={{ backgroundColor: "yellowgreen" , border:"2px solid red" , margin:"10%" , padding:"5%"}} id='patient' >
        
        
        <h1 style={{ display: "flex", justifyContent: "center" }}>Profile</h1>
        <br />
        <br />
        <div id="patientheading" style={{ padding: " 20px 40px" }}>
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Password</h4>
          <h4>Doctor</h4>
          <h4>Age</h4>
          <h4>Disease</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          
        </div>

        <div className="Patient" style={{ padding: " 20px 40px" }} >
            {/* <p>emoji {setdata.data.images}</p> */}

            {/* <img src={setdata.data.images} style={{width:"50px" , height:"50px"}} alt="yubhjbhjb" /> */}
            
            <h5>{setdata.data.patientname}</h5>
            
            <p>{setdata.data.patientemail}</p>
            
            <p>{setdata.data.patientpassward}</p>
            <p>{setdata.data.doctor}</p>
            
            <p>{setdata.data.age}</p>
            
            <p>{setdata.data.disease}</p>
            
            <p>{setdata.data.phone}</p>
            
            <p>{setdata.data.Address}</p>
           
            <p>{setdata.data.Gender}</p>
          </div>

        <br />
        <br />
      </div>


    </div>
  )
}

export default Patienthome;
