import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Doctors from './Admincomponents/Doctors';
import Patients from './Admincomponents/Patients';
import Signup from './Components/Signup';
import Main from './Admincomponents/Main';
import AddDoctor from './Admincomponents/AddDoctor';
import Addemployees from './Admincomponents/Addemployees';
import Employees from './Admincomponents/Employees';
import Lab from './Admincomponents/Labs';
import Department from './Admincomponents/Department';
import Accountant from './Admincomponents/Accountant';
import Recaptionist from './Admincomponents/Recaptionist';
import Profile from './Admincomponents/Profile';
import Addrecaptionist from './Admincomponents/Addrecaptionist';
import AddAccountants from './Admincomponents/AddAccountants';
import AddLab from './Admincomponents/AddLab';
import UpdateDoctor from './Updates/UpdateDoctor';
import Blood from './Admincomponents/Blood';
import AddPatient from './Admincomponents/AddPatient';
import UpdateEmployee from './Updates/UpdateEmployee';
import UpdatePatients from './Updates/UpdatePatients';
import UpdateLab from './Updates/UpdateLab';
import UpdateAccountant from './Updates/UpdateAccountant';
import UpdateRecaptionist from './Updates/UpdateRecaptionist';
import Penal from './Components/Penal';
import Patienthome from './Components/Patienthome';
import Patientlogin from './Components/Patientlogin';
import Patientsignup from './Components/Patientsignup';
import Doctorlogin from './Components/Doctorlogin';
import Doctorsignup from './Components/Doctorsignup';
import Doctorhome from './Components/Doctorhome';
import Reshome from './Components/Reshome';
import Reslogin from './Components/Reslogin';
import Ressignup from './Components/Ressignup';
import ProtectedRoutes from './Components/ProtectedRoutes';
import About from './Components/About';
// import UpdateProfile from './Updates/UpdateProfile';



const current_user={
  
  reception:"reception user",
  Patient:"patient user",
  Admin:"admin user",
  Doctor:"doctor user"
}

const userexist = current_user.Doctor


function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Routes>
        
        <Route exact path="/about" element={ <About/>} />
        <Route  path="*"  element={<h1 style={{color:"burlywood" , border:"2px black solid" , margin:"10%" , marginLeft:"30%",  padding:"10%" }}>page not exist</h1>} />
        <Route exact path="/" element={ <Penal/>} />
        <Route exact path="/home" element={<Main/>} />


{/* <Route exact path='/home' element={<ProtectedRoutes><Main/></ProtectedRoutes>} /> */}

         {/* <Route exact path="/admin" element={<ProtectedRoutes />} >
        <Route exact path="home" element={<Main/>} />
        </Route>  */}

        {/* <ProtectedRoutes  >
        <Route  path="/home" element={<Main/>} />
        </ProtectedRoutes> */}
       
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path='/profile' element={<Profile />} ></Route>
          {/* <Route exact path="/updateProfile/:_id/:email/:name/:phone/:Gender" element={<UpdateProfile/>} /> */}

          <Route exact path="/patienthome" element={<Patienthome/>} />
          <Route exact path="/patientlogin" element={<Patientlogin/>} />
          <Route exact path="/patientsignup" element={<Patientsignup/>} />
          <Route exact path="/patients" element={<Patients />} />
          <Route exact path='addpatient' element={<AddPatient />} />

          <Route exact path="/updatePatient/:patientemail/:patientname/:phone/:age/:Address/:Gender/:disease/:doctor" element={<UpdatePatients/>} />
          
          <Route exact path="/doctorhome" element={<DoctorElement><Doctorhome/></DoctorElement> } />
          <Route exact path="/doctorlogin" element={<Doctorlogin/>} />
          <Route exact path="/doctorsignup" element={<Doctorsignup/>} />
          <Route exact path='/adddoctor' element={<AddDoctor />}></Route>
          <Route exact path="/doctors" element={<Doctors />} />
          <Route exact path="/updatedoctor/:email/:name/:phone/:special/:Address/:Gender/:experienced" element={<UpdateDoctor />} />
          
          <Route exact path="/reshome" element={<Reshome/>} />
          <Route exact path="/reslogin" element={<Reslogin/>} />
          <Route exact path="/ressignup" element={<Ressignup/>} />
          <Route exact path='/recaptionist' element={<Recaptionist />}></Route>
          <Route exact path='/addrecaptionist' element={<Addrecaptionist />}></Route>
          <Route exact path="/updateRecaptionist/:email/:name/:phone/:age/:salary/:department" element={<UpdateRecaptionist/>} />
          
          <Route exact path="/employee" element={<Employees />} />
          <Route exact path='/addemployee' element={<Addemployees />}></Route>
          <Route exact path="/updateEmployee/:email/:name/:phone/:age/:Address/:Gender/:position" element={<UpdateEmployee/>} />
          
          <Route exact path='/accountants' element={<Accountant />}></Route>
          <Route exact path='/addaccountant' element={<AddAccountants />}></Route>
          <Route exact path="/updateAccountact/:email/:name/:phone/:age/:salary/:department" element={<UpdateAccountant/>} />

          <Route exact path='/lab' element={<Lab />} ></Route>
          <Route exact path='/addlab' element={<AddLab />} ></Route>
          <Route exact path="/updateLab/:email/:name/:phone/:Honour/:department" element={<UpdateLab/>} />
          
          <Route exact path='/departments' element={<Department />}></Route>
          <Route exact path="/blood" element={<Blood />} />
{/* <ProtectedRoutes path="/home" component={<Main/>} auth={true}/> */}
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}


function DoctorElement({children }){
    if (userexist === current_user.Doctor) {
      return <>
      {children}
      </>
    }else{
      return <Navigate to={"/doctorlogin"}/>
    }
}


export default App;