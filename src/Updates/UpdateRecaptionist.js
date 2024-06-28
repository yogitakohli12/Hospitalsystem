import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Components/Dashboard';
function UpdateRecaptionist() {
  
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

  const [age, setage] = useState({});
  const [updateage, setupdateage] = useState('');
  const agedata = useParams();
  console.log(agedata)



  const [salary, setsalary] = useState({});
  const [updatesalary, setupdatesalary] = useState('');
  const salarydata = useParams();
  console.log(salarydata)

  

  const [department, setdepartment] = useState({});
  const [updatedepartment, setupdatedepartment] = useState('');
  const departmentdata = useParams();
  console.log(departmentdata)

  

  const updateRecaptionist = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/updateRecaptionist/${email}`,{updateemail,updatename,updatephone,updateage,updatesalary,updatedepartment} );
      console.log(res);
      alert('successfully updated👩‍🏭');
    } catch (error) {
      console.error('Error update Accountant:', error);
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
    setage(agedata.age);
    
    setsalary(salarydata.salary);
    setdepartment(departmentdata.department);
    departmentment();

  }, [])
  return (
    <>
     <Dashboard/>
    
        <form onSubmit={updateRecaptionist} id='updateform'>
        <div id='head'>
                    <Link to="/recaptionist"><button>Back</button></Link>
                    
                </div>
      <div id='col1'>
       
          <span>Name</span>
          <span>Email</span>
          <span>Age</span>
          <span>Phone</span>
          <span>Salary</span>
          <span>Department</span>
     
    </div>

    <div id="col2" style={{marginTop:"7.5%"}} >

          <input type="text" name="name" id="name" value={updatename} onChange={(e) => setupdatename(e.target.value)} placeholder={name} />
          <input type="email" name="email" id="email"  value={updateemail} onChange={(e) => setupdateemail(e.target.value)} placeholder={email}  /> 
          <input type="age" name="age" id="age"  value={updateage} onChange={(e) => setupdateage(e.target.value)} placeholder={age}   />
          <input type="number" name="phone" id="phone"  value={updatephone} onChange={(e) => setupdatephone(e.target.value)} placeholder={phone}   />
          <input type="salary" name="salary" id="salary"  value={updatesalary} onChange={(e) => setupdatesalary(e.target.value)} placeholder={salary}   />

          <select type="text" name="department" style={{height:"30px" , marginTop:"10px"}}  id="department"  value={updatedepartment} placeholder={department} onChange={(e) => setupdatedepartment(e.target.value)} >
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

export default UpdateRecaptionist;
