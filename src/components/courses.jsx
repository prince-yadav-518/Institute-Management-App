import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import '../style/courses.css'
import { Navigate, useNavigate } from 'react-router-dom'

const Courses = () => {

  const [courseList,setCourseList]=useState([]);
    
  const navigate=useNavigate('')
  useEffect(()=>{
    getCourses()
  },[])

  const getCourses=()=>{
const token = localStorage.getItem("token")

    axios.get("http://localhost:3000/course/all-course", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    setCourseList(res.data.courses)
    })
   .catch(err=>{
      console.log("ERROR:", err.response?.data || err.message)
      toast.error('something is wrong...')
    })
  }
  return (
    <div className='course-wrapper'>
      {
        courseList.length>0 
        ?
         
        courseList.map((course)=>(
          <div onClick={()=>{navigate('/dashboard/course-detail/'+course._id)}} className='course-box'  key={course._id}>
            <img  className='course-thumbnail' src={course.imageUrl} />
            
            <div className='course-content'>
              <p className='course-tittle'>Course: {course.courseName}</p>
              <p className='course-price'>Price: {course.price}</p>
              
            </div>
            </div>
        ))
      
      :
      <p style={{ textAlign: "center", marginTop: "20px" }} >No courses is  Here</p>
      }
      
      
     
    </div>
  )
}

export default Courses