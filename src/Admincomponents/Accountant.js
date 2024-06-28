import React, {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import del from '../images/delete.png';
import edit from '../images/edit.png';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Accountant() {


  const [Accountantstdata , setAccountantstdata] = useState()
  function getAccountantdata (){
    fetch('http://localhost:8000/getaccountant').then((res) => res.json())
    .then(setAccountantstdata)
  }

 

useEffect(()=>{
  getAccountantdata();
  
},[]);


const deleteAccountant = async (email) => {
  try {
    const response = await fetch(`http://localhost:8000/deleteAccountant/${email}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      // Remove the deleted accountant from the state
      setAccountantstdata((prevData) => prevData.filter((Accountant) => Accountant.email !== email));
    } else {
      console.error('Failed to delete Accountant');
    }

  } catch (error) {
    console.error('Error deleting accountant:', error);
  }

};
  return (
    <>
    <Dashboard/>
    <div id='dashcontain'>
      

        <Adminheader/>
        <div id='head'>
       <Link to="/accountants"><button  >Accountant</button></Link>
          <Link to="/addaccountant"><button >Add Accountant</button></Link>

        </div>
        <br />
        <br />
        <Scrollbars autoHide style={{ width: 1000, height: 380 }} >
      <div id="patientheading">
        {/* <h4>user</h4> */}
        <h4>Name</h4>
        <h4>Email</h4>
        <h4>Age</h4>
        <h4>Phone</h4>
        <h4>Salary</h4>
        <h4>Department</h4>
        <h4></h4>
        <h4>Options</h4>
      </div>
      {Accountantstdata?.map((Accountant) =>{
  return (
    <div className="Patient" >
   {/* <p>emoji</p> */}
    <p>{Accountant.name}</p>
    <p>{Accountant.email}</p>
    <p>{Accountant.age}</p>
    <p>{Accountant.phone}</p>
    <p>{Accountant.salary}</p>
    <p>{Accountant.department}</p>
   <p></p>
    <Link to={`/updateAccountact/${Accountant.email}/${Accountant.name}/${Accountant.phone}/${Accountant.age}/${Accountant.salary}/${Accountant.department}`} ><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>
    <img src={del} alt="" onClick={() => deleteAccountant(Accountant.email)} style={{height:"35px" , width:"35px" , borderRadius:"50%" }} />
    </div>
  )
  })}


      </Scrollbars>
    </div>
    </>
  )
}

export default Accountant
