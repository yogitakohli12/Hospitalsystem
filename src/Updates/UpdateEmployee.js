import React, { useEffect, useState } from 'react';
import { useParams,Link} from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Components/Dashboard';
function UpdateEmployee() {
  
  const [email, setemail] = useState({});
  const [updateemail, setupdateemail] = useState('');
  const id = useParams();



  const [name, setname] = useState({});
  const [updatename, setupdatename] = useState('');
  const namedata = useParams();
  

  const [phone, setphone] = useState({});
  const [updatephone, setupdatephone] = useState('');
  const phonedata = useParams();
  

  const [age, setage] = useState({});
  const [updateage, setupdateage] = useState('');
  const agedata = useParams();
  

  const [Address, setaddress] = useState({});
  const [updateaddress, setupdateaddress] = useState('');
  const addressdata = useParams();
  

  const [Gender, setgender] = useState({});
  const [updategender, setupdategender] = useState('');
  const genderdata = useParams();
  
  

  const [position, setposition] = useState({});
  const [updateposition, setupdateposition] = useState('');
  const positiondata = useParams();
  
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/updateEmployee/${email}`,{updateemail,updatename,updatephone,updateage,updateaddress,updategender,updateposition} );
      console.log(res);
      alert('Employee.. is successfully updated 😉');
    } catch (error) {
      console.error('Error update employee:', error);
    }
  };
  useEffect(() => {
    setemail(id.email);
    setname(namedata.name);
    setphone(phonedata.phone);
    setage(agedata.age);
    setaddress(addressdata.Address);
    setgender(genderdata.Gender);
    setposition(positiondata.position);
    

  }, [])
  return (

    <>
      <Dashboard/>
    
    
        <form onSubmit={updateEmployee} id='updateform'>
        <div id='head'>
        <Link to="/employee"><button>Back</button></Link>
        
      </div>
      <div id='col1'>
          <span>Name</span>
          <span>Email</span>
          <span>Age</span>
          <span>Phone</span>
          <span>Address</span>
          <span>Gender</span>
          <span>Position</span>
      </div>

      <div id='col2'>

          <input type="text" name="name" id="name" value={updatename} onChange={(e) => setupdatename(e.target.value)} placeholder={name} />
          <input type="email" name="email" id="email"  value={updateemail} onChange={(e) => setupdateemail(e.target.value)} placeholder={email}  /> 
          <input type="number" name="age" id="age"  value={updateage} onChange={(e) => setupdateage(e.target.value)} placeholder={age}   />
          <input type="number" name="phone" id="phone"  value={updatephone} onChange={(e) => setupdatephone(e.target.value)} placeholder={phone}   />

          <input type="Address" name="Address" id="address" value={updateaddress} onChange={(e) => setupdateaddress(e.target.value)} placeholder={Address}    />
          <input type="Gender" name="Gender" id="Gender"  value={updategender} onChange={(e) => setupdategender(e.target.value)} placeholder={Gender}   />

          <input type="position" name="position" id="position"  value={updateposition} onChange={(e) => setupdateposition(e.target.value)} placeholder={position}   />
      </div>
          <button >Update</button>
        </form>
 
    </>
  )
}

export default UpdateEmployee;
