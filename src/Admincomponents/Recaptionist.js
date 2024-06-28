import React, {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import del from '../images/delete.png';
import edit from '../images/edit.png';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Recaptionist() {


  const [Recaptionistdata , setRecaptionistdata] = useState()
  
  function getRecaptionistdata (){
    fetch('http://localhost:8000/getrecaptionist').then((res) => res.json())
    .then(setRecaptionistdata)
  }



useEffect(()=>{
  getRecaptionistdata();
 
},[]);


const deleterecaptionist = async (email) => {
  try {
    const response = await fetch(`http://localhost:8000/deleterecaptionist/${email}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      // Remove the deleted recaptionist from the state
      setRecaptionistdata((prevData) => prevData.filter((recaptionist) => recaptionist.email !== email));
    } else {
      console.error('Failed to delete recaptionist');
    }

  } catch (error) {
    console.error('Error deleting recaptionist:', error);
  }

};






  return (<>
   <Dashboard/>
    <div id='dashcontain'>
      
        <Adminheader/>
        <div id='head'>
                    <Link to="/recaptionist"><button>Recaptionists</button></Link>
                    <Link to="/addrecaptionist"><button>Add Recaptionist</button></Link>

                </div>
        <br />
        <br />
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
      <Scrollbars autoHide style={{ width: 1000, height: 380 }} >

      {Recaptionistdata?.map((recaptionist) =>{
  return (
    <div className="Patient" >
   {/* <p>emoji</p> */}
    <p>{recaptionist.name}</p>
    <p>{recaptionist.email}</p>
    <p>{recaptionist.age}</p>
    <p>{recaptionist.phone}</p>
    <p>{recaptionist.salary}</p>
    <p>{recaptionist.department}</p>
    <p></p>
    <Link to={`/updateRecaptionist/${recaptionist.email}/${recaptionist.name}/${recaptionist.phone}/${recaptionist.age}/${recaptionist.salary}/${recaptionist.department}`} ><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>
    <img src={del} alt="" onClick={() => deleterecaptionist(recaptionist.email)} style={{height:"35px" , width:"35px" , borderRadius:"50%" }} />
    </div>
  )
  })}
      </Scrollbars>
    </div>
    </>
  )
}

export default Recaptionist
