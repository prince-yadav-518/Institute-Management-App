import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../style/student.css'

const StudentDetail = () => {

  const [student,setStudent]=useState({});
  const [paymentList,setPaymentList]=useState([]);
  const [course,setCourse]=useState({})


  const params=useParams()
  const navigate=useNavigate();
  useEffect(()=>{
      getStudentDetail();

    },[])

  const getStudentDetail=()=>{
    const token = localStorage.getItem("token")

    axios.get("https://institute-management-app-backend-yvli.onrender.com/student/student-detail/"+params.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    setStudent(res.data.studentDetail)
    setPaymentList(res.data.feeDetail)
    setCourse(res.data.courseDetail)
    // console.log(res.data.courses)
    // setCourses(res.data.courses);
    // setStudentsList(res.data.students)
    
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
}

const deleteStudent=(studentId)=>{
  const token = localStorage.getItem("token")
  if(window.confirm('Are you sure want to delete ?'))
  {
    axios.delete("https://institute-management-app-backend-yvli.onrender.com/student/"+studentId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    navigate('/dashboard/student')
    toast.success('Student data is deleted') 
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })

  }
}
  return (
    <div className='student-detail-main-wrapper'>
      
      <div className="student-detail-wrapper">
        <div className='student-detail-header'>
          <h2>Student Detail</h2>
           <div className='sd-btn-container'>
            <button className='primary-btn' onClick={()=>{navigate('/dashboard/updated-student/'+student._id,{state:{student}})}}>Edit</button>
            <button className='secondary-btn' onClick={()=>{deleteStudent(student._id)}}>Delete</button>
          </div>
        </div>
        <div className='sd-detail'>
          <img src={student.imageUrl} alt="student pic" />
          <div>
            <h1>{student.fullName}</h1>
            <p>Phone :- {student.phone}</p>
            <p>Email :- {student.email}</p>
            <p>Address :- {student.address}</p>
            <h4>Course Name :- {course.courseName}</h4>
          </div>

        </div>

      </div>
      <br />
      <br />
      <br />
      <br />
      <h2 className='payment-history-tittle'>Payment History</h2>
      <div className="fee-detail-wrapper">
        <table>
          <thead className='fee-heading'>
            <th>Date and Time</th>
            <th>Amount</th>
            <th>Remark</th>
          </thead>
          <tbody>

           
            {
              paymentList.map((payment)=>{
                return(
                <tr key={payment._id}>
                  <td>{payment.createdAt}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.remark}</td>

                </tr>
                )

              })
            }
          </tbody>
        </table>
        
      </div>

    </div>
  )
}

export default StudentDetail