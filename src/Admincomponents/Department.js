import React,{useState , useEffect} from 'react'
import Dashboard from '../Components/Dashboard'
import Adminheader from '../Components/Adminheader'
import del from '../images/delete.png';
import { Scrollbars } from 'react-custom-scrollbars';
function Department() {

  const [department, setdepartment] = useState({
    sno:'',
    department:''
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/department', {
      method: 'POST',
      body: JSON.stringify(department),
      headers: {
        'Content-Type': 'application/json',
        
      }
    }).then((response) => response.json())
      .then((data) => { console.log(data, "department added") })
    alert('Department Added successfully...✨🖊️');
    // console.log("data of department ")
  };


  const handleform = (e) => {
    setdepartment({
      ...department,
      [e.target.name]: e.target.value
    });
  };

const[departmentt , settdepartment]=useState()

  function departmentment(){
    fetch("http://localhost:8000/department").then((res)=>res.json()).then(settdepartment).catch((err)=>{console.log("error",err)
  })
  }

  
  const deletedep = async (sno) => {
    try {
      const response = await fetch(`http://localhost:8000/Deletedep/${sno}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        // Remove the deleted doctor from the state
        settdepartment((prevData) => prevData.filter((depp) => depp.sno !== sno));
      } else {
        console.error('Failed to delete dep');
      }

    } catch (error) {
      console.error('Error deleting dep:', error);
    }

  };


  useEffect(() => {
    departmentment();
  },[])

  return (
    <>
      <Dashboard />


      <div id='dashcontain'>
        <Adminheader />
        <br />

        <Scrollbars autoHide style={{ width: 1000, height: 360 }} >
        <div id='blood' >
          <table id='table'>
          <th>
       <td>S.NO</td>
       <td>Department</td>
       <td>Option</td>
      </th>
          </table>
       
            {departmentt?.map((dep)=>{
return <>
    <table id='table' >
      

      <tr>
        <td>{dep.sno}</td>
        <td>{dep.department}</td>
        <img src={del} alt="" style={{height:"35px" , width:"35px" , borderRadius:"50%",cursor:"pointer"}} onClick={() => deletedep(dep.sno)} />
      </tr>
     
    </table>
</>
            })}
         </div>
         
         </Scrollbars>
          <br />
          <br />

          <form onSubmit={handlesubmit}  id='dep'>
            <span>Department : </span>
            <br />
            <br />
            <div id='department'>
            <input type="number"  name='sno' onChange={handleform}/>
            <input type="text" name='department' onChange={handleform} id='secdep' />
            <button type='submit'> ADD</button>
            </div>
           
          </form>

        





      </div>
    </>
  )
}

export default Department
