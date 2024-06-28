import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function AddPatient() {
  const [Patient, setpatient] = useState({
    patientname: '',
    patientemail: '',
    patientpassward: '',
    photoimage: '',
    doctor: '',
    medicine:'',
    age: '',
    phone: '',
    disease: '',
    Address: '',
    Gender: '',
  });


//   function image(){

//     var str,
// element = document.getElementById('photoimage');
// if (element != null) {
//     str = element.value;
//     console.log(str, element,"image name is the inerted")
// }
// else {
//     str = null;
// }
// console.log(str,"str")
//   }


  const [Doctordata, setDoctordata] = useState()
  const email = useParams()
  function getDoctordata() {
    fetch(`http://localhost:8000/getdoctor/${email}`).then((res) => res.json())
      .then(setDoctordata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  }

  const [medicinedata , setmedicinedata] =useState()
  function getmedicinedata(){
    fetch("http://localhost:8000/medicine").then((res)=>res.json())
    .then(setmedicinedata)
    .catch((err)=>{
      console.log("error in fetching medicine data")
    });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/patientsignup', {
      method: 'POST',
      body: JSON.stringify(Patient),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type':'multipart/form-data'
      }
    }).then((response) => response.json())
      .then((data) => { console.log(data, "user registered") })
    alert('Patient Added successfully');
    console.log("data of signup ")
  };

  const handleform = (e) => {
    setpatient({
      ...Patient,
      [e.target.name]: e.target.value
    });
  };

  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/AddPatient', {
      method: 'GET'
    });
    console.log(response);
  };
  useEffect(() => {
    getUsers();
    getDoctordata();
    getmedicinedata();
  }, []);



  return (
    <>
      <Dashboard />
      <div id='dashcontain'>
        <Adminheader />
        <div id='head'>
          <Link to="/patients"><button>Patients</button></Link>
          <Link to="/addpatient"><button>Add Patient</button></Link>
        </div>


        <form onSubmit={handlesubmit} id='addform' encType='multipart/form-data' >

          <div id="col1">
            <span>name</span>
            <span>email</span>
            <span>patientpassward</span>
            <span>phone</span>
            <span>Age</span>
            <span>Address</span>
            <span>Disease</span>
            <span>Gender</span>

          </div>


          <div id="col2">

            <input type="text" name='patientname' onChange={handleform} />
            <input type="email" name="patientemail" id="email" onChange={handleform} />
            <input type="password" name="patientpassward" id="patientpassward" onChange={handleform} />


            <input type="number" name="phone" id="number" onChange={handleform} />
            <input type="number" name="age" id="age" onChange={handleform} />
            <input type="text" name='Address' onChange={handleform} />
            <input type="text" name='disease' onChange={handleform} />

            <div style={{  display: "flex",width:"50%", position:"absolute"    , marginTop:"-20%" , gap:"4px" , alignItems:"center" , justifyContent:"center",marginLeft:"10%"}}>
            <label  >Medicine  </label>
            <select id="medicine" style={{height:"30px" , width:"20%"}} name='medicine' onChange={handleform}>
              {medicinedata?.map((MEDICINE) => {
                return (
                  <option  >{MEDICINE.name}</option>
                )
              })}
            </select>
          </div>
            
           
            <input type="text" name='Gender' onChange={handleform} />
          </div>
          <br />
          <div style={{  display: "flex",width:"15%", position:"absolute"  , marginLeft:"52%"  , marginTop:"7%" , gap:"4px" , alignItems:"center"}}>
            <label >Doctor  </label>
            <select id="doctor" name="doctor" onChange={handleform}>
              {Doctordata?.map((doctor) => {
                return (
                  <option  >{doctor.name}</option>
                )
              })}
            </select>
          </div>
          <button type='submit' style={{ width: "180px", height: "40px" , position:"absolute"  , marginLeft:"52%"  , marginTop:"14%" , backgroundColor:"grey" , color:"white" }}>Add Patient</button>
        </form>


      </div>
    </>
  )
}

export default AddPatient
