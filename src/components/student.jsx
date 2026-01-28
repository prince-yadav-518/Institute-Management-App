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
  {studentList && studentList.length > 0 ? (

    <div className='students-container'>
      <table>
        <thead>
          <tr className='student-heading'>
            <th>Student's Pic</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {studentList.map((Student) => (
            <tr
              key={Student._id}
              onClick={() => navigate('/dashboard/student-detail/' + Student._id)}
              className='student-row'
            >
              <td>
                <img className='student-profile-pic' src={Student.imageUrl} />
              </td>
              <td>{Student.fullName}</td>
              <td>{Student.phone}</td>
              <td>{Student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  ) : (

    <p style={{ textAlign: "center", marginTop: "20px" }}>
      No students is here
    </p>

  )}
</div>

    
  )
}

export default Student