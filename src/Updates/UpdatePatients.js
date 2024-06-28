import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Components/Dashboard';
function UpdatePatients() {


  const [Doctordata, setDoctordata] = useState()
  const emailll = useParams()
  function getDoctordata() {
    fetch(`http://localhost:8000/getdoctor/${emailll}`).then((res) => res.json())
      .then(setDoctordata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  }


  const [email, setemail] = useState({});
  const [updateemail, setupdateemail] = useState('');
  const id = useParams();
  console.log(id)

  const [doctor, setdoctor] = useState({});
  const [updatedoctor, setupdatedoctor] = useState('');
  const doctorrr = useParams();
  console.log(doctorrr)

  const [name, setname] = useState({});
  const [updatename, setupdatename] = useState('');
  const namedata = useParams();
  console.log(namedata)

  const [phone, setphone] = useState({});
  const [updatephone, setupdatephone] = useState('');
  const phonedata = useParams();
  console.log(phonedata)

  const [age, setage] = useState({});
  const [updateage, setupdateage] = useState('');
  const agedata = useParams();
  console.log(agedata)

  const [Address, setaddress] = useState({});
  const [updateaddress, setupdateaddress] = useState('');
  const addressdata = useParams();
  console.log(addressdata)

  const [Gender, setgender] = useState({});
  const [updategender, setupdategender] = useState('');
  const genderdata = useParams();
  console.log(genderdata)



  const [disease, setdisease] = useState({});
  const [updatedisease, setupdatedisease] = useState('');
  const diseasedata = useParams();
  console.log(diseasedata)



  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/updatePatient/${email}`, { updateemail, updatename, updatephone, updateage, updateaddress, updategender, updatedisease, updatedoctor });
      console.log(res);
      alert('Patient Details are successfully updated 🧑‍🔧');
    } catch (error) {
      console.error('Error update Patients:', error);
    }
  };
  useEffect(() => {
    setemail(id.patientemail);
    setname(namedata.patientname);
    setphone(phonedata.phone);
    setage(agedata.age);
    setaddress(addressdata.Address);
    setgender(genderdata.Gender);
    setdisease(diseasedata.disease);
    setdoctor(doctorrr.doctor)
    getDoctordata();
  }, [])
  return (

    <>
      <Dashboard />



      <form onSubmit={updatePatient} id='updateform'>
      <div id='head'>
        <Link to="/patients"><button>Back</button></Link>
       
      </div>
        <div id='col1' style={{gap:"35px",marginTop:"-7.4%"}}>

          <span>Name</span>
          <span>Email</span>
          <span>Age</span>
          <span>Phone</span>
          <span>Address</span>
          <span>Gender</span>
          <span>Disease</span>
          <label >Doctor: </label>
        </div>
        <div id='col2'>

          <input type="text" name="name" id="name" value={updatename} onChange={(e) => setupdatename(e.target.value)} placeholder={name} />


          <input type="email" name="email" id="email" value={updateemail} onChange={(e) => setupdateemail(e.target.value)} placeholder={email} />

          <input type="number" name="age" id="age" value={updateage} onChange={(e) => setupdateage(e.target.value)} placeholder={age} />
          <input type="number" name="phone" id="phone" value={updatephone} onChange={(e) => setupdatephone(e.target.value)} placeholder={phone} />
          <input type="Address" name="Address" id="address" value={updateaddress} onChange={(e) => setupdateaddress(e.target.value)} placeholder={Address} />


          <input type="Gender" name="Gender" id="Gender" value={updategender} onChange={(e) => setupdategender(e.target.value)} placeholder={Gender} />

          <input type="disease" name="disease" id="disease" value={updatedisease} onChange={(e) => setupdatedisease(e.target.value)} placeholder={disease} />

          <select id="doctor" name="doctor" placeholder={doctor} onChange={(e) => setupdatedoctor(e.target.value)}>
            
            {Doctordata?.map((doctor) => {
              return (
                <option  value={updatedoctor}   
                >{doctor.name}</option>
              )
            })}
          </select>
        </div>
        <button >Update</button>
      </form>

    </>
  )
}

export default UpdatePatients;
