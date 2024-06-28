import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {

  const [setdata, setadmindata] = useState({
    data: ""
  })


  function fetchdataadmin() {
    fetch("http://localhost:8000/admindata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setadmindata({ data: data.data })
      })
  }

  useEffect(() => {
    fetchdataadmin();
    
  }, []);


  return (
    <>
     <div id='dashitem'>
        <div id='id'>
          <img src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt="admin" />
          <h3><p  >{setdata.data.name}</p></h3>
        </div>
        <Link to="/home" ><button>Dashboard</button></Link>
        <Link to="/departments" ><button>Departments</button></Link>
        <Link to="/doctors" ><button>Doctors</button></Link>
        <Link to="/patients" ><button>Patients</button></Link>
        <Link to="/employee" ><button>Employees</button></Link>
        <Link to="/lab" ><button>Laboratories</button></Link>
        <Link to="/accountants" ><button>Accountants</button></Link>
        <Link to="/recaptionist" ><button>Receptionist</button></Link>
        <Link to="/blood" ><button>Blood Bank</button></Link>
        <Link to="/profile" ><button>Profile</button></Link>

      </div>
    </>
  )
}

export default Dashboard
