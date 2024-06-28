import React from 'react'
import { Outlet,Navigate, json } from 'react-router-dom'
import Main from '../Admincomponents/Main';

//   let data = localStorage.getItem("data");
// console.log(data,"tvgyvghvbghvffffffffffff")
const ProtectedRoutes=({chidren})=> {
  let data = localStorage.getItem("token");
console.log(data?.token,"tokendatatvgyvghvbghvffffffffffff");
return data?.token!==undefined?chidren:(<Navigate to='/login' replace={true}  />)

  // e.preventDefault();
// if (data) {
//   return <div  >
//     <Main/>
//   </div>
  
// } else {
//    return <Navigate to="/login" />;
// }
}

export default ProtectedRoutes;
