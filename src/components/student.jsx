import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import'../style/student.css'
import { useNavigate } from 'react-router-dom'

const Student= () => {
  const[studentList,setStudentList]=useState([]);
  const navigate=useNavigate()

  useEffect(()=>{
    getStudentList();
  },[])

  const getStudentList=()=>{
const token = localStorage.getItem("token")

    axios.get("http://localhost:3000/student/all-students", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    
    
    setStudentList(res.data.Student)
    
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
}
 

  return (
    <div>
      { studentList && 
       <div className='students-container'>
        <table>
          <thead>
            <tr>
              <th>Student's Pic</th>
              <th> Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <body>
            
          
          {studentList.map((Student)=>(
          <tr onClick={()=>{navigate('/dashboard/student-detail/'+Student._id)}}  key={studentList._id}className='student-row'>
            <td><img className='student-profile-pic' src={Student.imageUrl}/></td>
            <td> {Student.fullName}</td>
            <td>{Student.phone}</td>
            <td>{Student.email}</td>
            
          </tr>
        ))}
        </body>
        </table>
        

       </div>
        }
    </div>
  )
}

export default Student