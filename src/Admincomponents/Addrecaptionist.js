import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../Components/Dashboard';
import Adminheader from '../Components/Adminheader';
function Addrecaptionist() {


    const [recaptionist, setrecaptionist] = useState({
        name: '',
        email: '',
        age: '',
        phone: '',
        Gender: '',
        salary: '',
        department: '',
        passward: ''
    });

    const handlesubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/ressignup', {
            method: 'POST',
            body: JSON.stringify(recaptionist),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => { console.log(data, "user registered") })

        alert('resceptionist Added successfully');
    };

    const handleform = (e) => {
        setrecaptionist({
            ...recaptionist,
            [e.target.name]: e.target.value
        });
    };

    const getUsers = async () => {
        const response = await fetch('http://localhost:8000/addrecaptionist', {
            method: 'GET'
        });
        console.log(response);
    };



    const [departmentt, settdepartment] = useState()

    function departmentment() {
        fetch("http://localhost:8000/department").then((res) => res.json()).then(settdepartment).catch((err) => {
            console.log("error", err)
        })
    }

    useEffect(() => {
        getUsers();
        departmentment();
    }, []);



    return (
        <>
            <Dashboard />
            <div id='dashcontain'>

                <Adminheader />
                <div id='head'>
                    <Link to="/recaptionist"><button>Recaptionists</button></Link>
                    <Link to="/addrecaptionist"><button>Add Recaptionist</button></Link>

                </div>
                <br />
                <br />


                <form onSubmit={handlesubmit} id='addform'>
                    <span>Name</span>
                    <input type="text" name='name' onChange={handleform} />
                    
                    <span>Email</span>
                    <input type="email" name="email" id="email" onChange={handleform} />
                    
                    <span>Age</span>
                    <input type="number" name="age" id="age" onChange={handleform} />
                    
                    <span>phone</span>
                    <input type="number" name="phone" id="phone" onChange={handleform} />
                    
                    <span>passward</span>
                    <input type="number" name="passward" id="phone" onChange={handleform} />
                    
                    <span>Salary</span>
                    <input type="text" name='salary' onChange={handleform} />
                    
                    <span>Gender</span>
                    <input type="text" name='Gender' onChange={handleform} />
                    
                    <label>Department</label>
                    <select type="text" name="department" id="department" onChange={handleform}>
                        {departmentt?.map((dep) => {
                            return <>
                                <option >{dep.department}</option>
                            </>
                        })}
                    </select>
                    <button type='submit' id='formsubmit'>Add Recaptionst</button>
                </form>
                    

            </div>
        </>
    )
}

export default Addrecaptionist
