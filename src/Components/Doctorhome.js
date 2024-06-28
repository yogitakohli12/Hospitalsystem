import React,{useState,useEffect} from 'react'
import {  Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import edit from '../images/edit.png';
import del from '../images/delete.png'
import docimage from '../images/doctor.png';
function Doctorhome() {

  const [doctordata, setdoctordata] = useState({
    data: ""
  })
  function fetchdatadoctor() {
    fetch("http://localhost:8000/doctordata", {
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
        setdoctordata({ data: data.data })
      })
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

  const [patientlogindata, setpatientlogindata] = useState()
  function getpatientlogindata() {
    fetch('http://localhost:8000/patientlogin').then((res) => res.json())
      .then(setpatientlogindata)
  }


  const [data, setdata] = useState([])
  function getDoctorlogindata() {
    fetch('http://localhost:8000/signup').then((res) => res.json())
      .then(setdata)
  }

  useEffect(() => {
    fetchdatadoctor();
    getDoctordata();
    getEmployeedata();
    getLab();
    getRecaptionistdata();
    getpatientlogindata();
    getDoctorlogindata();
  }, []);

  const [patientdata, setPatientData] = useState([]);
  const deletePatient = async (patientemail) => {
    try {
      const response = await fetch(`http://localhost:8000/DeletePatient/${patientemail}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Remove the deleted patient from the state
        setPatientData((prevData) => prevData.filter((patient) => patient.patientemail !== patientemail));
      } else {
        console.error('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };




  return (
    <div id='patienthome'>
        < div id='dashpatient' >
        {/* <img src={docimage} alt="" /> */}
        {/* <img src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt="admin" /> */}
        
        <h2>Doctor ({doctordata.data.name})</h2>
        {/* <div id='buttons'>
          <Link to="#doctor"  ><button className='but1'>Doctor</button></Link>
          <Link to="#blood" ><button>Blood Bank</button></Link>
          <Link to="#employee" ><button>Employees</button></Link>
          <Link to="#department" ><button>Departments</button></Link>
          <Link to="#labs" ><button>Laboratories</button></Link>
          <Link to="#reception" ><button>Receptionist</button></Link>
          <Link to="#patient" ><button>Patient</button></Link>
          <Link to="/patientlogin" ><button>Exit</button></Link>
        </div> */}
      </div>

      
      <div  >
        <br />
        <h1 style={{ display: "flex", justifyContent: "center",  marginTop:"70px"}}>Doctors </h1>

        <div id="patientheading" >
          <h4>user</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Speciality</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Experienced</h4>
        </div>
        {Doctordata?.map((doctor) => {
          return (
            <div className="Patient"  key={email} >
              <img src={doctor.photo} alt="desktop" />
              <p>{doctor.name}</p>
              <p>{doctor.email}</p>
              <p>{doctor.special}</p>
              <p>{doctor.phone}</p>
              <p>{doctor.Address}</p>
              <p>{doctor.Gender}</p>
              <p>{doctor.experienced}</p>
            </div>

          )
        })}
      </div>


      <br />
      <br />
      <br />
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
        <h2 style={{ textAlign: "center" }}>Available Employees</h2>

        <br />
        <br />
        <div id='patientheading' style={{ padding: " 20px 40px" }}>
          <h4>user</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Position</h4>

          <h4>Options</h4>
        </div>
        {Employeedata?.map((employee) => {
          return (
            <>
              <div className='Patient' style={{ padding: " 10px 40px" }} key={email}>
                <p>emoji</p>
                <p>{employee.name}</p>
                <p>{employee.email}</p>
                <p>{employee.age}</p>
                <p>{employee.phone}</p>
                <p>{employee.Address}</p>
                <p>{employee.Gender}</p>
                <p>{employee.position}</p>
              </div>
            </>
          )
        })}
      </div>
      <br />
      <br />


      <div style={{ backgroundColor: "blue" }} id='department'>
        <br />
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }}>Departments</h1>
        <br />
        <br />
      </div>

      <div style={{ backgroundColor: "pink" }} id='labs' >
        <br />
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }}>Labss</h1>
        <br />
        <div id="patientheading" style={{ padding: " 20px 40px" }}>
          <h4>user</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Honour</h4>
          <h4>Phone</h4>
          <h4>Department</h4>
          <h4></h4>
          <h4>Options</h4>
        </div>

        {Laboratories?.map((Lab) => {
          return (
            <div className="Patient" style={{ padding: " 20px 40px" }}  >
              <p>emoji</p>
              <p>{Lab.name}</p>
              <p>{Lab.email}</p>
              <p>{Lab.Honour}</p>
              <p>{Lab.phone}</p>
              <p>{Lab.department}</p>
              <p>{Lab._id}</p>
            </div>
          )
        })}
      </div>


      <div style={{ backgroundColor: "green" }} id='reception' >
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }}>Receptionist</h1>
        <br />
        <div id="patientheading" style={{ padding: " 20px 40px" }}>
          <h4>user</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>Salary</h4>
          <h4>Department</h4>
          <h4></h4>
          <h4>Options</h4>
        </div>

        {Recaptionistdata?.map((recaptionist) => {
          return (
            <div className="Patient" style={{ padding: " 20px 40px" }}  >
              <p>emoji</p>
              <p>{recaptionist.name}</p>
              <p>{recaptionist.email}</p>
              <p>{recaptionist.age}</p>
              <p>{recaptionist.phone}</p>
              <p>{recaptionist.salary}</p>
              <p>{recaptionist.department}</p>
            </div>
          )
        })}
      </div>

      <div style={{ backgroundColor: "green" ,color:"white"}} id='patient' >
        <br />
        <h1 style={{ display: "flex", justifyContent: "center" }}>Patient</h1>
        <br />

        <div id="patientheading" style={{ padding: " 20px 40px" }}>
          <h4>user</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Password</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>disease</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Options</h4>
        </div>

        {patientlogindata?.map((patient) => {
          return ( 
            <div className="Patient" style={{ padding: " 20px 40px" , color:"white"}} >
              <h1>emojiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</h1>
              <p>{patient.patientname}</p>
              <p>{patient.patientemail}</p>
              <p>{patient.patientpassward}</p>
              <p>{patient.age}</p>
              <p>{patient.phone}</p>
              <p>{patient.disease}</p>
              <p>{patient.Address}</p>
              <p>{patient.Gender}</p>
              
              {/* <Link  to={`/updatePatient/${patient.patientemail}/${patient.patientname}/${patient.phone}/${patient.age}/${patient.Address}/${patient.Gender}/${patient.disease}`} ><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>

              <img src={del} alt="" onClick={() => deletePatient(patient.patientemail)} style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Doctorhome
