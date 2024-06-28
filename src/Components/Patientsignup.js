
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

function Patientsignup() {

  const navigate = useNavigate()
  const [patientsignup, setpatientsignup] = useState({
    patientname: '',
    patientemail: '',
    patientpassward: '',
    age: '',
    disease: '',
    Address: '',
    phone: '',
    Gender: '',
    // images: '',
    doctor: '',
    medicine:''
  });

  // const { images, patientname,
  //   patientemail,
  //   patientpassward,
  //   age,
  //   disease,
  //   Address,
  //   phone,
  //   Gender,
  //   doctor } = patientsignup


  const [Doctordata, setDoctordata] = useState()
  const email = useParams()
  function getDoctordata() {
    fetch(`http://localhost:8000/getdoctor/${email}`).then((res) => res.json())
      .then(setDoctordata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  }

  const handlesubmit = async (e) => {
      e.preventDefault();

    await fetch('http://localhost:8000/patientsignup', {

    method: 'POST',
    body: JSON.stringify(
      patientsignup),
    headers: {
      'Content-Type': 'application/json',
    },



      // images: (images.slice(0) + '').replace(/\s/g, '').split(','),
      // patientname,
      // patientemail:patientemail||"",
      // patientpassward,
      // age,
      // disease,
      // Address,
      // phone,
      // Gender,
      // doctor
    }).then((response) => response.json())
      .then((data) => { console.log(data, "user registered") })
    navigate('/patientlogin')
    alert('Patient signup successfully...🧑‍🔧😊');

  };

  // const onChangeImages = (e) => setpatientsignup({ images: [e.target.value] })
  // const onchangename =(e)=>setpatientsignup({patientname: e.target.value})
  // const onchangeemail =(e)=>setpatientsignup({patientemail: e.target.value})
  // const onchangepassword =(e)=>setpatientsignup({patientpassward: e.target.value})

  const handleform = (e) => {
    setpatientsignup({
      ...patientsignup,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    getDoctordata();
  }, []);


  return (
    <form id='signup' onSubmit={handlesubmit}  >
      <div style={{ width: "100%", marginLeft: "53%", padding: "5%" }}>
        <h2>Patient register</h2>
        <br />
        <span>Name</span>
        <input  placeholder='name' name='patientname'   id='patientname' onChange={handleform} />
        <br />

        <span>Email</span>
        <input  placeholder='email' name='patientemail' id="email"  onChange={handleform} />
        <br />

        <span>Password</span>
        <input placeholder='password' name='patientpassward'   id="password" onChange={handleform} />
{/* 

        <span>Image</span>
        <input value={images} id='photoimage' placeholder='imagepath' onChange={onChangeImages} /> */}



        <span>Phone</span>
        <input type="number" placeholder='phone' name="phone" id="number" onChange={handleform} />
        <br />

        <span>Gender</span>
        <input type="text" placeholder='Gender' name="Gender" id="Gender" onChange={handleform} />
        <br />

        <span>Disease</span>
        <input type="text" placeholder='disease' name="disease" id="disease" onChange={handleform} />
        <br />

        <span>Medicine</span>
        <input type="text" placeholder='medicine' name="medicine" id="medicine" onChange={handleform} />
        <br />

        <label >Doctor: </label>
        <select id="doctor" name="doctor" onChange={handleform}>

          {Doctordata?.map((doctor) => {
            return (
              <option  >{doctor.name}</option>
            )
          })}
        </select>

        <br />


        <span>Age</span>
        <input type="number" placeholder='age' name="age" id="age" onChange={handleform} />
        <br />

        <span>Address</span>
        <input type="text" placeholder='Address' name="Address" id="Address" onChange={handleform} />
        <br />


        <button 
        // onClick={() => handlesubmit(images,
        //   patientname,
        //   patientemail,
        //   patientpassward,
        //   age,
        //   disease,
        //   Address,
        //   phone,
        //   Gender,
        //   doctor
        //)} 

        type='submit'
        >Signup</button>
        <br />
        <h5> OR Already Have an Account  <Link to="/patientlogin"><button>login</button></Link></h5>

      </div>
    </form>
  )
}

export default Patientsignup;
