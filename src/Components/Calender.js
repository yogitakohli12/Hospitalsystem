import React from 'react'

const generatedates =() =>{
    const today = new Date()

    const calender = [[]]
    
    const startdate = new Date(today.getFullYear(),today.getMonth(),1)
    const enddate = new Date(today.getFullYear(),today.getMonth()+1,0)
    
    let week = 0
    
    for (let i = 0; i < startdate.getDay(); i++) {
        calender[week].push(' -')
    }
    
    for (let i = 1; i <= enddate.getDate(); i++) {
    if(calender[week].length === 7){
        week++
        calender[ week ] = []
    }
    calender[week].push(i)
        
    }
    while (calender[week].length<7) {
        calender[week].push('- ')
    }
    return calender
    }
    
function Calender() {
const months = [
    'January',
    'February',
    'March',
    'APril',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weekDays =[
    'Sunday',
    'Monday',
    'Tuesday',
    'wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const today = new Date()

const dates = generatedates();

  return (
    <div className='calender'>

      <div className='calenderhead'>
        <span>{today.getDate()},{months[today.getMonth()]},{today.getFullYear()}</span>
        <span>{weekDays[today.getDay()]}</span>
        <span>Time = {today.getHours()}:{today.getMinutes()}:{today.getSeconds()} </span>
      </div>

      <div className='weeks'  >
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
       <div className='dates' key={dates}>
        {dates.map(date =>{
             return(  <>
              {date.map(day=>{
                return( <div >
                <div id='dates'   >{day}</div>  
                
                </div>  )
              })}
            </> )    
        })} 
      
       </div>
       
      </div>

   
  )
}

export default Calender
