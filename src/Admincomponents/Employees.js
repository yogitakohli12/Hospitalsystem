import React, { useState, useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import del from '../images/delete.png';
import edit from '../images/edit.png';
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Employees() {

  const [Employeedata, setEmployeedata] = useState()
  
  const email =useParams()
  function getEmployeedata() {
    fetch(`http://localhost:8000/AddEmployee/${email}`)
      .then((res) => res.json())
      .then(setEmployeedata)
      .catch((err) => {
        console.log("error for fetching data", err)
      });
  };

  useEffect(() => {
    getEmployeedata();
  }, []);


  const deleteEmployee = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/DeleteEmployee/${email}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        // Remove the deleted employee from the state
        setEmployeedata((prevData) => prevData.filter((employee) => employee.email !== email));
      } else {
        console.error('Failed to delete employee');
      }

    } catch (error) {
      console.error('Error deleting employee:', error);
    }

  };

  return (
    <>
    <Dashboard/>

      
    <div id='dashcontain'>
      <Adminheader/>
      <div id='head'>
        <Link to="/employee"><button>Employees</button></Link>
        <Link to="/addemployee"><button>Add Employee</button></Link>

      </div>
      <br />

      <h2 style={{ textAlign: "center" }}>Available Employees</h2>
      <br />
        <div id='patientheading'>
          {/* <h4>user</h4> */}
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Age</h4>
          <h4>Phone</h4>
          <h4>Address</h4>
          <h4>Gender</h4>
          <h4>Position</h4>
          
          <h4>Options</h4>
        </div>
        <Scrollbars autoHide style={{ width: 1000, height: 360 }} >
        {Employeedata?.map((employee) => {
          return (
            <>
              <div className='Patient'>
                {/* <p>emoji</p> */}
                <p>{employee.name}</p>
                <p>{employee.email}</p>
                <p>{employee.age}</p>
                <p>{employee.phone}</p>
                <p>{employee.Address}</p>
                <p>{employee.Gender}</p>
                <p>{employee.position}</p>
                <Link to={`/updateEmployee/${employee.email}/${employee.name}/${employee.phone}/${employee.age}/${employee.Address}/${employee.Gender}/${employee.position}`} ><img src={edit} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%" }} /></Link>
                <img src={del} alt="" onClick={() => deleteEmployee(employee.email)} style={{height:"35px" , width:"35px" , borderRadius:"50%" }} />
              </div>
              
            </>
          )

        })}

      </Scrollbars>
    </div>
    </>
  )
}

export default Employees
