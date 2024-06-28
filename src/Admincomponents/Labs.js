import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import del from '../images/delete.png';
import edit from '../images/edit.png';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Labs() {
  const [Laboratories , setLaboratories] = useState()
   
  function getLab (){
    fetch('http://localhost:8000/getlab').then((res) => res.json())
    .then(setLaboratories)
  }

useEffect(()=>{
  getLab();
},[]);


const deleteLab = async (email) => {
  try {
    const response = await fetch(`http://localhost:8000/deletelab/${email}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      // Remove the deleted Lab from the state
      setLaboratories((prevData) => prevData.filter((Lab) => Lab.email !== email));
    } else {
      console.error('Failed to delete Lab');
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
                    <Link to="/lab"><button>Laboratories</button></Link>
                    <Link to="/addlab"><button>Add Laboratories</button></Link>

                </div>
        <br />
        <br />
        
      <div id="patientheading" style={{  border:"2px solid red"}}>
        {/* <h4>user</h4> */}
        <h4>Name</h4>
        <h4>Email</h4>
        <h4>Honour</h4>
        <h4>Phone</h4>
        <h4>Department</h4>
        <h4>Options</h4>
      </div>
      <Scrollbars autoHide style={{ width: 1000, height: 380 }} >
<div style={{border:"2px solid red"  }}>
      {Laboratories?.map((Lab) =>{
  return (
    <div className="Patient"   >
   {/* <p>emoji</p> */}
    <p>{Lab.name}</p>
    <p>{Lab.email}</p>
    <p>{Lab.Honour}</p>
    <p>{Lab.phone}</p>
    <p>{Lab.department}</p>
   
    <Link to={`/updateLab/${Lab.email}/${Lab.name}/${Lab.phone}/${Lab.Honour}/${Lab.department}`} ><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>
     <img src={del} alt="" onClick={() => deleteLab(Lab.email)} style={{height:"35px" , width:"35px" , borderRadius:"50%" }} />
    </div>
  )
  })}
</div>

      </Scrollbars>
    </div>
    </>
  )
}

export default Labs
