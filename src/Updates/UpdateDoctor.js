import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Components/Dashboard';
function UpdateDoctor() {
  
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

  const [special, setspeciality] = useState({});
  const [updatespeciality, setupdatespeciality] = useState('');
  const specialitydata = useParams();
  console.log(specialitydata)

  const [Address, setaddress] = useState({});
  const [updateaddress, setupdateaddress] = useState('');
  const addressdata = useParams();
  console.log(addressdata)

  const [Gender, setgender] = useState({});
  const [updategender, setupdategender] = useState('');
  const genderdata = useParams();
  console.log(genderdata)

  

  const [experienced, setexperienced] = useState({});
  const [updateexperienced, setupdateexperienced] = useState('');
  const experienceddata = useParams();
  console.log(experienceddata)

  // const [photo, setphoto] = useState({});
  // const [updatephoto, setupdatephoto] = useState('');
  // const photodata = useParams();
  // console.log(photodata)

  const updatedoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/updatedoctor/${email}`,{updateemail,updatename,updatephone,updatespeciality,updateaddress,updategender,updateexperienced} );
      console.log(res);
      alert('Doctor is successfully updated 😎');
    } catch (error) {
      console.error('Error update doctor:', error);
    }
  };
  useEffect(() => {
    setemail(id.email);
    setname(namedata.name);
    setphone(phonedata.phone);
    setspeciality(specialitydata.special);
    setaddress(addressdata.Address);
    setgender(genderdata.Gender);
    setexperienced(experienceddata.experienced);
    // setphoto(photodata.photo);

  }, [])
  return (
    <>
     <Dashboard/>
    
   
    <form onSubmit={updatedoctor}  id='updateform'>
    <div id='head'>
       <Link to="/doctors"><button>Back</button></Link>
      
      </div>
      <div id='col1' >
        {/* <span>Photo</span> */}
       {/* <input type="file" name="photo" id="photo" value={updatephoto}  onChange={(e) => setupdatephoto(e.target.value)} placeholder={photo}  /> */}
      
          <span>Name</span>
          
          <span>Email</span>
          
          <span>Speciality</span>
          
          <span>Phone</span>
          
          <span>Address</span>
         
          <span>Gender</span>
          
          <span>Experienced</span>
         
         
      </div>

      <div id='col2'>
          <input type="text" name="name" id="name" value={updatename} onChange={(e) => setupdatename(e.target.value)} placeholder={name} />

          <input type="email" name="email" id="email"  value={updateemail} onChange={(e) => setupdateemail(e.target.value)} placeholder={email}  /> 

          <input type="special" name="special" id="special"  value={updatespeciality} onChange={(e) => setupdatespeciality(e.target.value)} placeholder={special}   />

          <input type="number" name="phone" id="phone"  value={updatephone} onChange={(e) => setupdatephone(e.target.value)} placeholder={phone}   />

          <input type="Address" name="Address" id="address" value={updateaddress} onChange={(e) => setupdateaddress(e.target.value)} placeholder={Address}    />


          <input type="Gender" name="Gender" id="Gender"  value={updategender} onChange={(e) => setupdategender(e.target.value)} placeholder={Gender}   />

          <input type="experienced" name="experienced" id="experienced"  value={updateexperienced} onChange={(e) => setupdateexperienced(e.target.value)} placeholder={experienced}   />

      </div>

        <button >Update</button>
        </form>
    </>
  )
}

export default UpdateDoctor;
