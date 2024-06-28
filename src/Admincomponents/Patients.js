import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import del from '../images/delete.png';
import edit from '../images/edit.png';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Patients() {
  const [patientdata, setPatientData] = useState([]);
  
  

  
  

  const getPatientData = () => {
    fetch('http://localhost:8000/AddPatient')
      .then((res) => res.json())
      .then((data) => {
        setPatientData(data);
        console.log(data,"data")
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  };

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

  useEffect(() => {
    getPatientData();
    
  }, []);

  return (
<>
<Dashboard/>
    <div id="dashcontain">
      <Adminheader/>
      <div id='head'>
        <Link to="/patients"><button>Patients</button></Link>
        <Link to="/addpatient"><button>Add Patient</button></Link>

      </div>
     
      <h1 style={{ textAlign: 'center' }}>Patients</h1>
      
       <div id="patientheading">
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>Doctor</h4>
          <h4>Medicine</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Disease</h4>
          <h4>Action</h4>
        </div>
        <Scrollbars autoHide style={{ width: 1000, height: 380 }} >
       
        <form >
          {patientdata.map((patient) => (
            <div className="Patient" key={patient.patientemail}>
              {/* <p> <img src={patient.photoimage}  alt={patient.photoimage}  
               style={{width:"100px",height:"100px"}} /> </p>*/}
              <p>{patient.patientname}</p>
              <p>{patient.patientemail}</p>
              <p>{patient.age}</p>
              <p>{patient.phone}</p>
              <p>{patient.doctor}</p>
              <p>{patient.medicine}</p>
              <p>{patient.Address}</p>
              <p>{patient.Gender}</p>
              <p>{patient.disease}</p>
              <Link  to={`/updatePatient/${patient.patientemail}/${patient.patientname}/${patient.phone}/${patient.age}/${patient.Address}/${patient.Gender}/${patient.disease}/${patient.doctor}`} ><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>
               <img src={del} alt="" onClick={() => deletePatient(patient.patientemail)} style={{height:"35px" , width:"35px" , borderRadius:"50%" }} />


            </div>
          ))}
        </form>
      </Scrollbars>
    </div>
    </>
  );
}

export default Patients;