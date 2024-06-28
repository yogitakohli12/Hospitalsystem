import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Components/Dashboard';
function UpdateLab() {
  
  const [email, setemail] = useState({});
  const [updateemail, setupdateemail] = useState('');
  const id = useParams();
  console.log(id)


  const [name, setname] = useState({});
  const [updatename, setupdatename] = useState('');
  const namedata = useParams();
  console.log(namedata)

  const [phone, setphone] = useState({});
  const [updatephone, setupdatephone] = useState('');
  const phonedata = useParams();
  console.log(phonedata)

  const [Honour, setHonour] = useState({});
  const [updateHonour, setupdateHonour] = useState('');
  const Honourdata = useParams();
  console.log(Honourdata)

  const [department, setdepartment] = useState({});
  const [updatedepartment, setupdatedepartment] = useState('');
  const departmentdata = useParams();
  console.log(departmentdata)

  const updateLab = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/updateLab/${email}`,{updateemail,updatename,updatephone,updateHonour,updatedepartment} );
      console.log(res);
      alert('Lab details are successfully updated 👩‍⚕️');
    } catch (error) {
      console.error('Error update Lab:', error);
    }
  };


  const [departmentt, settdepartment] = useState()

  function departmentment() {
    fetch("http://localhost:8000/department").then((res) => res.json()).then(settdepartment).catch((err) => {
      console.log("error", err)
    })
  }


  useEffect(() => {
    setemail(id.email);
    setname(namedata.name);
    setphone(phonedata.phone);
    setHonour(Honourdata.Honour);
    setdepartment(departmentdata.department);
   departmentment();
  }, [])
  return (

    <>
    
    
    <Dashboard/>
    
        <form onSubmit={updateLab} id='updateform'>
        <div id='head'>
                    <Link to="/lab"><button>Back</button></Link>
                    
                </div>
    <div id='col1'>
          <span>Name</span>
          <span>Email</span>
          <span>Honour</span>
          <span>Phone</span>
          <span>Department</span>
      </div>

      <div id='col2' style={{marginTop:"10%"}}>

          <input type="text" name="name" id="name" value={updatename} onChange={(e) => setupdatename(e.target.value)} placeholder={name} />
          <input type="email" name="email" id="email"  value={updateemail} onChange={(e) => setupdateemail(e.target.value)} placeholder={email}  /> 
          <input type="Honour" name="Honour" id="Honour"  value={updateHonour} onChange={(e) => setupdateHonour(e.target.value)} placeholder={Honour}   />
          <input type="number" name="phone" id="phone"  value={updatephone} onChange={(e) => setupdatephone(e.target.value)} placeholder={phone}   />


         <select type="text" name="department"   style={{height:"30px" , marginTop:"10px"}} id="department"  value={updatedepartment} placeholder={department} onChange={(e) => setupdatedepartment(e.target.value)} >
              {departmentt?.map((dep) => {
                return <>
                  <option >{dep.department}</option>
                </>
              })}
            </select>

          
      </div>
          <button >Update</button>
        </form>
  
    </>
  )
}
export default UpdateLab;
