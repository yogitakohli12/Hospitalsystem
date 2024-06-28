import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function Adminheader() {

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
      <div style={{ position: "sticky" }} >

        <div id='admin'  >
          <p style={{ color: "black" }}>({setdata.data.name})Admin</p>
          {/* <Link to="/" ><button id='logout'>Logout</button></Link> */}
        </div>
      </div>
    </>
  )
}

export default Adminheader
