import React from 'react'
import Dashboard from '../Components/Dashboard'
import Adminheader from '../Components/Adminheader'
function Blood() {
  return (
    <>
     <Dashboard/>
      
    <div id='dashcontain'>
      <Adminheader/>
      <br />
      <h2 style={{textAlign:"center"}}>Blood Bank</h2>
     <div id='blood' >
      <table id='table' >
        <th>
          <td>#</td>
          <td>Blood Group</td>
          <td>No. of Bags</td>
        </th>
        <tr>
          <td>1</td>
          <td>A+</td>
          <td>12</td>
        </tr>
        <tr>
          <td>2</td>
          <td>A-</td>
          <td>0</td>
        </tr>
        <tr>
          <td>3</td>
          <td>B+</td>
          <td>0</td>
        </tr>
        <tr>
          <td>4</td>
          <td>B-</td>
          <td>2</td>
        </tr>
        <tr>
          <td>5</td>
          <td>O+</td>
          <td>8</td>
        </tr>
        <tr>
          <td>6</td>
          <td>O-</td>
          <td>12</td>
        </tr>
        <tr>
          <td>7</td>
          <td>AB+</td>
          <td>12</td>
        </tr>
        <tr>
          <td>8</td>
          <td>AB-</td>
          <td>6</td>
        </tr>
      </table>
      </div>
    </div>
    </>
  )
}

export default Blood
