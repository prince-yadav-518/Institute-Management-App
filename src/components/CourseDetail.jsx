import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import'../style/courses.css'

const CourseDetail = ()=> {
    const params=useParams();
    const[courses,setCourses]=useState(null);
    const[studentsList,setStudentsList]=useState([]);
    const navigate=useNavigate()

    useEffect(()=>{
        getCourseDetail();
    },[])
    


  const getCourseDetail=()=>{
const token = localStorage.getItem("token")

    axios.get("https://institute-management-app-backend-yvli.onrender.com/course/course-detail/"+params.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    // console.log(res.data.courses)
    setCourses(res.data.courses);
    setStudentsList(res.data.students)
    
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
}

const deleteCourse=(courseId)=>{
  const token = localStorage.getItem("token")
  if(window.confirm('Are you sure want to delete ?'))
  {
    axios.delete("https://institute-management-app-backend-yvli.onrender.com/course/"+courseId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    navigate('/dashboard/courses')
    toast.success('Course Deleted') 
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })

  }
}
  return (
    <div className='course-detail-main-wrapper'>
      { courses && <div>
      <div className='course-detail-wrapper'>
        <img  alt="course thumbnail" src={courses.imageUrl} />
        
          
        <div className='course-detail'>

          <h1>{courses.courseName}</h1>
          <p>Price :- {courses.price}</p>
          <p>Starting Date :- {courses.startingDate}</p>
          <p>End Date :- {courses.endDate}</p>
        </div>
        <div className='course-description-box'>
          <div className='btn-container'>
            <button className='primary-btn' onClick={()=>{navigate('/dashboard/updated-course/'+courses._id,{state:{courses}})}}>Edit</button>
            
            <button className='secondary-btn' onClick={()=>{deleteCourse(courses._id)}}>Delete</button>
          </div>
          <h3>course Description</h3>
          <div  className='course-description-container'>
            
            <p>{courses.description}</p>

          </div>
        </div>

      </div>
      
      
      
      </div>
      
        }   

        
       { studentsList && 
       <div className='studentlist-container'>
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
            
          
          {studentsList.map((students)=>(
          <tr onClick={()=>{navigate('/dashboard/student-detail/'+students._id)}} className='student-row'>
            <td><img className='student-profile-pic' src={students.imageUrl}/></td>
            <td> {students.fullName}</td>
            <td>{students.phone}</td>
            <td>{students.email}</td>
            
          </tr>
        ))}
        </body>
        </table>
        

       </div>
        }
    </div>
    
  )
}


export default CourseDetail