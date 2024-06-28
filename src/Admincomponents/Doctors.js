import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import del from '../images/delete.png';
import edit from '../images/edit.png';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Doctors() {

  const [Doctordata, setDoctordata] = useState()
  
  const email =useParams()
  function getDoctordata() {
    fetch(`http://localhost:8000/getdoctor/${email}`).then((res) => res.json())
      .then(setDoctordata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  }
  useEffect(() => {
    getDoctordata();
  },[]);

  const deletedoctor = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/Deletedoctor/${email}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        // Remove the deleted doctor from the state
        setDoctordata((prevData) => prevData.filter((doctor) => doctor.email !== email));
      } else {
        console.error('Failed to delete doctor');
      }

    } catch (error) {
      console.error('Error deleting doctor:', error);
    }

  };

  return (
    <>
    <Dashboard/>

      
    <div id='dashcontain'>
      
        <Adminheader/>
        
        <div id='head'>
       <Link to="/doctors"><button>Doctors</button></Link>
       <Link to="/adddoctor"><button>Add Doctor</button></Link>

      </div>
      <br />
      
        <h2 style={{ textAlign: "center" }}>Doctor Available</h2>
        <br />
       <div >
        <Scrollbars autoHide style={{ width: 1000, height: 380  }}  >
      
        <div id="patientheading">
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Speciality</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Experienced</h4>
          <h4>Options</h4>
        </div>
        {Doctordata?.map((doctor) => {
          return (
            <div className="Patient"  >
              {/* <img src={doctor.photo} alt="desktop" /> */}
              <p>{doctor.name}</p>
              <p>{doctor.email}</p>
              <p>{doctor.special}</p>
              <p>{doctor.phone}</p>
              <p>{doctor.Address}</p>
              <p>{doctor.Gender}</p>
              <p>{doctor.experienced}</p>
              <Link to={`/updatedoctor/${doctor.email}/${doctor.name}/${doctor.phone}/${doctor.special}/${doctor.Address}/${doctor.Gender}/${doctor.experienced}`}><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>
               <img src={del} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%"}} onClick={() => deletedoctor(doctor.email)} />
            </div>
            
          )
        })}
       
        
      </Scrollbars>
      </div>
      <br />
    </div>
    </>
  )
}

export default Doctors
